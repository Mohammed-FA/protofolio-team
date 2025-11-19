import {
  Cog6ToothIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import ProfileField from "./ProfileField";
import DashContainer from "./DashContainer";

const ProfilePanel = ({ userName = "Alex" }: { userName?: string }) => (

  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account info, security, and personalization.</p>
      </div>
      <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-400">
        <Cog6ToothIcon className="h-5 w-5" />
        Preferences
      </button>
    </div>

    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <DashContainer className="space-y-6  p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src={`/assets/images/profile/profile.avif`}
            alt="Profile"
            className="h-28 w-28 rounded-3xl object-cover"
            width={100}
            height={100}
          />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{userName}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Product Designer</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-400">
            <PencilSquareIcon className="h-5 w-5" />
            Change photo
          </button>
        </div>
      </DashContainer>
      <form >
        <DashContainer className="space-y-6  p-6">

          <div className="grid gap-6 md:grid-cols-2">
            <ProfileField label="Full name" placeholder="Alex Johnson" />
            <ProfileField label="Display name" placeholder="Alex" />
            <ProfileField label="Email" type="email" placeholder="alex@studio.com" />
            <ProfileField label="Role" placeholder="Product Designer" />
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5 dark:border-slate-700 dark:bg-slate-900/60">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Change password</h3>
            <ProfileField label="Current password" type="password" placeholder="••••••••" />
            <ProfileField label="New password" type="password" placeholder="••••••••" />
            <ProfileField label="Confirm new password" type="password" placeholder="••••••••" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400">
              Save changes
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white">
              Cancel
            </button>
          </div>
        </DashContainer>

      </form>
    </div>
  </div>
);

export default ProfilePanel;