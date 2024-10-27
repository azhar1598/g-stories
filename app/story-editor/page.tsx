"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  Type,
  Image,
  Video,
  Layout,
  Pen,
  ImageIcon,
  Plus,
  Slice,
} from "lucide-react";

import { EditorComponent } from "./EditorComponent";
import { EditorComponentMobile } from "./EditorComponentMobile";

const EditorPage = () => {
  return (
    <div className="min-h-screen bg-[#2e2e38] text-white">
      <main>
        {/* <div className="hidden md:block"> */}
        <EditorComponent />
        {/* </div> */}
        {/* <div className="md:hidden">
          <EditorComponentMobile />
        </div> */}
      </main>
    </div>
  );
};

export default EditorPage;
