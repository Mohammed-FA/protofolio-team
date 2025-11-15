"use client";

import { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import Image from "next/image";

// أنواع البلوكات
type BlockType = "logo" | "link" | "button";
type BlockItem = {
    type: BlockType;
    text?: string;       // للـ link أو النص
    logoUrl?: string;    // للـ logo فقط
};

type ZoneBlocks = {
    logo: BlockItem[];
    links: BlockItem[];
    actions: BlockItem[];
};

export default function Builder() {
    const [zones, setZones] = useState<ZoneBlocks>({
        logo: [],
        links: [],
        actions: [],
    });

    const handleDrop = (event: DragEndEvent) => {
        const overId = event.over?.id as keyof ZoneBlocks | undefined;
        const activeId = event.active.id as BlockType;
        if (!overId) return;

        const newBlock: BlockItem = {
            type: activeId,
            text: activeId === "link" ? "New Link" : undefined
        };

        setZones((prev) => ({
            ...prev,
            [overId]: [...prev[overId], newBlock],
        }));
    };

    const handleLogoChange = (index: number, url: string) => {
        setZones((prev) => {
            const newLogo = [...prev.logo];
            newLogo[index] = { ...newLogo[index], logoUrl: url };
            return { ...prev, logo: newLogo };
        });
    };

    return (
        <DndContext onDragEnd={handleDrop}>
            <div className="min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Header Builder</h1>

                <div className="flex gap-4 mb-10">
                    <DraggableBlock id="logo" label="Logo" />
                    <DraggableBlock id="link" label="Link" />
                    <DraggableBlock id="button" label="Button" />
                </div>

                <div className="border rounded-lg bg-gray-50">
                    <ResizablePanelGroup direction="horizontal" className="w-full">
                        <ResizablePanel className="w-full flex">
                            <DropZone id="logo" gap={8}>
                                {zones.logo.map((block, i) => (
                                    <RenderBlock
                                        key={i}
                                        block={block}
                                        onLogoChange={(url) => handleLogoChange(i, url)}
                                    />
                                ))}
                            </DropZone>
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel className="w-full">
                            <DropZone id="links" gap={8}>
                                {zones.links.map((block, i) => (
                                    <RenderBlock
                                        key={i}
                                        block={block}
                                        onChangeText={(text) =>
                                            setZones((prev) => {
                                                const newLinks = [...prev.links];
                                                newLinks[i] = { ...newLinks[i], text };
                                                return { ...prev, links: newLinks };
                                            })
                                        }
                                    />
                                ))}
                            </DropZone>
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel className="w-full">
                            <DropZone id="actions" gap={8}>
                                {zones.actions.map((block, i) => (
                                    <RenderBlock
                                        key={i}
                                        block={block}
                                        onChangeText={(text) =>
                                            setZones((prev) => {
                                                const newActions = [...prev.actions];
                                                newActions[i] = { ...newActions[i], text };
                                                return { ...prev, actions: newActions };
                                            })
                                        }
                                    />
                                ))}
                            </DropZone>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </DndContext>
    );
}

function DraggableBlock({ id, label }: { id: BlockType; label: string }) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="p-3 border rounded bg-white shadow cursor-move"
        >
            {label}
        </div>
    );
}

function DropZone({
    id,
    children,
    gap = 2,
}: {
    id: keyof ZoneBlocks;
    children: React.ReactNode;
    gap?: number;
}) {
    const { isOver, setNodeRef } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            className={` flex transition h-16 flex-wrap w-full ${isOver ? "bg-blue-100 border border-blue-500" : "bg-white border-gray-300"}`}
            style={{ gap: `${gap}px` }}
        >
            {children}
        </div>
    );
}

function RenderBlock({
    block,
    onChangeText,
    onLogoChange,
}: {
    block: BlockItem;
    onChangeText?: (text: string) => void;
    onLogoChange?: (url: string) => void;
}) {
    if (block.type === "logo")
        return (
            <div className=" cursor-pointer  " onClick={() => document.getElementById(`logoInput`)?.click()}>
                {block.logoUrl ? (
                    <div className="w-16 h-full relative">

                        <Image src={block.logoUrl} alt="Logo" fill className=" object-contain" />
                    </div>
                ) : (
                    <div className="font-bold text-xl border ">Click to upload</div>
                )}
                <input
                    type="file"
                    id="logoInput"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && onLogoChange) {
                            const url = URL.createObjectURL(file);
                            onLogoChange(url);
                            console.log(url);
                        }
                    }}
                />
            </div>
        );

    if (block.type === "link")
        return (
            <input
                className="border-b text-blue-600 outline-none"
                value={block.text || "New Link"}
                onChange={(e) => onChangeText && onChangeText(e.target.value)}
                style={{
                    width: `${Math.max(block.text?.length || 8, 8)}ch`,
                    display: "inline-block",
                    padding: 0,
                }}
            />
        );

    if (block.type === "button") return <Button size="sm">Click</Button>;

    return null;
}
