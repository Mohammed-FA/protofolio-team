/* Portfolio Sidebar - core feature items */
"use client"

import { useState } from "react"
import {
    Menu,
    Home,
    User,
    FolderGit2,
    Sparkles,
    BriefcaseBusiness,
    GraduationCap,
    Quote,
    Mail,
    Info
} from "lucide-react"

export type FeatureKey =
    | "header"
    | "hero"
    | "about"
    | "projects"
    | "skills"
    | "experience"
    | "education"
    | "testimonials"
    | "contact"
    | "footer"
type SidebarProps = {
    value?: FeatureKey
    onChange?: (key: FeatureKey) => void
    className?: string
}

const featureItems: {
    key: FeatureKey
    label: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[] = [
        { key: "header", label: "Header", Icon: Menu },
        { key: "hero", label: "Hero", Icon: Home },
        { key: "about", label: "About", Icon: User },
        { key: "projects", label: "Projects", Icon: FolderGit2 },
        { key: "skills", label: "Skills", Icon: Sparkles },
        { key: "experience", label: "Experience", Icon: BriefcaseBusiness },
        { key: "education", label: "Education", Icon: GraduationCap },
        { key: "testimonials", label: "Testimonials", Icon: Quote },
        { key: "contact", label: "Contact", Icon: Mail },
        { key: "footer", label: "Footer", Icon: Info },
    ]

const Sidebar = ({ value, onChange, className }: SidebarProps) => {
    const [active, setActive] = useState<FeatureKey>(value ?? "hero")

    const handleSelect = (key: FeatureKey) => {
        setActive(key)
        onChange?.(key)
    }

    return (
        <nav
            className={`h-screen w-20 shrink-0 bg-zinc-900 text-zinc-200 flex flex-col items-center py-4 gap-2 border-r border-zinc-800 ${className || ""}`}
        >
            <div className="w-full px-3 pb-2">
                <div className="text-[11px] tracking-wide uppercase text-zinc-500">Portfolio</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1 w-full">
                {featureItems.map(({ key, label, Icon }) => {
                    const isActive = (value ?? active) === key
                    return (
                        <button
                            key={key}
                            onClick={() => handleSelect(key)}
                            className={`w-16 flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors
                ${isActive ? "bg-zinc-800 text-white" : "hover:bg-zinc-800/60"}`}
                            aria-pressed={isActive}
                            aria-label={label}
                            type="button"
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-[10px] leading-none text-center">{label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

export default Sidebar