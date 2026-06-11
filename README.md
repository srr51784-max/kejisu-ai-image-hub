# kejisu AI 绘图中转站 MVP

这是第一版真实可部署源码：用户注册、充值、上传付款截图、管理员审核加点、调用 OpenAI 图片生成、自动扣点、历史记录、管理员后台。

## 套餐
- 体验包 ¥9.9 = 20点
- 标准包 ¥29.9 = 80点
- 专业包 ¥99 = 300点
- 企业包 ¥299 = 1000点

## 扣点规则
- 普通生成 1张 = 1点
- 高清生成 1张 = 2点
- 参考图改图 = 3点（第一版预留，第二版接入图片编辑接口）

## 技术栈
Next.js + Supabase + OpenAI API + Vercel

## 部署步骤
1. 创建 Supabase 项目
2. 在 Supabase SQL Editor 执行 `supabase/schema.sql`
3. 将项目上传 GitHub，再导入 Vercel
4. 在 Vercel 设置 `.env.example` 中的环境变量
5. 使用 `kejisu110@gmail.com` 注册管理员账号
6. 在 Supabase SQL Editor 执行：
```sql
update public.profiles set is_admin = true where email = 'kejisu110@gmail.com';
```

## 环境变量
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-1
ADMIN_EMAIL=kejisu110@gmail.com
```

## 说明
个人微信收款码无法自动确认付款，因此第一版采用“用户上传付款截图 + 管理员审核加点”的方式。
如果后续有微信商户号或 Stripe，可以升级为自动充值。
OpenAI API Key 必须放在服务端环境变量中，不能放到前端页面。
