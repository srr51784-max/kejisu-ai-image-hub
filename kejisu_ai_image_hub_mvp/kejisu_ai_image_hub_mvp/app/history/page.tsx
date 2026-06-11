"use client";
import Link from "next/link"; import { useEffect,useState } from "react"; import { browserSupabase } from "@/lib/supabase";
export default function History(){const sb=browserSupabase(); const [items,setItems]=useState<any[]>([]);
 useEffect(()=>{(async()=>{const {data:s}=await sb.auth.getSession(); if(!s.session)return location.href="/login"; const {data}=await sb.from("image_jobs").select("*").eq("user_id",s.session.user.id).order("created_at",{ascending:false}); setItems(data||[]);})();},[]);
 return <main className="min-h-screen px-6 py-10"><div className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-white/60">← 返回</Link><h1 className="mt-8 text-5xl font-black">生成历史</h1><div className="mt-8 grid gap-5 md:grid-cols-3">{items.map(it=><div className="card overflow-hidden" key={it.id}>{it.image_url&&<img src={it.image_url} className="aspect-square w-full object-cover"/>}<div className="p-5"><p className="text-cyan-300">扣点 {it.cost_points}</p><p className="mt-2 text-sm text-white/60">{it.prompt}</p></div></div>)}</div></div></main>
}
