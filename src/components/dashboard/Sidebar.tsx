import {
  PowerIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import { navItems } from "@/data/dashboard";
import type { PanelKey } from "@/data/dashboard";

const Sidebar = ({
  active,
  onSelect,
  isVisible,
}: {
  active: PanelKey;
  onSelect: (panel: PanelKey | "create") => void;
  isVisible: boolean;
}) => (
  <aside
    className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200/70 bg-white/80 backdrop-blur transition duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950/70 lg:static lg:translate-x-0 ${
      isVisible ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="flex h-full flex-col gap-6 px-6 py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
          <UserGroupIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">YouWare</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">Web Studio</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(({ label, key, icon: Icon }) => {
          const isActive = key === active;
          const actionClasses =
            key === "create"
              ? "mt-5 inline-flex w-full items-center gap-3 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400"
              : "group inline-flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition";

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={
                key === "create"
                  ? actionClasses
                  : `${actionClasses} ${
                      isActive
                        ? "bg-slate-900 text-white shadow-soft dark:bg-white/90 dark:text-slate-900"
                        : "bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
                    }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/70 px-4 py-3 text-sm font-semibold text-slate-500 transition hover:border-rose-500 hover:text-rose-500 dark:border-slate-800 dark:text-slate-400 dark:hover:border-rose-400 dark:hover:text-rose-300">
        <PowerIcon className="h-5 w-5" />
        Logout
      </button>
    </div>
  </aside>
);

export default Sidebar;