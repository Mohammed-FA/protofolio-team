import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import WebsiteCard from "./WebsiteCard";
import { mockWebsites } from "@/data/dashboard";

const WebsitesPanel = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">My Websites</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Monitor drafts, publish updates, and manage your live sites.</p>
      </div>
      <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400">
        <PlusIcon className="h-5 w-5" />
        New website
      </button>
    </div>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {mockWebsites.map((website) => (
        <WebsiteCard key={website.id} title={website.title} updatedAt={website.updatedAt} status={website.status as "Published" | "Draft"} thumbnail={website.thumbnail} />
      ))}
    </div>
  </div>
);

export default WebsitesPanel;