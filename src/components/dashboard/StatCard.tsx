import { PlusIcon } from "@heroicons/react/24/outline";

const StatCard = ({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  change: string;
  icon: typeof PlusIcon;
}) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
      </div>
      <span className="inline-flex rounded-xl bg-brand-500/10 p-3 text-brand-500 shadow-soft">
        <Icon className="h-6 w-6" />
      </span>
    </div>
    <p className="text-sm text-slate-500 dark:text-slate-400">{change}</p>
  </div>
);
export default StatCard;