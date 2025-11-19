import {
  PlusIcon,
} from "@heroicons/react/24/outline";

import StatCard from "./StatCard";
import ActivityItem
  from "./ActivityItem";

import { mockStats, mockActivity } from "@/data/dashboard";
import DashContainer from "./DashContainer";

const OverviewPanel = ({ userName = "Alex" }: { userName?: string }) => (
  <div className="flex flex-col gap-8">
    <DashContainer className="p-8">
      <div className="pointer-events-none absolute -top-6 left-10 h-24 w-24 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-10 h-28 w-28 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-brand-500">Overview</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Welcome back, {userName}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-300">
            Here’s a quick snapshot of your website portfolio. Keep shipping polished experiences with reusable sections, one-click themes, and collaborative workflows.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400">
          <PlusIcon className="h-5 w-5" />
          Create New Website
        </button>
      </div>
    </DashContainer>

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {mockStats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-2">
      <DashContainer className="space-y-4  p-6 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
          <button className="text-sm font-semibold text-brand-500 hover:text-brand-400">View all</button>
        </div>
        <div className="space-y-3">
          {mockActivity.map((item) => (
            <ActivityItem key={item.title} {...item} />
          ))}
        </div>
      </DashContainer>
      <DashContainer className="flex h-full flex-col justify-between gap-4 p-6 ">
        <div>
          <h2 className="text-lg font-semibold text-white">Collaborate faster</h2>
          <p className="mt-2 text-sm text-slate-200">
            Invite teammates, share access, and track changes in real time across every website you publish.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
          Share invite link
        </button>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-300">
          <span>Real-time commenting</span>
          <span>Version history</span>
        </div>
      </DashContainer>
    </section>
  </div>
);

export default OverviewPanel;