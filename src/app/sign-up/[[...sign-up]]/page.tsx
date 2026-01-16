import { Spotlight } from "@/components/effects/spotlight";
import { SignUp } from "@clerk/nextjs";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white selection:bg-zinc-100 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0,0,0,0.05)" />

      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-75">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-white">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight uppercase text-zinc-900">WakePing</span>
        </Link>
      </div>

      <div className="relative z-10 pt-12 pb-12">
        <SignUp appearance={{
          elements: {
            card: "bg-white border border-zinc-200 shadow-2xl shadow-zinc-200 ring-1 ring-zinc-100 rounded-lg",
            headerTitle: "font-mono text-xl font-bold uppercase tracking-tight text-zinc-900",
            headerSubtitle: "font-mono text-xs text-zinc-500 uppercase tracking-wide",
            socialButtonsBlockButton: "bg-white border border-zinc-200 text-zinc-600 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50/50 transition-colors",
            formButtonPrimary: "bg-zinc-900 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all",
            footerActionLink: "font-mono text-[10px] font-bold text-zinc-900 hover:text-zinc-600 uppercase tracking-widest transition-colors",
            dividerText: "font-mono text-[9px] text-zinc-400 uppercase tracking-widest",
            dividerLine: "bg-zinc-100",
            formFieldLabel: "font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest",
            formFieldInput: "bg-zinc-50/50 border-zinc-200 text-sm font-mono focus:ring-zinc-900 focus:border-zinc-900 transition-all",
            formFieldError: "font-mono text-[10px] uppercase font-bold text-rose-600",
          }
        }} />
      </div>

      <div className="absolute bottom-8 font-mono text-[10px] text-zinc-300 uppercase tracking-[0.2em]">
        wake_ping_registration_service // v0.1.0
      </div>
    </div>
  );
}
