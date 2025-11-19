"use client";

import { useState, useMemo } from "react";

import Sidebar from "@/components/dashboard/Sidebar";



import TopBar from "@/components/dashboard/TopBar";

function Dashboard({ children }: { children: React.ReactNode }) {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userName = useMemo(() => "Alex", []);

 

 

  return (
    <div className="relative min-h-screen bg-slate-100/70 text-slate-900 dark:bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-x-0 top-0 h-80 bg-accent-glow opacity-70 blur-3xl" />
      <div className="absolute inset-0 h-full w-full bg-linear-to-br from-white/60 via-white/40 to-white/20 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/80" />

      <div className="relative mx-auto flex min-h-screen flex-col lg:flex-row">
        <Sidebar
         
          
          isVisible={sidebarOpen}
        />

        <div className="flex flex-1 flex-col">
          <TopBar
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            userName={userName}
          />

          <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
              {children}

              <p className="rounded-2xl border border-dashed border-slate-300/70 bg-white/70 p-4 text-sm text-slate-500 opacity-80 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                TODO: Replace mock data with live portfolio data from the YouWare backend once endpoints are ready.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
