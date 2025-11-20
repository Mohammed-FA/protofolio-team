/* Editor page: renders Sidebar and a feature-specific panel */
"use client"

import { useState } from "react"
import Sidebar, { FeatureKey } from "@/components/sidebar/Sidebar"
import FeaturePanel from "@/components/panels/FeaturePanel"

export default function EditorPage() {
  const [selected, setSelected] = useState<FeatureKey>("header")
  const [panelOpen, setPanelOpen] = useState(true)

  const handleSelect = (key: FeatureKey) => {
    setSelected(key)
    setPanelOpen(true) // reopen when selecting from sidebar
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar value={selected} onChange={handleSelect} />

      {panelOpen && <FeaturePanel feature={selected} onClose={() => setPanelOpen(false)} />}

      <div className="flex-1">{/* Canvas / preview area goes here */}</div>
    </div>
  )
}