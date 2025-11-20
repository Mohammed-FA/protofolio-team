"use client"

import { FeatureKey } from "@/components/sidebar/Sidebar"
import { X } from "lucide-react"
import { Button } from "../ui/button"

type PaletteItem = {
    title: string
    preview: React.ReactNode
}

const previewFrame = (
    <div className="w-full aspect-4/3 rounded bg-zinc-200/90 dark:bg-zinc-200" />
)

const previewLabel = (
    <div className="w-28 h-6 rounded bg-zinc-200/90 dark:bg-zinc-200 mx-auto text-[10px] flex items-center justify-center text-zinc-700">
        Label
    </div>
)

const previewButton = (
    <div className="w-32 h-8 rounded bg-zinc-200/90 dark:bg-zinc-200 mx-auto text-[10px] flex items-center justify-center text-zinc-700">
        Click Me
    </div>
)

const previewLogo = (
    <div className="w-full flex items-center justify-center py-6">
        <div className="w-16 h-16 rounded bg-zinc-200/90 dark:bg-zinc-200" />
    </div>
)

const previewImage = (
    <div className="w-full flex items-center justify-center py-6">
        <div className="w-16 h-16 rounded bg-zinc-200/90 dark:bg-zinc-200" />
    </div>
)

const previewNav = (
    <div className="w-full flex items-center justify-center gap-2 py-4">
        <div className="h-6 w-14 rounded bg-zinc-200/90 dark:bg-zinc-200" />
        <div className="h-6 w-14 rounded bg-zinc-200/90 dark:bg-zinc-200" />
        <div className="h-6 w-14 rounded bg-zinc-200/90 dark:bg-zinc-200" />
    </div>
)

const previewCta = (
    <div className="w-full flex items-center justify-center py-4">
        <div className="h-8 w-28 rounded bg-zinc-200/90 dark:bg-zinc-200" />
    </div>
)

const previewSocialIcons = (
    <div className="w-full flex items-center justify-center gap-2 py-4">
        <div className="h-6 w-6 rounded bg-zinc-200/90 dark:bg-zinc-200" />
        <div className="h-6 w-6 rounded bg-zinc-200/90 dark:bg-zinc-200" />
        <div className="h-6 w-6 rounded bg-zinc-200/90 dark:bg-zinc-200" />
    </div>
)

const previewBackground = (
    <div className="w-full flex items-center justify-center py-4">
        <div className="h-8 w-28 rounded bg-zinc-200/90 dark:bg-zinc-200" />
    </div>
)

const featureToItems: Record<FeatureKey, PaletteItem[]> = {
    header: [
        { title: "Logo", preview: previewLogo },
        { title: "Navigation Menu", preview: previewNav },
        { title: "Call to Action Button", preview: previewCta },
    ],
    hero: [
        { title: "Main Title", preview: previewFrame },
        { title: "Subtitle", preview: previewFrame },
        { title: "Primary Button", preview: previewButton },
        { title: "Secondary Button", preview: previewButton },
        { title: "Profile Image", preview: previewImage },
        { title: "Social Icons", preview: previewSocialIcons },
        { title: "Background Settings", preview: previewBackground },
    ],
    about: [
        { title: "Title", preview: previewFrame },
        { title: "Description", preview: previewFrame },
        { title: "Profile Image", preview: previewImage },
        { title: "Info Cards", preview: previewFrame },
        { title: "CTA Button", preview: previewButton },
        { title: "Background Settings", preview: previewBackground }
    ],
    projects: [
        { title: "Title", preview: previewFrame },
        { title: "Projects List", preview: previewFrame },
        { title: "Tag Filters", preview: previewFrame },
        { title: "Background Settings", preview: previewBackground },
    ],
    skills: [
        { title: "Title", preview: previewFrame },
        { title: "Skills List", preview: previewFrame },
        { title: "Layout (Icon Row / Chips / Grid)", preview: previewFrame },
        { title: "Background Settings", preview: previewBackground },
    ],
    experience: [
        { title: "Section Title", preview: previewFrame },
        { title: "Experience List", preview: previewFrame },
        { title: "Timeline Layout (Vertical / Horizontal)", preview: previewFrame },
        { title: "Background Settings", preview: previewBackground },
        // { title: "Role Card", preview: previewFrame },
    ],
    education: [
        { title: "School Card", preview: previewFrame },
        { title: "Badge", preview: previewLabel },
    ],
    testimonials: [
        { title: "Quote", preview: previewLabel },
        { title: "Card", preview: previewFrame },
    ],
    contact: [
        { title: "Form", preview: previewFrame },
        { title: "Button", preview: previewButton },
    ],
    footer: [
        { title: "Footer", preview: previewFrame },
    ],
}

function PaletteCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-md border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-900 transition-colors">
            <div className="px-3 py-2 border-b border-zinc-800">
                <span className="text-[11px] uppercase tracking-wide text-zinc-300">{title}</span>
            </div>
            <div className="p-3 flex flex-col items-center gap-3">
                {children}
            </div>
        </div>
    )
}

export default function FeaturePanel({
    feature,
    onClose,
}: {
    feature: FeatureKey
    onClose?: () => void
}) {
    const items = featureToItems[feature]

    return (
        <aside className="w-72 h-screen overflow-y-auto bg-zinc-950 text-zinc-200 border-r border-zinc-800 p-2">
            <div className="px-1 pb-2 flex items-center justify-between">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{feature}</div>
                <Button
                    variant="ghost"
                    aria-label="Close panel"
                    className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-3">
                {items.map((item, idx) => (
                    <PaletteCard key={`${item.title}-${idx}`} title={item.title}>
                        {item.preview}
                        <div className="text-center text-sm text-zinc-300">{item.title}</div>
                    </PaletteCard>
                ))}
            </div>
        </aside>
    )
}
