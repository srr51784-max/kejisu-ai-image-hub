import { createClient } from "@supabase/supabase-js";
export const browserSupabase = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export const adminSupabase = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth:{persistSession:false, autoRefreshToken:false} });
export async function userFromAuth(auth: string | null) {
  const token = auth?.replace("Bearer ","");
  if(!token) return null;
  const { data } = await adminSupabase().auth.getUser(token);
  return data.user || null;
}
