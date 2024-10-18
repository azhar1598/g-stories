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
import MoveableComponent from "./MoveableComponent";
import { EditorComponent } from "./EditorComponent";

const EditorPage = () => {
  return (
    <div className="min-h-screen bg-[#2e2e38] text-white">
      <main>
        <EditorComponent />
      </main>
    </div>
  );
};

export default EditorPage;
