"use client";
import { useState } from "react";
import { browserSupabase } from "@/lib/supabase";
export default function Login(){
 const sb=browserSupabase(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [mode,setMode]=useState<"login"|"signup">("login"); const [msg,setMsg]=useState("");
 async function submit(){ setMsg(""); const res = mode==="login" ? await sb.auth.signInWithPassword({email,password}) : await sb.auth.signUp({email,password}); if(res.error) setMsg(res.error.message); else location.href="/dashboard"; }
 return <main className="flex min-h-screen items-center justify-center px-6"><div className="card w-full max-w-md p-8"><img src="/kejisu-logo.svg" className="mb-8 w-48 rounded-2xl"/><h1 className="text-3xl font-black">{mode==="login"?"登录":"注册"}</h1><div className="mt-6 space-y-4"><input className="input" placeholder="邮箱" value={email} onChange={e=>setEmail(e.target.value)}/><input className="input" placeholder="密码" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>{msg&&<p className="text-red-300">{msg}</p>}<button className="btn btn-primary w-full" onClick={submit}>{mode==="login"?"登录":"注册"}</button><button className="w-full text-white/60" onClick={()=>setMode(mode==="login"?"signup":"login")}>{mode==="login"?"没有账号？注册":"已有账号？登录"}</button></div></div></main>
}
