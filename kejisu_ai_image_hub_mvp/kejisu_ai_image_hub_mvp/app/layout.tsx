import "./globals.css";
export const metadata = { title: "kejisu AI 绘图中转站", description: "注册充值后即可使用 AI 图片生成服务" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
