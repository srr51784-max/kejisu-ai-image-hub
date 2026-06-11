import Link from "next/link";
const packs = [
  ["体验包","¥9.9","20点"],["标准包","¥29.9","80点"],["专业包","¥99","300点"],["企业包","¥299","1000点"]
];
export default function Home(){
 return <main className="min-h-screen px-6 py-10">
  <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 p-4">
    <img src="/kejisu-logo.svg" className="h-10 w-auto" alt="kejisu"/>
    <div className="flex gap-3"><Link className="btn btn-dark" href="/dashboard">控制台</Link><Link className="btn btn-primary" href="/login">登录/注册</Link></div>
  </nav>
  <section className="mx-auto grid max-w-6xl items-center gap-10 py-24 md:grid-cols-2">
    <div><p className="text-cyan-300">AI Image Generation Platform</p><h1 className="mt-4 text-6xl font-black leading-tight">kejisu AI<br/><span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">绘图中转站</span></h1><p className="mt-6 text-lg leading-8 text-white/60">注册充值后即可使用 AI 图片生成服务，适合电商图、海报、头像、主图、详情页素材快速生成。</p><div className="mt-8 flex gap-4"><Link href="/login" className="btn btn-primary">立即开始</Link><a href="#pricing" className="btn btn-dark">查看套餐</a></div></div>
    <div className="card p-8"><img src="/kejisu-logo.svg" className="rounded-3xl"/><div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-white/10 p-4"><b>1点</b><p className="text-xs text-white/50">普通</p></div><div className="rounded-2xl bg-white/10 p-4"><b>2点</b><p className="text-xs text-white/50">高清</p></div><div className="rounded-2xl bg-white/10 p-4"><b>3点</b><p className="text-xs text-white/50">改图</p></div></div></div>
  </section>
  <section id="pricing" className="mx-auto max-w-6xl py-16"><h2 className="text-5xl font-black">充值套餐</h2><div className="mt-8 grid gap-5 md:grid-cols-4">{packs.map(p=><div className="card p-6" key={p[0]}><p className="text-white/50">套餐</p><h3 className="mt-3 text-2xl font-bold">{p[0]}</h3><p className="mt-4 text-4xl font-black">{p[1]}</p><p className="mt-2 text-cyan-300">{p[2]}</p></div>)}</div></section>
 </main>
}
