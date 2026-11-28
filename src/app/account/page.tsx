"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, BadgeCheck, ChevronRight, CircleHelp, LifeBuoy, LogOut,
  MapPin, Package, Plus, ShieldCheck, UserRound, X,
} from "lucide-react";
import {
  type CustomerAddress, type CustomerOrder, type CustomerSession,
  deleteCustomerAddress, getCustomerSession, loadCustomerAccount,
  saveCustomerAddress, saveCustomerProfile, sendPhoneOtp, signOutCustomer, updateCustomerAddress,
  verifyPhoneOtp,
} from "@/lib/customer-account";

const money = (value: number) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
}).format(value);

const blankAddress = {
  label: "Home", recipient_name: "", phone: "", address_line1: "",
  address_line2: "", landmark: "", city: "Rewa", state: "Madhya Pradesh",
  postal_code: "", is_default: false,
};

function statusLabel(status: string) {
  return ({
    pending_confirmation: "Awaiting store confirmation",
    confirmed: "Order confirmed",
    preparing: "Being prepared",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  } as Record<string, string>)[status] ?? "Order update pending";
}

export default function AccountPage() {
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [booting, setBooting] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressDraft, setAddressDraft] = useState(blankAddress);
  const [activeSection, setActiveSection] = useState<"overview" | "orders" | "addresses">("overview");

  const loadAccount = useCallback(async (userId: string) => {
    const result = await loadCustomerAccount(userId);
    setProfileName(result.profile?.full_name ?? "");
    setProfilePhone(result.profile?.phone || (session?.user.phone ?? "").replace(/^\+91/, ""));
    setAddresses(result.addresses);
    setOrders(result.orders);
  }, [session?.user.phone]);

  useEffect(() => {
    const sync = () => setSession(getCustomerSession());
    sync();
    window.addEventListener("rmm-auth-change", sync);
    window.addEventListener("storage", sync);
    setBooting(false);
    return () => {
      window.removeEventListener("rmm-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!session?.user.id) return;
    let active = true;
    setBusy(true);
    loadAccount(session.user.id)
      .catch((reason: unknown) => active && setError(reason instanceof Error ? reason.message : "Account details could not be loaded."))
      .finally(() => active && setBusy(false));
    return () => { active = false; };
  }, [session?.user.id, loadAccount]);

  const handleSendOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError(""); setNotice("");

    // Normalize pasted numbers too: spaces, +91 and punctuation must not
    // cause a valid Indian 10-digit mobile number to fail validation.
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (!/^[6-9][0-9]{9}$/.test(cleanPhone)) {
      setError("Valid 10-digit Indian mobile number enter karein.");
      return;
    }

    setPhone(cleanPhone);
    setBusy(true);
    try {
      await sendPhoneOtp(cleanPhone);
      setOtpSent(true);
      setNotice("OTP bhejne ki request successful rahi. SMS mein aaya 6-digit code enter karein.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "OTP send nahi ho paya.");
    } finally { setBusy(false); }
  };

  const handleVerifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError(""); setNotice("");
    if (!/^\d{6}$/.test(otp)) { setError("6-digit OTP enter karein."); return; }
    setBusy(true);
    try {
      const next = await verifyPhoneOtp(phone, otp);
      setSession(next);
      setNotice("Mobile number verify ho gaya.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "OTP verify nahi ho paya.");
    } finally { setBusy(false); }
  };

  const handleProfileSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!session) return;
    setError(""); setNotice("");
    if (profileName.trim().length < 2) { setError("Apna poora naam enter karein."); return; }
    setBusy(true);
    try {
      await saveCustomerProfile(session.user.id, profileName, profilePhone);
      setNotice("Profile save ho gaya.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Profile save nahi ho paya.");
    } finally { setBusy(false); }
  };

  const handleAddressSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!session) return;
    setError(""); setNotice("");
    if (addressDraft.recipient_name.trim().length < 2 || !/^[6-9]\d{9}$/.test(addressDraft.phone) ||
      addressDraft.address_line1.trim().length < 5 || addressDraft.city.trim().length < 2 ||
      addressDraft.state.trim().length < 2 || !/^[1-9]\d{5}$/.test(addressDraft.postal_code)) {
      setError("Address details check karein. Mobile aur 6-digit PIN code sahi hona chahiye.");
      return;
    }
    setBusy(true);
    try {
      const payload = { ...addressDraft, recipient_name: addressDraft.recipient_name.trim(), address_line1: addressDraft.address_line1.trim() };
      if (editingAddressId) {
        const rows = await updateCustomerAddress(session.user.id, editingAddressId, payload);
        setAddresses((current) => current.map((entry) => {
          if (entry.id === editingAddressId) return rows[0] ?? entry;
          return addressDraft.is_default ? { ...entry, is_default: false } : entry;
        }));
        setNotice("Delivery address update ho gaya.");
      } else {
        const rows = await saveCustomerAddress(session.user.id, payload);
        setAddresses((current) => [...(addressDraft.is_default ? current.map((entry) => ({ ...entry, is_default: false })) : current), ...rows]);
        setNotice("Delivery address save ho gaya.");
      }
      setAddressDraft(blankAddress);
      setEditingAddressId(null);
      setAddressFormOpen(false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Address save nahi ho paya.");
    } finally { setBusy(false); }
  };

  const removeAddress = async (id: string) => {
    if (!session || !window.confirm("Is delivery address ko delete karein?")) return;
    setBusy(true); setError("");
    try {
      await deleteCustomerAddress(session.user.id, id);
      setAddresses((current) => current.filter((entry) => entry.id !== id));
      setNotice("Address remove ho gaya.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Address delete nahi ho paya.");
    } finally { setBusy(false); }
  };

  const handleSignOut = async () => {
    await signOutCustomer();
    setSession(null); setAddresses([]); setOrders([]); setProfileName(""); setProfilePhone("");
    setActiveSection("overview"); setOtpSent(false); setOtp("");
  };

  if (booting) return <main className="min-h-[70vh] bg-[#FAF7EF] p-6"><div className="mx-auto h-48 max-w-3xl animate-pulse rounded-3xl bg-white" /></main>;

  if (!session) return (
    <main className="min-h-[75vh] w-full min-w-0 bg-[#FAF7EF] px-3 py-6 sm:px-4 sm:py-10">
      <div className="mx-auto grid w-full min-w-0 max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-[#E8DFD1] bg-white shadow-[0_18px_55px_rgba(70,40,30,0.08)] sm:rounded-[28px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-w-0 flex-col justify-between bg-[#315F35] p-4 text-white sm:p-7 lg:p-9">
          <div>
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/12"><UserRound size={24}/></span>
            <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[.22em] text-white/65">Rashid Mega Mart</p>
            <h1 className="mt-2 min-w-0 break-words text-3xl font-black leading-tight sm:text-4xl">Your grocery account, all in one place.</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">Orders dekhein, delivery addresses save karein aur apni profile manage karein.</p>
          </div>
          <div className="mt-10 flex items-center gap-2 text-xs font-semibold text-white/75"><ShieldCheck size={16}/> Secure mobile verification</div>
        </div>
        <div className="min-w-0 p-4 sm:p-7 lg:p-9">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#168447]">Customer sign in</p>
          <h2 className="mt-2 text-2xl font-black text-[#30251F]">{otpSent ? "Verify your number" : "Continue with mobile"}</h2>
          <p className="mt-2 text-sm leading-6 text-[#81796F]">{otpSent ? `We sent a one-time code to +91 ${phone}. Enter it below.` : "Password ki zaroorat nahi. Aapke mobile par one-time password aayega."}</p>
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="mt-7 space-y-4">
              <label className="block text-xs font-bold text-[#30251F]" htmlFor="account-phone">Mobile number</label>
              <div className="flex h-12 overflow-hidden rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] focus-within:border-[#168447]">
                <span className="flex items-center border-r border-[#E8DFD1] px-3 text-sm font-bold text-[#625F56]">+91</span>
                <input id="account-phone" inputMode="numeric" autoComplete="tel-national" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"/>
              </div>
              <button disabled={busy || phone.length !== 10} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] text-sm font-extrabold text-white transition hover:bg-[#106B38] disabled:opacity-50">{busy ? "Please wait..." : "Send OTP"} <ArrowRight size={16}/></button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-7 space-y-4">
              <label className="block text-xs font-bold text-[#30251F]" htmlFor="account-otp">6-digit OTP</label>
              <input id="account-otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="••••••" className="h-14 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-4 text-center text-2xl font-black tracking-[.5em] outline-none focus:border-[#168447]"/>
              <button disabled={busy || otp.length !== 6} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#168447] text-sm font-extrabold text-white hover:bg-[#106B38] disabled:opacity-50">{busy ? "Verifying..." : "Verify & continue"}</button>
              <button type="button" onClick={() => { setOtpSent(false); setOtp(""); setError(""); }} className="w-full py-2 text-xs font-bold text-[#625F56]">Change mobile number</button>
            </form>
          )}
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}
          {notice && <p role="status" className="mt-4 rounded-xl bg-[#EAF3E6] p-3 text-xs font-semibold text-[#315F35]">{notice}</p>}
          <p className="mt-6 text-[10px] leading-5 text-[#A0968D]">By continuing, you agree to our <Link className="font-bold underline" href="/terms-and-conditions">Terms</Link> and <Link className="font-bold underline" href="/privacy-policy">Privacy Policy</Link>.</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#625F56]"><ChevronRight className="rotate-180" size={15}/> Back to shopping</Link>
          <div className="mt-6 rounded-2xl border border-[#E8DFD1] bg-[#FAF7EF] p-4">
            <div className="flex items-center gap-2 text-sm font-black text-[#30251F]"><LifeBuoy size={17} className="text-[#315F35]"/> Need help?</div>
            <a href={`https://wa.me/918962531603?text=${encodeURIComponent("Hello Rashid Mega Mart! I need help with my account.")}`} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 text-xs font-extrabold text-[#315F35]"><Image src="/Whatsapp-3d.svg" alt="" width={22} height={22} unoptimized/> Contact Rashid Mega Mart on WhatsApp <ArrowRight size={14} className="ml-auto"/></a>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#FAF7EF] px-3 py-5 pb-28 sm:px-6 sm:py-9">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#168447]">Rashid Mega Mart</p><h1 className="mt-1 text-2xl font-black text-[#30251F] sm:text-3xl">My Account</h1><p className="mt-1 text-xs text-[#81796F]">Manage your details and grocery orders.</p></div>
          <button onClick={handleSignOut} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E8DFD1] bg-white px-3 text-xs font-bold text-[#625F56] hover:text-red-600"><LogOut size={15}/> Sign out</button>
        </header>

        <section className="mt-5 rounded-3xl bg-[#315F35] p-5 text-white sm:p-7">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15"><UserRound size={27}/></span>
            <div className="min-w-0 flex-1"><p className="truncate text-lg font-black">{profileName || "Welcome to Rashid Mega Mart"}</p><p className="mt-1 text-xs text-white/75">+91 {profilePhone || (session.user.phone ?? "").replace(/^\+91/, "")}</p></div>
            <BadgeCheck size={22} className="shrink-0 text-[#F2D27B]"/>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button onClick={() => setActiveSection("orders")} className="rounded-xl bg-white/10 p-3 text-left hover:bg-white/15"><Package size={18}/><p className="mt-2 text-xl font-black">{orders.length}</p><p className="text-[10px] text-white/70">Orders</p></button>
            <button onClick={() => setActiveSection("addresses")} className="rounded-xl bg-white/10 p-3 text-left hover:bg-white/15"><MapPin size={18}/><p className="mt-2 text-xl font-black">{addresses.length}</p><p className="text-[10px] text-white/70">Saved addresses</p></button>
            <div className="col-span-2 flex items-center gap-2 rounded-xl bg-white/10 p-3 sm:col-span-1"><ShieldCheck size={18}/><span className="text-[10px] font-semibold text-white/80">Mobile verified</span></div>
          </div>
        </section>

        <nav className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-[#E8DFD1] bg-white p-1.5">
          {([{ id: "overview", label: "Profile" }, { id: "orders", label: "My Orders" }, { id: "addresses", label: "Addresses" }] as const).map((tab) => <button key={tab.id} onClick={() => setActiveSection(tab.id)} className={`min-h-10 rounded-xl text-xs font-extrabold transition ${activeSection === tab.id ? "bg-[#EAF3E6] text-[#315F35]" : "text-[#81796F] hover:bg-[#FAF7EF]"}`}>{tab.label}</button>)}
        </nav>

        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}
        {notice && <p role="status" className="mt-4 rounded-xl bg-[#EAF3E6] p-3 text-xs font-semibold text-[#315F35]">{notice}</p>}
        {busy && <p className="mt-3 text-[11px] font-semibold text-[#81796F]">Updating account...</p>}

        {activeSection === "overview" && <section className="mt-4 rounded-2xl border border-[#E8DFD1] bg-white p-4 sm:p-6">
          <h2 className="text-base font-black text-[#30251F]">Personal information</h2><p className="mt-1 text-xs text-[#81796F]">Your name and verified mobile number.</p>
          <form onSubmit={handleProfileSave} className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#625F56]">Full name<input value={profileName} onChange={(event) => setProfileName(event.target.value)} maxLength={100} placeholder="Enter your name" className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm font-medium text-[#30251F] outline-none focus:border-[#168447]"/></label>
            <label className="text-xs font-bold text-[#625F56]">Mobile number<input value={profilePhone} readOnly className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#F3F0E9] px-3 text-sm font-medium text-[#81796F] outline-none"/></label>
            <button disabled={busy} className="mt-1 h-11 rounded-xl bg-[#168447] px-5 text-xs font-extrabold text-white hover:bg-[#106B38] disabled:opacity-50 sm:col-span-2 sm:w-fit">Save profile</button>
          </form>
        </section>}

        {activeSection === "addresses" && <section className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-2"><div><h2 className="text-base font-black text-[#30251F]">Delivery addresses</h2><p className="mt-1 text-xs text-[#81796F]">Save places you often order to.</p></div><button onClick={() => { setAddressDraft(blankAddress); setEditingAddressId(null); setAddressFormOpen((value) => !value); }} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#168447] px-3 text-xs font-extrabold text-white"><Plus size={15}/> Add address</button></div>
          {addressFormOpen && <form onSubmit={handleAddressSave} className="grid gap-3 rounded-2xl border border-[#E8DFD1] bg-white p-4 sm:grid-cols-2 sm:p-5"><h3 className="text-sm font-black text-[#30251F] sm:col-span-2">{editingAddressId ? "Edit delivery address" : "Add delivery address"}</h3>
            <label className="text-xs font-bold text-[#625F56]">Address label<select value={addressDraft.label} onChange={(event) => setAddressDraft({ ...addressDraft, label: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"><option>Home</option><option>Work</option><option>Other</option></select></label>
            <label className="text-xs font-bold text-[#625F56]">Recipient name<input required value={addressDraft.recipient_name} onChange={(event) => setAddressDraft({ ...addressDraft, recipient_name: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56]">Mobile number<input required inputMode="numeric" maxLength={10} value={addressDraft.phone} onChange={(event) => setAddressDraft({ ...addressDraft, phone: event.target.value.replace(/\D/g, "").slice(0,10) })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56] sm:col-span-2">House / street / area<input required minLength={5} maxLength={180} value={addressDraft.address_line1} onChange={(event) => setAddressDraft({ ...addressDraft, address_line1: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56]">Apartment / area (optional)<input value={addressDraft.address_line2} onChange={(event) => setAddressDraft({ ...addressDraft, address_line2: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56]">Landmark (optional)<input value={addressDraft.landmark} onChange={(event) => setAddressDraft({ ...addressDraft, landmark: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56]">City<input required value={addressDraft.city} onChange={(event) => setAddressDraft({ ...addressDraft, city: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56]">State<input required value={addressDraft.state} onChange={(event) => setAddressDraft({ ...addressDraft, state: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="text-xs font-bold text-[#625F56]">PIN code<input required inputMode="numeric" maxLength={6} value={addressDraft.postal_code} onChange={(event) => setAddressDraft({ ...addressDraft, postal_code: event.target.value.replace(/\D/g, "").slice(0,6) })} className="mt-2 h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm"/></label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#625F56] sm:col-span-2"><input type="checkbox" checked={addressDraft.is_default} onChange={(event) => setAddressDraft({ ...addressDraft, is_default: event.target.checked })}/> Set as default delivery address</label>
            <div className="flex gap-2 sm:col-span-2"><button disabled={busy} className="h-11 rounded-xl bg-[#168447] px-5 text-xs font-extrabold text-white disabled:opacity-50">Save address</button><button type="button" onClick={() => { setAddressFormOpen(false); setEditingAddressId(null); setAddressDraft(blankAddress); }} className="h-11 rounded-xl border border-[#E8DFD1] px-4 text-xs font-bold text-[#625F56]">Cancel</button></div>
          </form>}
          {addresses.length === 0 && !addressFormOpen && <div className="rounded-2xl border border-dashed border-[#D8CBB8] bg-white px-4 py-10 text-center"><MapPin className="mx-auto text-[#168447]" size={26}/><p className="mt-3 text-sm font-extrabold text-[#30251F]">No saved addresses yet</p><p className="mt-1 text-xs text-[#81796F]">Add your home or work delivery address.</p></div>}
          {addresses.map((address) => <article key={address.id} className="flex items-start gap-3 rounded-2xl border border-[#E8DFD1] bg-white p-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E6] text-[#315F35]"><MapPin size={18}/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-extrabold text-[#30251F]">{address.label}</p>{address.is_default && <span className="rounded-full bg-[#EAF3E6] px-2 py-1 text-[9px] font-extrabold text-[#315F35]">DEFAULT</span>}</div><p className="mt-1 text-xs font-semibold text-[#625F56]">{address.recipient_name} · {address.phone}</p><p className="mt-1 text-xs leading-5 text-[#81796F]">{[address.address_line1,address.address_line2,address.landmark,address.city,address.state,address.postal_code].filter(Boolean).join(", ")}</p></div><div className="flex shrink-0 flex-col gap-1"><button onClick={() => { setAddressDraft({ label: address.label, recipient_name: address.recipient_name, phone: address.phone, address_line1: address.address_line1, address_line2: address.address_line2 ?? "", landmark: address.landmark ?? "", city: address.city, state: address.state, postal_code: address.postal_code, is_default: address.is_default }); setEditingAddressId(address.id); setAddressFormOpen(true); }} className="rounded-lg px-2 py-1.5 text-[10px] font-bold text-[#315F35] hover:bg-[#EAF3E6]">Edit</button><button onClick={() => removeAddress(address.id)} aria-label="Delete address" className="flex size-8 items-center justify-center rounded-lg text-[#9B3B42] hover:bg-red-50"><X size={15}/></button></div></article>)}
        </section>}

        {activeSection === "orders" && <section className="mt-4 space-y-3">
          <div><h2 className="text-base font-black text-[#30251F]">My Orders</h2><p className="mt-1 text-xs text-[#81796F]">Your orders placed while signed in.</p></div>
          {orders.length === 0 && <div className="rounded-2xl border border-dashed border-[#D8CBB8] bg-white px-4 py-10 text-center"><Package className="mx-auto text-[#168447]" size={27}/><p className="mt-3 text-sm font-extrabold text-[#30251F]">No orders yet</p><p className="mt-1 text-xs text-[#81796F]">Your signed-in orders will appear here.</p><Link href="/kits" className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#168447] px-4 text-xs font-extrabold text-white">Explore grocery kits <ArrowRight size={14}/></Link></div>}
          {orders.map((order) => <article key={order.id} className="rounded-2xl border border-[#E8DFD1] bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[10px] font-bold text-[#81796F]">ORDER · {order.id.slice(0,8).toUpperCase()}</p><p className="mt-1 text-xs font-semibold text-[#625F56]">{new Date(order.created_at).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p></div><span className="rounded-full bg-[#FAF0C8] px-3 py-1.5 text-[10px] font-extrabold text-[#806000]">{statusLabel(order.status)}</span></div><div className="mt-3 space-y-1 border-t border-[#EEE8E1] pt-3">{order.items.map((item,index)=><div key={index} className="flex justify-between gap-3 text-xs"><span className="text-[#625F56]">{item.name} × {item.quantity}</span><span className="font-bold text-[#30251F]">{money(item.line_total)}</span></div>)}</div><div className="mt-3 flex items-center justify-between border-t border-[#EEE8E1] pt-3"><span className="text-xs font-bold text-[#81796F]">Subtotal · {order.payment_preference.toUpperCase()}</span><span className="text-sm font-black text-[#168447]">{money(Number(order.subtotal))}</span></div></article>)}
        </section>}


        <section className="mt-5 rounded-2xl border border-[#E8DFD1] bg-white p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E6] text-[#315F35]"><LifeBuoy size={19}/></span>
            <div><h2 className="text-sm font-black text-[#30251F]">Help & Support</h2><p className="mt-1 text-xs leading-5 text-[#81796F]">Need help with an order, delivery or store policy? We’re here to help.</p></div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a href={`https://wa.me/918962531603?text=${encodeURIComponent("Hello Rashid Mega Mart! I need help with my order.")}`} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 rounded-xl bg-[#EAF3E6] px-3 text-xs font-extrabold text-[#315F35] transition hover:bg-[#DFEED8]">
              <Image src="/Whatsapp-3d.svg" alt="" width={24} height={24} unoptimized/> Contact on WhatsApp <ArrowRight size={14} className="ml-auto"/>
            </a>
            <Link href="/returns-refunds" className="flex min-h-12 items-center gap-3 rounded-xl border border-[#EEE8E1] px-3 text-xs font-bold text-[#625F56] transition hover:bg-[#FAF7EF]"><Package size={17} className="text-[#800020]"/> Returns & Refunds <ChevronRight size={15} className="ml-auto"/></Link>
            <Link href="/privacy-policy" className="flex min-h-12 items-center gap-3 rounded-xl border border-[#EEE8E1] px-3 text-xs font-bold text-[#625F56] transition hover:bg-[#FAF7EF]"><ShieldCheck size={17} className="text-[#800020]"/> Privacy Policy <ChevronRight size={15} className="ml-auto"/></Link>
            <Link href="/terms-and-conditions" className="flex min-h-12 items-center gap-3 rounded-xl border border-[#EEE8E1] px-3 text-xs font-bold text-[#625F56] transition hover:bg-[#FAF7EF]"><CircleHelp size={17} className="text-[#800020]"/> Terms & Conditions <ChevronRight size={15} className="ml-auto"/></Link>
          </div>
        </section>

        <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#FAF0C8]/65 p-3 text-[10px] leading-5 text-[#66521B]"><CircleHelp size={15} className="mt-0.5 shrink-0"/> Orders remain pending until Rashid Mega Mart confirms availability, delivery and final amount. Cash on Delivery and UPI on Delivery are confirmed with the store.</div>
      </div>
    </main>
  );
}
