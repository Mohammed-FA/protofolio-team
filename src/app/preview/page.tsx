"use client";

import React, { useState } from "react";
import DevicePreview from "@/components/Comment/Device-preview";
import { Monitor,Settings } from "lucide-react"; 

const DevicePreviewPage = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [showTools, setShowTools] = useState(true);

  const togglePreview = () => setShowPreview(!showPreview);
  const toggleTools = () => setShowTools(!showTools);

  // حساب نسبة العرض لكل قسم
  const previewWidth = showPreview && showTools ? "md:w-1/2" : showPreview ? "w-full" : "hidden";
  const toolsWidth = showPreview && showTools ? "md:w-1/2" : showTools ? "w-full" : "hidden";

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-gray-100 relative">
      
      
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
        {/* أيقونة المعاينة */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-200 transition"
          onClick={togglePreview}
          title={showPreview ? "Hide Preview" : "Show Preview"}
        >
          <Monitor size={20} color={showPreview ? "#2563eb" : "#9ca3af"} />
        </button>

        {/* أيقونة التصميم */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-200 transition"
          onClick={toggleTools}
          title={showTools ? "Hide Tools" : "Show Tools"}
        >
          <Settings size={20} color={showTools ? "#16a34a" : "#9ca3af"} />
        </button>
      </div>

      {/* preview section */}
      <div className={`${previewWidth} flex flex-col h-full`}>
        {showPreview && (
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl border w-full h-full flex items-center justify-center">
              <DevicePreview src="/" maxWidth={900} />
            </div>
          </div>
        )}
      </div>

{/* design section */}
      <div className={`${toolsWidth} flex flex-col h-full`}>
        {showTools && (
          <div className="flex-1 p-6 bg-gray-50 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Design Tools</h2>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicePreviewPage;
