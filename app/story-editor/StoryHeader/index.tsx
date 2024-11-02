import React, { useState } from "react";
import {
  IconChevronLeft,
  IconMenu2,
  IconHelpCircle,
  IconPlayerPlay,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import StoryAMPPreview from "../StoryAMPPreview";

const StoryHeader = ({ slides }) => {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => setIsPublishing(false), 1500);
  };

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Frosted glass effect container */}
      <div className="backdrop-blur-md bg-black/75 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="hover:bg-white/10 p-2 rounded-full transition-colors duration-200 group"
                >
                  <IconChevronLeft className="w-5 h-5 stroke-2 group-hover:scale-95 transition-transform" />
                </Link>
                <button className="hover:bg-white/10 p-2 rounded-full transition-colors duration-200 group">
                  <IconMenu2 className="w-5 h-5 stroke-2 group-hover:scale-95 transition-transform" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-medium tracking-tight">
                  My First Story
                </h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-5">
              <button className="hover:bg-white/10 p-2 rounded-full transition-colors duration-200 relative group">
                <IconHelpCircle className="w-5 h-5 stroke-2 group-hover:scale-95 transition-transform" />
                {/* Tooltip */}

                <span className="absolute top-full mt-2 right-0 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Need help?
                </span>
              </button>
              <div
                className={`${
                  slides.length > 1
                    ? "bg-white/20 hover:bg-white/25 hover:bg-white/25 cursor-pointer"
                    : "bg-white/20 cursor-no-drop"
                } backdrop-blur-sm rounded-full p-1.5 group  transition-colors `}
              >
                <StoryAMPPreview slides={slides} />
              </div>

              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className={`
                  relative px-5 py-2 rounded-md font-medium text-sm 
                  transition-all duration-300 ease-out
                  ${
                    isPublishing
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20"
                  }
                `}
              >
                <span
                  className={`flex items-center space-x-1 ${
                    isPublishing ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span>Publish</span>
                </span>
                {isPublishing && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <IconCheck className="w-4 h-4 animate-scale-check" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS file
const styles = `
@keyframes scaleCheck {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-scale-check {
  animation: scaleCheck 0.5s ease-out forwards;
}
`;

export default StoryHeader;
