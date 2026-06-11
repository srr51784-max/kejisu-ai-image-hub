create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  points integer not null default 0 check(points >= 0),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.recharge_orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  user_email text,
  package_id text not null,
  package_name text not null,
  amount numeric(10,2) not null,
  points integer not null,
  proof_url text,
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.image_jobs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  prompt text not null,
  mode text not null,
  size text not null,
  cost_points integer not null default 0,
  image_url text,
  status text not null default 'succeeded',
  error text,
  created_at timestamptz not null default now()
);

create table if not exists public.point_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  delta integer not null,
  reason text not null,
  admin_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles(id,email) values(new.id,new.email) on conflict(id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.add_points(p_user_id uuid,p_points integer,p_reason text,p_admin_id uuid default null)
returns void language plpgsql security definer as $$
begin
  if p_points <= 0 then raise exception 'points must be positive'; end if;
  update public.profiles set points = points + p_points where id = p_user_id;
  insert into public.point_transactions(user_id,delta,reason,admin_id) values(p_user_id,p_points,p_reason,p_admin_id);
end; $$;

create or replace function public.spend_points(p_user_id uuid,p_points integer,p_reason text)
returns void language plpgsql security definer as $$
declare current_points integer;
begin
  select points into current_points from public.profiles where id = p_user_id for update;
  if current_points is null then raise exception 'profile not found'; end if;
  if current_points < p_points then raise exception '余额不足，请先充值'; end if;
  update public.profiles set points = points - p_points where id = p_user_id;
  insert into public.point_transactions(user_id,delta,reason) values(p_user_id,-p_points,p_reason);
end; $$;

insert into storage.buckets(id,name,public) values('generated-images','generated-images',true) on conflict(id) do nothing;
insert into storage.buckets(id,name,public) values('recharge-proofs','recharge-proofs',true) on conflict(id) do nothing;

alter table public.profiles enable row level security;
alter table public.recharge_orders enable row level security;
alter table public.image_jobs enable row level security;
alter table public.point_transactions enable row level security;

create policy "read own profile" on public.profiles for select using(auth.uid() = id);
create policy "read own recharge" on public.recharge_orders for select using(auth.uid() = user_id);
create policy "read own images" on public.image_jobs for select using(auth.uid() = user_id);
create policy "read own transactions" on public.point_transactions for select using(auth.uid() = user_id);

-- 管理员注册后执行：
-- update public.profiles set is_admin = true where email = 'kejisu110@gmail.com';
