import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import profileImage from "../../../public/assets/images/profile/profile.avif";

const TopBar = ({
  onToggleSidebar,
  onToggleTheme,
  isDark,
  userName,
}: {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  userName: string;
}) => (
  <header className="flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
    <div className="flex flex-1 items-center gap-4">
      <button
        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:border-brand-500 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 lg:hidden dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
        </svg>
      </button>
      <div className="relative hidden flex-1 lg:block">
        <input
          className="w-full rounded-2xl border border-transparent bg-slate-100/80 px-5 py-3 pl-11 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-slate-800/80 dark:text-white"
          placeholder="Search websites, drafts, or activity"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 3.473 9.8l3.613 3.614a.75.75 0 1 0 1.061-1.06l-3.614-3.614A5.5 5.5 0 0 0 9 3.5Zm-4 5.5a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onToggleTheme}
        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:border-brand-500 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
        aria-label="Toggle theme"
      >
        {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
      <button className="relative inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:border-brand-500 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200" aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.071a4 4 0 0 1-5.714 0M18 9a6 6 0 1 0-12 0c0 1.657-.895 2.995-1.725 3.913c-.433.482-.649.723-.641.839c.009.135.073.248.202.375C4.829 14.244 6.55 15 9 15h6c2.45 0 4.171-.756 5.164-1.873c.129-.127.193-.24.202-.375c.008-.116-.208-.357-.64-.84C18.895 11.995 18 10.657 18 9Z"
          />
        </svg>
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[11px] font-semibold text-white">
          3
        </span>
      </button>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
        <Image
          src={profileImage}
          alt={userName}
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{userName}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Product Designer</p>
        </div>
      </div>
    </div>
  </header>
);

export default TopBar;