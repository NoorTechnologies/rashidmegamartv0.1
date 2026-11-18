"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, KeyRound, LogOut, Mail, MapPin, Package, Pencil, Plus, Trash2, UserRound, X, Home, BriefcaseBusiness } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type SavedKit = { id: string; name: string; items: { productId: string; quantity: number }[]; updated_at: string };
type Profile = { full_name: string; phone: string };
type Address = { id: string; label: string; recipient_name: string; phone: string; address_line1: string; address_line2: string; landmark: string; city: string; state: string; postal_code: string; is_default: boolean };
type AddressDraft = Omit<Address, "id">;
const blankAddress: AddressDraft = { label: "Home", recipient_name: "", phone: "", address_line1: "", address_line2: "", landmark: "", city: "", state: "", postal_code: "", is_default: false };
const input = "min-h-11 w-full rounded-xl border border-[#E8E4DA] bg-white px-3 text-sm text-[#292B25] outline-none transition focus:border-[#78956E] focus:ring-2 focus:ring-[#78956E]/15 placeholder:text-[#AAA69B]";
const label = "mb-1.5 block text-xs font-bold text-[#625F56]";

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "reset">("login");
  const [kits, setKits] = useState<SavedKit[]>([]);
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "" });
  const [profileDraft, setProfileDraft] = useState<Profile>({ full_name: "", phone: "" });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [draft, setDraft] = useState<AddressDraft>(blankAddress);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [profileEditing, setProfileEditing] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const loadData = useCallback(async () => {
    if (!session?.user.id) { setKits([]); setAddresses([]); setProfile({ full_name: "", phone: "" }); return; }
    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const results = await Promise.all([
        supabase.from("customer_profiles").select("full_name,phone").eq("user_id", session.user.id).maybeSingle(),
        supabase.from("customer_addresses").select("id,label,recipient_name,phone,address_line1,address_line2,landmark,city,state,postal_code,is_default").eq("user_id", session.user.id).order("is_default", { ascending: false }).order("created_at", { ascending: false }),
        supabase.from("customer_saved_kits").select("id,name,items,updated_at").eq("user_id", session.user.id).order("updated_at", { ascending: false }),
      ]);
      for (const result of results) if (result.error) throw result.error;
      const p = results[0].data ?? { full_name: typeof session.user.user_metadata?.full_name === "string" ? session.user.user_metadata.full_name : "", phone: "" };
      setProfile(p); setProfileDraft(p);
      setAddresses((results[1].data ?? []) as Address[]);
      setKits((results[2].data ?? []) as SavedKit[]);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Account details could not be loaded."); }
    finally { setLoading(false); }
  }, [session?.user.id]);

  useEffect(() => {
    try {
      const supabase = getSupabaseBrowserClient();
      if (new URLSearchParams(window.location.search).get("mode") === "reset") setMode("reset");
      supabase.auth.getSession().then(({ data }) => setSession(data.session));
      const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
      return () => data.subscription.unsubscribe();
    } catch { setConfigured(false); }
  }, []);
  useEffect(() => { void loadData(); }, [loadData]);

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const supabase = getSupabaseBrowserClient();
      if (mode === "signup") {
        const { data, error: e } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin + "/profile", data: { full_name: signupName.trim() } } });
        if (e) throw e;
        setMessage(data.session ? "Account successfully created." : "Account created. Email inbox mein verification link check karein, phir login karein.");
      } else if (mode === "forgot") {
        const { error: e } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin + "/profile?mode=reset" });
        if (e) throw e;
        setMessage("Password reset link aapke email par bhej diya gaya hai.");
      } else if (mode === "reset") {
        const { error: e } = await supabase.auth.updateUser({ password: newPassword });
        if (e) throw e;
        setNewPassword(""); setMode("login"); setMessage("Password update ho gaya.");
      } else {
        const { error: e } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (e) throw e;
        setMessage("Login successful.");
        const next = new URLSearchParams(window.location.search).get("next");
        if (next?.startsWith("/") && !next.startsWith("//")) window.location.assign(next);
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong."); }
    finally { setBusy(false); }
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!session?.user.id) return;
    const name = profileDraft.full_name.trim(), phone = profileDraft.phone.replace(/\D/g, "");
    if (name.length < 2) { setError("Name kam se kam 2 characters ka hona chahiye."); return; }
    if (phone && !/^[6-9]\d{9}$/.test(phone)) { setError("Valid 10-digit Indian mobile number enter karein."); return; }
    setBusy(true); setError(""); setMessage("");
    try {
      const { error: e } = await getSupabaseBrowserClient().from("customer_profiles").upsert({ user_id: session.user.id, full_name: name, phone, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      if (e) throw e;
      setProfile({ full_name: name, phone }); setProfileDraft({ full_name: name, phone }); setProfileEditing(false); setMessage("Profile details save ho gayi hain.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Profile save nahi ho paya."); }
    finally { setBusy(false); }
  };

  const saveAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!session?.user.id) return;
    const phone = draft.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) { setError("Valid 10-digit mobile number enter karein."); return; }
    setBusy(true); setError(""); setMessage("");
    try {
      const supabase = getSupabaseBrowserClient();
      if (draft.is_default) {
        const { error: e } = await supabase.from("customer_addresses").update({ is_default: false }).eq("user_id", session.user.id);
        if (e) throw e;
      }
      const payload = { ...draft, label: draft.label.trim() || "Home", recipient_name: draft.recipient_name.trim(), phone, address_line1: draft.address_line1.trim(), address_line2: draft.address_line2.trim(), landmark: draft.landmark.trim(), city: draft.city.trim(), state: draft.state.trim(), postal_code: draft.postal_code.trim(), updated_at: new Date().toISOString() };
      const result = editingId
        ? await supabase.from("customer_addresses").update(payload).eq("id", editingId).eq("user_id", session.user.id)
        : await supabase.from("customer_addresses").insert({ ...payload, user_id: session.user.id, is_default: addresses.length === 0 || draft.is_default });
      if (result.error) throw result.error;
      const wasEditing = Boolean(editingId);
      setAddressOpen(false); setEditingId(null); setDraft(blankAddress);
      await loadData(); setMessage(wasEditing ? "Address update ho gaya." : "Address save ho gaya.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Address save nahi ho paya."); }
    finally { setBusy(false); }
  };

  const editAddress = (a: Address) => {
    setEditingId(a.id);
    setDraft({ label: a.label, recipient_name: a.recipient_name, phone: a.phone, address_line1: a.address_line1, address_line2: a.address_line2, landmark: a.landmark, city: a.city, state: a.state, postal_code: a.postal_code, is_default: a.is_default });
    setAddressOpen(true);
  };
  const deleteAddress = async (id: string) => {
    if (!session?.user.id || !window.confirm("Is saved address ko delete karna hai?")) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const { error: e } = await getSupabaseBrowserClient().from("customer_addresses").delete().eq("id", id).eq("user_id", session.user.id);
      if (e) throw e;
      await loadData(); setMessage("Address delete ho gaya.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Address delete nahi ho paya."); }
    finally { setBusy(false); }
  };
  const makeDefault = async (a: Address) => {
    if (!session?.user.id) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: e1 } = await supabase.from("customer_addresses").update({ is_default: false }).eq("user_id", session.user.id);
      if (e1) throw e1;
      const { error: e2 } = await supabase.from("customer_addresses").update({ is_default: true }).eq("id", a.id).eq("user_id", session.user.id);
      if (e2) throw e2;
      await loadData(); setMessage("Default address update ho gaya.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Default address update nahi ho paya."); }
    finally { setBusy(false); }
  };
  const signOut = async () => {
    setBusy(true); setError(""); setMessage("");
    try { const { error: e } = await getSupabaseBrowserClient().auth.signOut(); if (e) throw e; setSession(null); setMessage("You have been logged out."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to log out."); }
    finally { setBusy(false); }
  };

  const deleteAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user.email || !deleteConfirmed) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: reauthError } = await supabase.auth.signInWithPassword({ email: session.user.email, password: deletePassword });
      if (reauthError) throw new Error("Password sahi nahi hai. Account delete nahi kiya gaya.");
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.access_token) throw new Error("Session verify nahi ho paya. Dobara login karein.");
      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: { Authorization: `Bearer ${sessionData.session.access_token}` },
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Account delete nahi ho paya. Support se contact karein.");
      await supabase.auth.signOut({ scope: "local" });
      setSession(null); setKits([]); setAddresses([]); setProfile({ full_name: "", phone: "" });
      setDeleteDialogOpen(false); setDeletePassword(""); setDeleteConfirmed(false);
      setMode("signup");
      setMessage("Aapka account permanently delete ho gaya hai. Rashid Mega Mart dobara use karne ke liye naya account banayein.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Account delete nahi ho paya.");
    } finally { setBusy(false); }
  };

  const heading = mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset password" : mode === "reset" ? "Set a new password" : "Welcome back";

  return (
    <main className="min-h-[72vh] bg-[#FAFAF7] px-4 py-7 pb-28 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#71866A]">Rashid Mega Mart</p>
        <div className="mt-1 flex items-end justify-between gap-3"><div><h1 className="text-2xl font-black tracking-tight text-[#292B25]">My Account</h1><p className="mt-1 text-sm text-[#77776E]">Profile details and saved addresses.</p></div>{session && <button type="button" disabled={busy} onClick={signOut} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#E8E4DA] bg-white px-3 text-xs font-bold text-[#6A6B62] hover:bg-[#F4F3ED] disabled:opacity-50"><LogOut size={14}/> Logout</button>}</div>

        {!configured ? <div className="mt-6 rounded-2xl border border-[#E8D7DC] bg-white p-5 text-sm text-[#6F3545]">Supabase configuration missing hai. Project root ki .env.local file mein Supabase URL aur publishable key add karein.</div> :
        session && mode !== "reset" ? <div className="mt-6 space-y-4">
          <section className="overflow-hidden rounded-2xl border border-[#E9E7DE] bg-white shadow-[0_8px_30px_rgba(44,48,37,0.035)]">
            <div className="flex items-center justify-between border-b border-[#F0EFE9] px-4 py-4 sm:px-5"><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-full bg-[#EDF3E9] text-[#496C43]"><UserRound size={21}/></span><div><h2 className="text-sm font-extrabold text-[#292B25]">Personal Information</h2><p className="text-xs text-[#85857B]">Your account details</p></div></div>{!profileEditing && <button type="button" onClick={()=>{setProfileDraft(profile);setProfileEditing(true);}} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[#4D7046] hover:bg-[#F0F5ED]"><Pencil size={13}/> Edit</button>}</div>
            {profileEditing ? <form onSubmit={saveProfile} className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
              <label><span className={label}>Full name</span><input className={input} autoComplete="name" maxLength={100} required value={profileDraft.full_name} onChange={e=>setProfileDraft(v=>({...v,full_name:e.target.value}))} placeholder="Your full name"/></label>
              <label><span className={label}>Mobile number</span><input className={input} inputMode="numeric" autoComplete="tel-national" maxLength={10} value={profileDraft.phone} onChange={e=>setProfileDraft(v=>({...v,phone:e.target.value.replace(/\D/g,"").slice(0,10)}))} placeholder="10-digit mobile number"/></label>
              <div className="flex gap-2 pt-1 sm:col-span-2"><button disabled={busy} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#426B43] px-4 text-xs font-extrabold text-white hover:bg-[#345A36] disabled:opacity-50"><Check size={15}/>{busy?"Saving...":"Save changes"}</button><button type="button" onClick={()=>{setProfileDraft(profile);setProfileEditing(false);}} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#E8E4DA] px-4 text-xs font-bold text-[#62635B]"><X size={15}/> Cancel</button></div>
            </form> : <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5"><div><p className="text-[11px] font-semibold text-[#929187]">Full name</p><p className="mt-1 text-sm font-bold text-[#303129]">{profile.full_name || "Not added yet"}</p></div><div><p className="text-[11px] font-semibold text-[#929187]">Mobile number</p><p className="mt-1 text-sm font-bold text-[#303129]">{profile.phone || "Not added yet"}</p></div><div className="sm:col-span-2"><p className="text-[11px] font-semibold text-[#929187]">Email address</p><p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#55564E]"><Mail size={14} className="text-[#87917D]"/>{session.user.email}</p></div></div>}
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E9E7DE] bg-white shadow-[0_8px_30px_rgba(44,48,37,0.035)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#F0EFE9] px-4 py-4 sm:px-5"><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-full bg-[#EDF3E9] text-[#496C43]"><MapPin size={21}/></span><div><h2 className="text-sm font-extrabold text-[#292B25]">Saved Addresses</h2><p className="text-xs text-[#85857B]">Manage your delivery addresses</p></div></div>{!addressOpen && <button type="button" onClick={()=>{setEditingId(null);setDraft({...blankAddress,recipient_name:profile.full_name,phone:profile.phone});setAddressOpen(true);}} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#426B43] px-3 text-xs font-bold text-white hover:bg-[#345A36]"><Plus size={14}/> Add address</button>}</div>
            {addressOpen && <form onSubmit={saveAddress} className="space-y-3 border-b border-[#F0EFE9] bg-[#FCFCF9] p-4 sm:p-5">
              <div className="flex items-center justify-between"><h3 className="text-sm font-extrabold text-[#303129]">{editingId?"Edit address":"Add new address"}</h3><button type="button" onClick={()=>{setAddressOpen(false);setEditingId(null);setDraft(blankAddress);}} aria-label="Close address form" className="rounded-full p-2 text-[#77776E] hover:bg-[#F0EFE9]"><X size={17}/></button></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label><span className={label}>Address label</span><select className={input} value={draft.label} onChange={e=>setDraft(v=>({...v,label:e.target.value}))}><option>Home</option><option>Work</option><option>Other</option></select></label>
                <label><span className={label}>Recipient name</span><input className={input} required minLength={2} maxLength={100} autoComplete="name" value={draft.recipient_name} onChange={e=>setDraft(v=>({...v,recipient_name:e.target.value}))} placeholder="Full name"/></label>
                <label><span className={label}>Mobile number</span><input className={input} required inputMode="numeric" maxLength={10} autoComplete="tel-national" value={draft.phone} onChange={e=>setDraft(v=>({...v,phone:e.target.value.replace(/\D/g,"").slice(0,10)}))} placeholder="10-digit mobile number"/></label>
                <label className="sm:col-span-2"><span className={label}>Address line 1</span><input className={input} required minLength={5} maxLength={180} autoComplete="address-line1" value={draft.address_line1} onChange={e=>setDraft(v=>({...v,address_line1:e.target.value}))} placeholder="House no., building, street, area"/></label>
                <label className="sm:col-span-2"><span className={label}>Address line 2 (optional)</span><input className={input} autoComplete="address-line2" value={draft.address_line2} onChange={e=>setDraft(v=>({...v,address_line2:e.target.value}))} placeholder="Apartment, suite, etc."/></label>
                <label><span className={label}>Landmark (optional)</span><input className={input} value={draft.landmark} onChange={e=>setDraft(v=>({...v,landmark:e.target.value}))} placeholder="Nearby landmark"/></label>
                <label><span className={label}>City</span><input className={input} required minLength={2} maxLength={80} autoComplete="address-level2" value={draft.city} onChange={e=>setDraft(v=>({...v,city:e.target.value}))} placeholder="City"/></label>
                <label><span className={label}>State</span><input className={input} required minLength={2} maxLength={80} autoComplete="address-level1" value={draft.state} onChange={e=>setDraft(v=>({...v,state:e.target.value}))} placeholder="State"/></label>
                <label><span className={label}>PIN code</span><input className={input} required inputMode="numeric" maxLength={6} autoComplete="postal-code" value={draft.postal_code} onChange={e=>setDraft(v=>({...v,postal_code:e.target.value.replace(/\D/g,"").slice(0,6)}))} placeholder="6-digit PIN code"/></label>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#5F6257]"><input type="checkbox" checked={draft.is_default} onChange={e=>setDraft(v=>({...v,is_default:e.target.checked}))} className="size-4 accent-[#426B43]"/> Set as default address</label>
              <button disabled={busy} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#426B43] px-4 text-xs font-extrabold text-white hover:bg-[#345A36] disabled:opacity-50"><Check size={15}/>{busy?"Saving...":"Save address"}</button>
            </form>}
            <div className="space-y-3 p-4 sm:p-5">{loading?<p className="py-5 text-center text-xs text-[#85857B]">Loading account details...</p>:addresses.length?addresses.map(a=><article key={a.id} className="rounded-xl border border-[#EEEDE6] p-3.5 hover:border-[#D9E4D2]"><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F4EC] text-[#58744F]">{a.label==="Work"?<BriefcaseBusiness size={17}/>:<Home size={17}/>}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-extrabold text-[#303129]">{a.label}</p>{a.is_default&&<span className="rounded-full bg-[#EDF4E9] px-2 py-0.5 text-[9px] font-extrabold text-[#426B43]">DEFAULT</span>}</div><p className="mt-1 text-xs font-bold text-[#55564E]">{a.recipient_name} · {a.phone}</p><p className="mt-1 text-xs leading-5 text-[#77776E]">{a.address_line1}{a.address_line2?", "+a.address_line2:""}{a.landmark?", "+a.landmark:""}, {a.city}, {a.state} - {a.postal_code}</p><div className="mt-3 flex flex-wrap gap-3">{!a.is_default&&<button type="button" disabled={busy} onClick={()=>void makeDefault(a)} className="text-[11px] font-bold text-[#4D7046]">Set as default</button>}<button type="button" disabled={busy} onClick={()=>editAddress(a)} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#66675F]"><Pencil size={12}/> Edit</button><button type="button" disabled={busy} onClick={()=>void deleteAddress(a.id)} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A14B45]"><Trash2 size={12}/> Delete</button></div></div></div></article>):<div className="rounded-xl bg-[#FAFAF6] px-4 py-7 text-center"><MapPin size={23} className="mx-auto text-[#9AA18F]"/><p className="mt-2 text-sm font-bold text-[#55564E]">No saved addresses yet</p><p className="mt-1 text-xs text-[#929187]">Add an address to keep your delivery details ready.</p></div>}</div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E9E7DE] bg-white"><div className="flex items-center justify-between border-b border-[#F0EFE9] px-4 py-4 sm:px-5"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#F2F1EB] text-[#73766A]"><Package size={19}/></span><div><h2 className="text-sm font-extrabold text-[#292B25]">My Saved Kits</h2><p className="text-xs text-[#85857B]">Private to your account</p></div></div><span className="rounded-full bg-[#F1F3EC] px-3 py-1 text-xs font-bold text-[#58744F]">{kits.length} kits</span></div><div className="p-4 sm:p-5">{kits.length?<div className="space-y-2">{kits.map(kit=><article key={kit.id} className="flex items-center gap-3 rounded-xl border border-[#EEEDE6] p-3"><Package size={18} className="shrink-0 text-[#58744F]"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#303129]">{kit.name}</p><p className="text-xs text-[#85857B]">{kit.items?.reduce((sum,item)=>sum+item.quantity,0)??0} items</p></div><Link href={"/planner?kit="+encodeURIComponent(kit.id)} className="inline-flex items-center gap-1 text-xs font-bold text-[#4D7046]">Open <ArrowRight size={13}/></Link></article>)}</div>:<p className="rounded-xl bg-[#FAFAF6] p-4 text-sm text-[#85857B]">Abhi koi saved kit nahi hai. Planner mein apna pehla kit save karein.</p>}<Link href="/planner" className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#426B43] px-4 text-xs font-bold text-white hover:bg-[#345A36]">Open Grocery Planner <ArrowRight size={15}/></Link></div></section>
          <section className="overflow-hidden rounded-2xl border border-[#F0DAD7] bg-white">
            <div className="border-b border-[#F7E9E7] px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-2"><span className="flex size-9 items-center justify-center rounded-xl bg-[#FFF0EE] text-[#A7473F]"><Trash2 size={17}/></span><div><h2 className="text-sm font-extrabold text-[#8F3933]">Danger Zone</h2><p className="text-xs text-[#9A7772]">Permanent account action</p></div></div>
            </div>
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="min-w-0"><p className="text-sm font-bold text-[#39332F]">Delete your account</p><p className="mt-1 max-w-xl text-xs leading-5 text-[#77716C]">Account, profile details, saved addresses aur saved kits permanently delete ho jayenge. Dobara use karne ke liye naya account banana padega.</p></div>
              <button type="button" disabled={busy} onClick={()=>{setDeleteDialogOpen(true);setDeleteConfirmed(false);setDeletePassword("");setError("");}} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E8C7C3] bg-white px-4 text-xs font-extrabold text-[#A13F38] transition hover:bg-[#FFF5F3] disabled:opacity-50"><Trash2 size={14}/> Delete Account</button>
            </div>
          </section>
          {deleteDialogOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#201C18]/55 p-4 backdrop-blur-sm" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget&&!busy)setDeleteDialogOpen(false);}}>
            <section role="dialog" aria-modal="true" aria-labelledby="delete-account-title" className="w-full max-w-md rounded-2xl border border-white/70 bg-[#FFFEFA] p-5 shadow-[0_24px_80px_rgba(20,20,16,0.28)] sm:p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#FFF0EE] text-[#A7473F]"><Trash2 size={20}/></div>
              <h2 id="delete-account-title" className="mt-4 text-lg font-black tracking-tight text-[#292B25]">Permanently delete account?</h2>
              <p className="mt-2 text-sm leading-6 text-[#706D64]">Aapka Rashid Mega Mart account, profile details, saved addresses aur saved kits permanently delete ho jayenge. Purane email/password se login nahi hoga. Website dobara use karne ke liye aapko naya account banana padega.</p>
              <form onSubmit={deleteAccount} className="mt-4 space-y-3">
                <label className="block"><span className={label}>Confirm with your current password</span><input required type="password" autoComplete="current-password" value={deletePassword} onChange={event=>setDeletePassword(event.target.value)} className={input} placeholder="Enter current password"/></label>
                <label className="flex items-start gap-2 rounded-xl bg-[#FFF5F3] p-3 text-xs leading-5 text-[#75433E]"><input type="checkbox" checked={deleteConfirmed} onChange={event=>setDeleteConfirmed(event.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[#A7473F]"/><span>I understand this action is permanent and I will need to create a new account to use the website again.</span></label>
                <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end"><button type="button" disabled={busy} onClick={()=>setDeleteDialogOpen(false)} className="min-h-10 rounded-xl border border-[#E8E4DA] px-4 text-xs font-bold text-[#62635B] disabled:opacity-50">Cancel</button><button type="submit" disabled={busy||!deleteConfirmed||!deletePassword} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#A13F38] px-4 text-xs font-extrabold text-white transition hover:bg-[#87332D] disabled:cursor-not-allowed disabled:opacity-45"><Trash2 size={14}/>{busy?"Deleting account...":"Permanently Delete Account"}</button></div>
              </form>
            </section>
          </div>}
        </div> :
        <section className="mt-6 rounded-2xl border border-[#E9E7DE] bg-white p-5 shadow-[0_8px_30px_rgba(44,48,37,0.035)] sm:p-6">
          <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-[#EDF3E9] text-[#496C43]"><UserRound size={21}/></span><div><h2 className="text-lg font-black text-[#292B25]">{heading}</h2><p className="text-xs text-[#85857B]">Login to manage your account details.</p></div></div>
          <form onSubmit={submitAuth} className="mt-5 space-y-3">
            {mode==="signup"&&<label className="block"><span className={label}>Full name</span><input required minLength={2} maxLength={100} autoComplete="name" value={signupName} onChange={e=>setSignupName(e.target.value)} placeholder="Your full name" className={input}/></label>}
            {mode!=="reset"&&<label className="block"><span className={label}>Email address</span><span className="flex min-h-11 items-center gap-2 rounded-xl border border-[#E8E4DA] px-3 focus-within:border-[#78956E]"><Mail size={16} className="text-[#899181]"/><input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/></span></label>}
            {(mode==="login"||mode==="signup")&&<label className="block"><span className={label}>Password</span><span className="flex min-h-11 items-center gap-2 rounded-xl border border-[#E8E4DA] px-3 focus-within:border-[#78956E]"><KeyRound size={16} className="text-[#899181]"/><input required minLength={8} type="password" autoComplete={mode==="signup"?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/></span></label>}
            {mode==="reset"&&<label className="block"><span className={label}>New password</span><input required minLength={8} type="password" autoComplete="new-password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="At least 8 characters" className={input}/></label>}
            <button disabled={busy} type="submit" className="min-h-11 w-full rounded-xl bg-[#426B43] px-4 text-sm font-extrabold text-white hover:bg-[#345A36] disabled:opacity-50">{busy?"Please wait...":mode==="signup"?"Create Account":mode==="forgot"?"Send Reset Link":mode==="reset"?"Update Password":"Login"}</button>
          </form>
          <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs font-bold text-[#4D7046]">{mode==="login"?<><button type="button" onClick={()=>setMode("signup")}>Create account</button><button type="button" onClick={()=>setMode("forgot")}>Forgot password?</button></>:<button type="button" onClick={()=>setMode("login")}>Back to login</button>}</div>
          <p className="mt-4 text-[11px] leading-5 text-[#929187]">Password securely Supabase Auth handle karta hai. Hum plain-text password store nahi karte. Signup ke baad email verification required ho sakti hai.</p>
        </section>}
        {error&&<p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</p>}
        {message&&<p role="status" className="mt-4 rounded-xl border border-[#DDE9D1] bg-[#F2F8E9] px-4 py-3 text-xs font-semibold text-[#28643B]">{message}</p>}
      </div>
    </main>
  );
}
