"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface DevicePreviewProps {
  src: string;
  maxWidth?: number; // الحد الأقصى للعرض
}

const DevicePreview: React.FC<DevicePreviewProps> = ({ src, maxWidth = 600 }) => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [zoom, setZoom] = useState<number>(1);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // تحديث ارتفاع الحاوية عند تغيير حجم المتصفح
  useEffect(() => {
    const updateHeight = () => setContainerHeight(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const deviceWidths = {
    mobile: 375,
    tablet: 768,
    desktop: 1280,
  };

  const deviceRadius = {
    mobile: "1rem",
    tablet: "0.75rem",
    desktop: "0.5rem",
  };

  const width = deviceWidths[device];
  const radius = deviceRadius[device];

  // اجعل العرض لا يتجاوز maxWidth (مثل نصف الشاشة)
  const scale = Math.min(zoom, maxWidth / width);

  return (
    <div className="flex flex-col items-center justify-start h-full py-4 bg-gray-100 overflow-hidden">
      
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Device Preview</h1>

      {/* Device Switch + Zoom Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
        <Button
          variant="outline"
          onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.1))}
        >
          Zoom Out
        </Button>

        {(["mobile", "tablet", "desktop"] as const).map((d) => (
          <Button
            key={d}
            variant={device === d ? "default" : "outline"}
            onClick={() => setDevice(d)}
            className="capitalize"
          >
            {d}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() => setZoom((prev) => Math.min(prev + 0.1, 3))}
        >
          Zoom In
        </Button>
      </div>

      {/* Zoom Percentage */}
      <div className="mb-4">
        <span className="px-2 py-1 font-medium">{Math.round(scale * 100)}%</span>
      </div>

      {/* Device Frame */}
      <div
        className="border shadow-lg bg-white overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          width: `${width}px`,
          height: `${containerHeight}px`, // طول الحاوية
          borderRadius: radius,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          className="border-none"
          style={{ overflow: "auto" }}
          title="Device Preview"
        />
      </div>
    </div>
  );
};

export default DevicePreview;
