const ProfileField = ({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
}) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500"
    />
  </label>
);

export default ProfileField;