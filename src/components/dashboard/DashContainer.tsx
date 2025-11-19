import React from 'react'

export default function DashContainer({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`${className || " "}  relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70  shadow-soft backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70`}>
            {children}
        </div>
    )
}
