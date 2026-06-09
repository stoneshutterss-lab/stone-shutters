//src/app/frames/page.js
"use client";

import { useState } from "react";

import FramesHero from "@/sections/Frames/FramesHero";
import FramesGrid from "@/sections/Frames/FramesGrid";
import CustomFramesCTA from "@/sections/Frames/CustomFramesCTA";
import FrameInquiryModal from "@/sections/Frames/FrameInquiryModal";

export default function FramesPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [selectedFrame, setSelectedFrame] = useState("");

  const openInquiry = (frameName = "") => {
    setSelectedFrame(frameName);
    setIsInquiryOpen(true);
  };
  return (
    <>
      <FramesHero />

      <FramesGrid onOpenInquiry={openInquiry} />

      <CustomFramesCTA onOpenInquiry={openInquiry} />

      <FrameInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        selectedFrame={selectedFrame}
      />
    </>
  );
}
