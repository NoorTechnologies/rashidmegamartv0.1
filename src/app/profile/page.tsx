"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowRight, KeyRound, LogOut, Mail, Package, UserRound } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type SavedKit = { id: string; name: string; items: { productId: string; quantity: number }[]; updated_at: string };

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "reset">("login");
  const [kits, setKits] = useState<SavedKit[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [configured, setConfigured] = useState(true);

  const loadKits = useCallback(async () => {
    if (!session?.user.id) { setKits([]); return; }
    try {
      const { data, error: queryError } = await getSupabaseBrowserClient()
        .from("customer_saved_kits")
        .select("id,name,items,updated_at")
        .eq("user_id", session.user.id)
        .order("updated_at", { ascending: false });
      if (queryError) throw queryError;
      setKits((data ?? []) as SavedKit[]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Saved kits could not be loaded.");
    }
  }, [session?.user.id]);

  useEffect(() => {
    try {
      const supabase = getSupabaseBrowserClient();
      supabase.auth.getSession().then(({ data }) => setSession(data.session));
      const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
      return () => listener.subscription.unsubscribe();
    } catch {
      setConfigured(false);
    }
  }, []);

  useEffect(() => { void loadKits(); }, [loadKits]);

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const supabase = getSupabaseBrowserClient();
      if (mode === "signup") {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin + "/profile" },
        });
        if (authError) throw authError;
        if (!data.session) setMessage("Account created. Email inbox mein verification link check karein, phir login karein.");
        else setMessage("Account successfully created.");
      } else if (mode === "forgot") {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: window.location.origin + "/profile?mode=reset",
        });
        if (authError) throw authError;
        setMessage("Password reset link aapke email par bhej diya gaya hai.");
      } else if (mode === "reset") {
        const { error: authError } = await supabase.auth.updateUser({ password: newPassword });
        if (authError) throw authError;
        setNewPassword(""); setMode("login"); setMessage("Password update ho gaya. Ab naye password se login kar sakte hain.");
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        setMessage("Login successful.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally { setBusy(false); }
  };

  const signOut = async () => {
    setBusy(true); setError(""); setMessage("");
    try {
      const { error: authError } = await getSupabaseBrowserClient().auth.signOut();
      if (authError) throw authError;
      setKits([]); setMessage("You have been logged out.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to log out.");
    } finally { setBusy(false); }
  };

  const heading = mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset password" : mode === "reset" ? "Set a new password" : "Welcome back";

  return (
    <main className="min-h-[72vh] bg-[#FAF8F5] px-4 py-7 pb-28 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#A83250]">Rashid Mega Mart</p>
        <h1 className="mt-2 text-2xl font-black text-[#24201E]">My Profile</h1>
        <p className="mt-1 text-sm text-[#817A74]">Your account and saved grocery kits.</p>

        {!configured ? (
          <div className="mt-6 rounded-2xl border border-[#E8D7DC] bg-white p-5 text-sm text-[#6F3545]">
            Supabase configuration missing hai. Project root ki .env.local file mein Supabase URL aur publishable key add karein.
          </div>
        ) : session ? (
          <section className="mt-6 rounded-2xl border border-[#EEE8E1] bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-[#F8E8ED] text-[#A83250]"><UserRound size={22} /></span>
              <div className="min-w-0 flex-1"><h2 className="text-sm font-extrabold text-[#29231F]">Signed in</h2><p className="truncate text-xs text-[#817A74]">{session.user.email}</p></div>
              <button type="button" disabled={busy} onClick={signOut} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#EEE8E1] px-3 text-xs font-bold text-[#6F625A] disabled:opacity-50"><LogOut size={14} /> Logout</button>
            </div>
            <div className="mt-6 flex items-center justify-between"><div><h2 className="text-base font-black text-[#29231F]">My Saved Kits</h2><p className="mt-0.5 text-xs text-[#817A74]">Private to your account</p></div><span className="rounded-full bg-[#F8E8ED] px-3 py-1 text-xs font-bold text-[#A83250]">{kits.length} kits</span></div>
            {kits.length ? <div className="mt-3 space-y-2">{kits.map((kit) => <article key={kit.id} className="flex items-center gap-3 rounded-xl border border-[#F0EAE3] p-3"><Package size={18} className="shrink-0 text-[#A83250]" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#29231F]">{kit.name}</p><p className="text-xs text-[#817A74]">{kit.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0} items</p></div><Link href={"/planner?kit=" + encodeURIComponent(kit.id)} className="inline-flex items-center gap-1 text-xs font-bold text-[#A83250]">Open <ArrowRight size={13} /></Link></article>)}</div> : <p className="mt-4 rounded-xl bg-[#FFFCF7] p-4 text-sm text-[#817A74]">Abhi koi saved kit nahi hai. Planner mein apna pehla kit save karein.</p>}
            <Link href="/planner" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-sm font-bold text-white">Open Grocery Planner <ArrowRight size={16} /></Link>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl border border-[#EEE8E1] bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-[#F8E8ED] text-[#A83250]"><UserRound size={21} /></span><div><h2 className="text-lg font-black text-[#29231F]">{heading}</h2><p className="text-xs text-[#817A74]">Login to keep your grocery kits safe.</p></div></div>
            <form onSubmit={submitAuth} className="mt-5 space-y-3">
              {mode !== "reset" && <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#62574E]">Email address</span><span className="flex min-h-11 items-center gap-2 rounded-xl border border-[#E7DED2] px-3"><Mail size={16} className="text-[#8B7B70]" /><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></span></label>}
              {(mode === "login" || mode === "signup") && <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#62574E]">Password</span><span className="flex min-h-11 items-center gap-2 rounded-xl border border-[#E7DED2] px-3"><KeyRound size={16} className="text-[#8B7B70]" /><input required minLength={8} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></span></label>}
              {mode === "reset" && <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#62574E]">New password</span><input required minLength={8} type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 8 characters" className="min-h-11 w-full rounded-xl border border-[#E7DED2] px-3 text-sm outline-none focus:border-[#A83250]" /></label>}
              <button disabled={busy} type="submit" className="min-h-11 w-full rounded-xl bg-[#800020] px-4 text-sm font-extrabold text-white transition hover:bg-[#650019] disabled:opacity-50">{busy ? "Please wait..." : mode === "signup" ? "Create Account" : mode === "forgot" ? "Send Reset Link" : mode === "reset" ? "Update Password" : "Login"}</button>
            </form>
            <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs font-bold text-[#A83250]">
              {mode === "login" ? <><button type="button" onClick={() => setMode("signup")}>Create account</button><button type="button" onClick={() => setMode("forgot")}>Forgot password?</button></> : <button type="button" onClick={() => setMode("login")}>Back to login</button>}
            </div>
            <p className="mt-4 text-[11px] leading-5 text-[#8B7B70]">Password securely Supabase Auth handle karta hai. Hum plain-text password store nahi karte. Signup ke baad email verification required ho sakti hai.</p>
          </section>
        )}

        {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</p>}
        {message && <p role="status" className="mt-4 rounded-xl border border-[#DDE9D1] bg-[#F2F8E9] px-4 py-3 text-xs font-semibold text-[#28643B]">{message}</p>}
      </div>
    </main>
  );
}
