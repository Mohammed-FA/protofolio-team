import Image from "next/image";
import thumbnailImage from "../../../public/assets/images/profile/photo-group.avif";
const WebsiteCard = ({
  title,
  updatedAt,
  status,
}: {
  title: string;
  updatedAt: string;
  status: "Draft" | "Published";
}) => (
  <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-card transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
    <div className="relative h-40 overflow-hidden">
      <Image src={thumbnailImage} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" width={400} height={400}/>
      <span
        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold capitalize tracking-wide text-white ${
          status === "Published" ? "bg-emerald-500" : "bg-amber-500"
        }`}
      >
        {status}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Updated {updatedAt}</p>
      </div>
      <div className="mt-auto flex gap-2">
        <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-300">
          Edit
        </button>
        <button className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
          View
        </button>
        <button className="rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-400/10">
          Delete
        </button>
      </div>
    </div>
  </article>
);

export default WebsiteCard;