"use client";

import { FrameHighlight } from "@/components/effects/frame-highlight";
import { Spotlight } from "@/components/effects/spotlight";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Code2,
  Command as CommandIcon,
  Cpu,
  Github,
  Globe,
  Terminal
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-100 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0,0,0,0.05)" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-white">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold tracking-tight uppercase">WakePing // v0.1.0</span>
          </div>
          {/* <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <Link href="#features" className="transition-colors hover:text-zinc-900">01_Features</Link>
            <Link href="#pricing" className="transition-colors hover:text-zinc-900">02_Specs</Link>
            <Link href="#docs" className="transition-colors hover:text-zinc-900">03_Docs</Link>
          </nav> */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900">Login</Button>
              </SignInButton>
              <Link href="/sign-up">
                <Button className="h-9 bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-[10px] font-bold uppercase px-4 transition-all">
                  Initialize
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-32 pb-24 text-center md:pt-40">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System_Status: Stable</span>
            </div>

            <h1 className="mt-8 text-4xl font-bold tracking-tighter md:text-7xl lg:text-8xl text-zinc-900">
              Keep your services <br />
              <FrameHighlight className="font-normal text-zinc-400 italic">instantly_alive.</FrameHighlight>
            </h1>

            <p className="mx-auto mt-8 max-w-xl font-mono text-sm text-zinc-500 leading-relaxed">
              &gt; Prevent Render.com and fly.io spin-downs.<br />
              &gt; Automated health pings from global edge nodes.<br />
              &gt; Maintain 100% warm cache and ready-to-serve instances.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/sign-up">
                <Button size="lg" className="h-12 px-8 bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs font-bold transition-all shadow-xl shadow-zinc-200 active:scale-[0.98]">
                  START_DEPLOYMENT <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="https://github.com/manojbuilds/wakeping">
                <Button variant="outline" size="lg" className="h-12 px-8 border-zinc-200 bg-white hover:bg-zinc-50 font-mono text-xs font-bold transition-all active:scale-[0.98]">
                  <Github className="mr-2 h-4 w-4 text-zinc-500" /> SOURCE_CODE
                </Button>
              </Link>
            </div>
          </div>

          {/* Code/Dashboard Preview */}
          <div className="mt-24 px-6 max-w-5xl mx-auto">
            <div className="rounded-lg border border-zinc-200 bg-white ring-1 ring-zinc-100 p-1.5 shadow-2xl">
              <div className="rounded-md border border-zinc-100 bg-[#fafafa] p-6 lg:p-10">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-sm bg-zinc-300" />
                    <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active_Monitors (03)</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-200" />
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-200" />
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    { name: "main-api-service", url: "https://api.v1.prod/health", status: "active", time: "2s ago" },
                    { name: "worker-node-edge", url: "https://edge.v1.prod/health", status: "active", time: "15s ago" },
                    { name: "legacy-db-proxy", url: "https://proxy.v1.prod/health", status: "active", time: "1m ago" },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between rounded border border-zinc-200 bg-white px-5 py-4 transition-all hover:ring-1 hover:ring-zinc-900">
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <div className="text-left font-mono">
                          <div className="text-xs font-bold text-zinc-900 uppercase tracking-tight">{s.name}</div>
                          <div className="text-[10px] text-zinc-400">{s.url}</div>
                        </div>
                      </div>
                      <div className="font-mono text-[9px] font-bold text-zinc-400 uppercase">{s.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-32 border-t border-zinc-50 bg-zinc-50/30">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            <div className="md:w-1/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 uppercase">01_Specs</h2>
              <p className="font-mono text-sm text-zinc-500 leading-relaxed">
                Engineered for maximum uptime and minimal latency. Simple integration, deep monitoring.
              </p>
            </div>

            <div className="md:w-2/3 grid gap-6 sm:grid-cols-2">
              {[
                { title: "EDGE_NODES", desc: "Global edge pingers send concurrent health checks from 12+ regions.", icon: Globe },
                { title: "PROTO_LOGS", desc: "Detailed ping logs and latency reporting with millisecond precision.", icon: Code2 },
                { title: "AUTOSCALE", desc: "Automatic rate detection to match your hosting provider's idle timeout.", icon: Cpu },
                { title: "WEBHOOKS", desc: "Trigger internal listeners if health states change in real-time.", icon: CommandIcon },
              ].map((f) => (
                <div key={f.title} className="group rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:ring-1 hover:ring-zinc-900">
                  <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded bg-zinc-900 text-white transition-transform group-hover:scale-110">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="mb-2 font-mono text-xs font-bold text-zinc-900 uppercase tracking-widest">{f.title}</h3>
                  <p className="font-mono text-[11px] text-zinc-500 leading-relaxed uppercase">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6 py-32 text-center relative overflow-hidden">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold md:text-6xl tracking-tighter uppercase mb-6">ready_to_deploy?</h2>
            <p className="font-mono text-sm text-zinc-500 mb-10 leading-relaxed">
              JOIN // 2,400+ DEVELOPERS CURRENTLY KEEPING THEIR STAGINGS WARM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-12 bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-sm font-bold shadow-2xl active:scale-[0.98]">
                  OPEN_ACCOUNT
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none" />
        </section>
      </main>

      <footer className="border-t border-zinc-100 py-12 bg-white relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Terminal className="h-4 w-4" />
            <span className="font-bold text-xs uppercase tracking-tighter">WakePing_OS</span>
          </div>
          <div className="flex gap-8 font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-zinc-900 transition-colors">ROOT</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">PRIVACY</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">LOGS</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">STATUS</Link>
          </div>
          <p className="font-mono text-[10px] text-zinc-400 uppercase">
            © 2026 // WAKEPING.ENGINEERING
          </p>
        </div>
      </footer>
    </div>
  );
}
