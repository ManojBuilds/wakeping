"use client";

import { FrameHighlight } from "@/components/effects/frame-highlight";
import { Spotlight } from "@/components/effects/spotlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {
  Activity,
  AlertCircle,
  ExternalLink,
  Globe,
  Plus,
  RefreshCw,
  Terminal,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

export default function Dashboard() {
  const { user } = useUser();
  const sites = useQuery(api.sites.getSites);
  const createSite = useMutation(api.sites.createSite);
  const deleteSite = useMutation(api.sites.deleteSite);

  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl) {
      toast.error("Required fields missing");
      return;
    }

    setIsAdding(true);
    try {
      await createSite({ name: newName, url: newUrl });
      setNewName("");
      setNewUrl("");
      toast.success("Endpoint added to stack");
      setIsDialogOpen(false);
    } catch {
      toast.error("Failed to add monitor");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteSite({ id });
      toast.success("Instance terminated");
    } catch {
      toast.error("Failed to remove monitor");
    }
  };

  const activeSites = sites?.filter((s) => s.status === "active").length ?? 0;
  const errorSites = sites?.filter((s) => s.status === "error").length ?? 0;

  return (
    <div className="relative min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-100 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0,0,0,0.05)" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-75">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-white">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold tracking-tight uppercase">WakePing // Console</span>
          </Link>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl space-y-8 px-6 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              root@wakeping:~# <FrameHighlight className="font-normal text-zinc-500 italic">greet --user "{user?.firstName || "dev"}"</FrameHighlight>
            </h1>
            <p className="text-sm text-zinc-500 font-mono">
              System operational. Monitoring {sites?.length ?? 0} endpoints.
            </p>
          </div>

          <ResponsiveDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <ResponsiveDialogTrigger asChild>
              <Button className="h-10 bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs px-6 shadow-xl shadow-zinc-200 transition-all">
                <Plus className="mr-2 h-3.5 w-3.5" />
                NEW_MONITOR
              </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent className="sm:max-w-[480px]">
              <ResponsiveDialogHeader className="space-y-3">
                <ResponsiveDialogTitle className="font-mono text-xl font-bold uppercase tracking-tight">Connect New Endpoint</ResponsiveDialogTitle>
                <ResponsiveDialogDescription className="font-mono text-[12px] text-zinc-500">
                  Configure a health check for your remote instance.
                </ResponsiveDialogDescription>
              </ResponsiveDialogHeader>
              <form onSubmit={handleAddSite} className="space-y-8 p-6">
                <div className="space-y-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="name" className="font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Service Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. core-api-v1"
                      className="h-12 border-zinc-200 bg-zinc-50/50 font-mono text-sm focus-visible:ring-zinc-900 transition-colors"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="url" className="font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Health URL</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://api.v1.prod/health"
                      className="h-12 border-zinc-200 bg-zinc-50/50 font-mono text-sm focus-visible:ring-zinc-900 transition-colors"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  disabled={isAdding}
                  className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs font-bold transition-all shadow-lg active:scale-[0.98]"
                >
                  {isAdding ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  EXECUTE_DEPLOYMENT
                </Button>
              </form>
            </ResponsiveDialogContent>
          </ResponsiveDialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "ALL_SYSTEMS", value: sites?.length ?? 0, icon: Globe, color: "text-zinc-600" },
            { label: "STATUS_UP", value: activeSites, icon: Activity, color: "text-emerald-600" },
            { label: "STATUS_DOWN", value: errorSites, icon: AlertCircle, color: "text-rose-600" },
          ].map((stat) => (
            <div key={stat.label} className="group relative rounded-lg border border-zinc-100 bg-white p-5 ring-1 ring-zinc-100 transition-all hover:ring-zinc-200">
              <p className="font-mono text-[10px] font-bold tracking-widest text-zinc-400">{stat.label}</p>
              <div className="mt-2 flex items-baseline justify-between">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <stat.icon className={`h-4 w-4 ${stat.color} opacity-40`} />
              </div>
            </div>
          ))}
        </div>

        {/* Monitors List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-mono text-xs font-bold text-zinc-900 border-l-2 border-zinc-900 pl-2 uppercase tracking-tight">Active_Services</h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-100 bg-white ring-1 ring-zinc-100">
            {sites === undefined ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <RefreshCw className="h-4 w-4 text-zinc-300 animate-spin" />
                <p className="font-mono text-[10px] text-zinc-400">PULLING_DATA...</p>
              </div>
            ) : sites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <p className="font-mono text-sm text-zinc-400">/empty_set: No endpoints monitored.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-50">
                {sites.map((site: any) => (
                  <div
                    key={site._id}
                    className="group flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-zinc-50/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-2 h-2 w-2 rounded-sm flex-shrink-0 ${site.status === "active" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" :
                        site.status === "error" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.2)]" :
                          "bg-zinc-300"
                        }`} />
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-zinc-900">{site.name}</h4>
                          <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 border rounded uppercase ${site.status === "active" ? "text-emerald-700 bg-emerald-50 border-emerald-100" :
                            "text-rose-700 bg-rose-50 border-rose-100"
                            }`}>
                            {site.status || "WAIT"}
                          </span>
                        </div>
                        <Link
                          href={site.url}
                          target="_blank"
                          className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600 truncate max-w-[280px] sm:max-w-md"
                        >
                          {site.url}
                          <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-50" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-8 pl-6 sm:pl-0">
                      <div className="text-right">
                        <p className="font-mono text-[9px] font-bold text-zinc-300 uppercase tracking-widest">LAST_PING</p>
                        <p className="font-mono text-xs text-zinc-500">
                          {site.lastPinged
                            ? new Date(site.lastPinged).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
                            : "00:00:00"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(site._id)}
                        className="h-8 w-8 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-zinc-50 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-zinc-400 underline decoration-zinc-100">v0.1.0-alpha</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-mono text-[10px] text-zinc-400 hover:text-zinc-900">DOCS</Link>
            <Link href="#" className="font-mono text-[10px] text-zinc-400 hover:text-zinc-900">GITHUB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
