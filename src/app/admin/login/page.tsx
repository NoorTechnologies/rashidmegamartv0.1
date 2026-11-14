"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, LoaderCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password }),
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        setError(result.message ?? "Login nahi ho paya. Dobara try karein.");
        return;
      }

      const requestedPath = searchParams.get("next") ?? "/admin";
      const safePath = requestedPath.startsWith("/admin/") || requestedPath === "/admin"
        ? requestedPath
        : "/admin";
      router.replace(safePath);
      router.refresh();
    } catch {
      setError("Server se connection nahi ho paya. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#F8F6F3] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-[#EFE5E7] bg-white p-6 shadow-[0_18px_60px_rgba(80,20,35,0.09)] sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo2.png" alt="Rashid Mega Mart" width={68} height={68} priority className="size-[68px] object-contain" />
          <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A47A2C]">Owner access</p>
          <h1 className="mt-2 text-2xl font-black text-[#741D36]">Admin Login</h1>
          <p className="mt-2 text-sm text-[#81747A]">Rashid Mega Mart management panel</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-xs font-bold text-[#59464D]">
            Username
            <input
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1.5 min-h-12 w-full rounded-xl border border-[#EADDE0] bg-white px-4 text-sm text-[#33232A] outline-none focus:border-[#A83250] focus:ring-2 focus:ring-[#A83250]/10"
              placeholder="Enter admin username"
            />
          </label>
          <label className="block text-xs font-bold text-[#59464D]">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 min-h-12 w-full rounded-xl border border-[#EADDE0] bg-white px-4 text-sm text-[#33232A] outline-none focus:border-[#A83250] focus:ring-2 focus:ring-[#A83250]/10"
              placeholder="Enter admin password"
            />
          </label>

          {error && <p role="alert" className="rounded-xl border border-[#F0D5D9] bg-[#FFF5F6] px-3 py-2.5 text-xs text-[#800020]">{error}</p>}

          <button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-sm font-extrabold text-white transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <LoaderCircle size={17} className="animate-spin" /> : <LockKeyhole size={16} />}
            {loading ? "Checking..." : "Secure Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#F2EAEC] pt-5 text-[10px] font-semibold text-[#8A7C81]">
          <ShieldCheck size={14} className="text-[#16804A]" />
          Owner-only access · Secure session
        </div>
      </section>
    </main>
  );
}
