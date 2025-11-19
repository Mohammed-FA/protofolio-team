const ActivityItem = ({ title, timestamp, actor }: { title: string; timestamp: string; actor: string }) => (
  <div className="flex items-start gap-4 rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500"></div>
    <div className="flex-1">
      <p className="font-medium text-slate-900 dark:text-white">{title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {actor} • {timestamp}
      </p>
    </div>
  </div>
);

export default ActivityItem;