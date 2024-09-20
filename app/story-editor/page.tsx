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
} from "lucide-react";
import Moveable from "react-moveable";

import { X } from "lucide-react";
import MoveableComponent from "./MoveableComponent";

const EditorPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main>
        <EditorComponent />
      </main>
    </div>
  );
};

const EditorComponent = () => {
  const [slides, setSlides] = useState([
    { id: 1, backgroundColor: "#B24592", content: [{ text: "", type: "" }] },
  ]);
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      backgroundColor: "#B24592",
      content: "Type something",
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (id, updates) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, ...updates } : slide
      )
    );

    // If the selected slide is the one being updated, update the state for selectedSlide as well
    if (selectedSlide.id === id) {
      setSelectedSlide({ ...selectedSlide, ...updates });
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar updateSlide={updateSlide} selectedSlide={selectedSlide} />
      <Preview
        addSlide={addSlide}
        slides={slides}
        selectedSlide={selectedSlide}
        setSelectedSlide={setSelectedSlide}
        updateSlide={updateSlide}
      />
      {/* <DraggableInputContainer /> */}
      {/* <EditPanel
        selectedSlide={selectedSlide}
        updateSlide={updateSlide}
        addSlide={addSlide}
      /> */}
    </div>
  );
};

const Sidebar = ({ selectedSlide, updateSlide }) => {
  const [activePanel, setActivePanel] = useState(null);
  const [files, setFiles] = useState([]);

  const [isTextPanelOpen, setIsTextPanelOpen] = useState(false);

  const toggleTextPanel = () => {
    setIsTextPanelOpen(!isTextPanelOpen);
  };

  const fileInputRef = useRef(null);

  const buttons = [
    { icon: Layout, label: "Layout" },
    { icon: Type, label: "Text" },
    { icon: ImageIcon, label: "Image" },
    { icon: Video, label: "Video" },
    { icon: Pen, label: "Draw" },
  ];

  const handleButtonClick = (label) => {
    if (label === "Text") toggleTextPanel();
    setActivePanel(activePanel === label ? null : label);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleTextStyleClick = (style) => {
    const newContentBlock = { type: style, text: "Type something..." };

    // Check if the slide content is already an array, if not make it an array
    let updatedContent = Array.isArray(selectedSlide.content)
      ? [...selectedSlide.content, newContentBlock]
      : [newContentBlock];

    updateSlide(selectedSlide.id, { content: updatedContent });
  };

  return (
    <div className="flex h-full">
      <div className="w-16 bg-gray-900 p-4 flex flex-col items-center space-y-6">
        {buttons.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={`p-2 rounded-lg ${
              activePanel === label
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleButtonClick(label)}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
      {activePanel === "Image" && (
        <div className="w-72 bg-gray-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg">Image Video</h2>
            <button className="bg-orange-500 text-white rounded-full p-1">
              <Plus size={16} />
            </button>
          </div>
          <div
            className="border-2 border-dashed border-gray-600 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            {files.length === 0 ? (
              <>
                <div className="mb-2">
                  <Video size={32} />
                </div>
                <p className="text-center text-sm">
                  Drop your files here
                  <br />
                  or browse.
                </p>
              </>
            ) : (
              <p className="text-center text-sm">
                {files.length} file(s) selected
              </p>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
            accept="image/*,video/*"
          />
        </div>
      )}
      {isTextPanelOpen && (
        <div className="p-4 bg-gray-800 text-white w-64">
          <h3 className="text-gray-400 mb-4">Text Styles</h3>
          <div className="space-y-2">
            {[
              "Title",
              "Headline",
              "Subheadline",
              "Normal text",
              "Small text",
            ].map((style) => (
              <button
                key={style}
                className="block w-full py-2 bg-gray-700 rounded text-left px-2"
                onClick={() => handleTextStyleClick(style)}
              >
                {style}
              </button>
            ))}
          </div>
          <button className="mt-4 w-full border border-white py-2 text-center rounded">
            Edit text styles
          </button>
        </div>
      )}
    </div>
  );
};

const Preview = ({
  slides,
  selectedSlide,
  setSelectedSlide,
  addSlide,
  updateSlide,
}) => {
  const [target, setTarget] = useState(null); // Track the current target element
  const [frames, setFrames] = useState([]); // Track frames for each block
  const targetRefs = useRef([]); // Array to hold references for each block

  useEffect(() => {
    // Initialize frames and targetRefs for each block when selectedSlide changes
    if (selectedSlide && selectedSlide.content) {
      setFrames(
        selectedSlide.content.map(() => ({
          translate: [0, 0],
          width: 100,
          height: 30,
        }))
      );

      targetRefs.current = selectedSlide.content.map(
        (_, index) => targetRefs.current[index] || React.createRef()
      );
    }
  }, [selectedSlide]);

  const [inputs, setInputs] = useState([]);
  const containerRef = useRef(null);

  const handleAddInput = () => {
    const newInput = {
      id: Date.now(),
      text: "New Input",
      position: { x: 10, y: 10 },
    };
    setInputs([...inputs, newInput]);
  };

  const handleDrag = (id, newPosition) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const clampedX = Math.max(
      0,
      Math.min(newPosition.x - containerRect.left, containerRect.width - 100)
    );
    const clampedY = Math.max(
      0,
      Math.min(newPosition.y - containerRect.top, containerRect.height - 40)
    );

    setInputs(
      inputs.map((input) =>
        input.id === id
          ? { ...input, position: { x: clampedX, y: clampedY } }
          : input
      )
    );
  };

  const handleDelete = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleChange = (id, newText) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="text-gray-400 mb-4">
        Slide {slides.indexOf(selectedSlide) + 1}
      </div>
      <button onClick={handleAddInput} className="mb-4">
        Add Input Text
      </button>

      <div className="w-64 h-[32rem] bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {selectedSlide && (
          <div
            style={{ backgroundColor: selectedSlide.backgroundColor }}
            className="h-full"
          >
            <div className="relative overflow-none">
              <MoveableComponent />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex space-x-2">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-12 h-20 rounded-md cursor-pointer ${
              slide.id === selectedSlide.id ? "ring-2 ring-orange-500" : ""
            }`}
            style={{ backgroundColor: slide.backgroundColor }}
            onClick={() => setSelectedSlide(slide)}
          />
        ))}
        <button
          className="w-12 h-20 bg-gray-700 rounded-md flex items-center justify-center text-2xl"
          onClick={addSlide}
        >
          +
        </button>
      </div>
    </div>
  );
};

const EditPanel = ({ selectedSlide, updateSlide }) => {
  if (!selectedSlide?.content) return;

  return (
    <div className="w-64 bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Edit Slide</h2>

      {/* {selectedSlide?.content?.map((s, index) => (
        <input
          type="text"
          value={s.text || ""}
          onChange={(e) => {
            const updatedContent = [...selectedSlide.content]; // Create a copy of the content array
            updatedContent[index] = {
              ...updatedContent[index],
              text: e.target.value,
            }; // Update the specific text in the content block
            updateSlide(selectedSlide.id, { content: updatedContent }); // Pass the updated content array
          }}
          className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      ))} */}

      <label className="block text-sm font-medium text-gray-400 mb-1">
        Background Color
      </label>
      <input
        type="color"
        value={selectedSlide.backgroundColor}
        onChange={(e) =>
          updateSlide(selectedSlide.id, { backgroundColor: e.target.value })
        }
        className="w-full p-1 mb-2 bg-gray-700 border border-gray-600 rounded"
      />
      {/* Add more editing options here */}
    </div>
  );
};

export default EditorPage;

// claude start
const DraggableInput = ({ text, position, onDrag, onDelete, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editedText);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only handle left mouse button
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    const rect = inputRef.current.getBoundingClientRect();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartOffset.current = { x: rect.left, y: rect.top };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    const newX = dragStartOffset.current.x + dx;
    const newY = dragStartOffset.current.y + dy;
    onDrag({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={inputRef}
      className="absolute p-2 rounded border border-gray-300"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full bg-transparent outline-none"
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{text}</span>
      )}
      <button
        // variant="ghost"
        // size="icon"
        className="absolute -top-2 -right-2 hover:bg-transparent"
        onClick={onDelete}
      >
        <X className="h-4 w-4 text-red-500" />
      </button>
    </div>
  );
};

const DraggableInputContainer = () => {
  const [inputs, setInputs] = useState([]);
  const containerRef = useRef(null);

  const handleAddInput = () => {
    const newInput = {
      id: Date.now(),
      text: "New Input",
      position: { x: 10, y: 10 },
    };
    setInputs([...inputs, newInput]);
  };

  const handleDrag = (id, newPosition) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const clampedX = Math.max(
      0,
      Math.min(newPosition.x - containerRect.left, containerRect.width - 100)
    );
    const clampedY = Math.max(
      0,
      Math.min(newPosition.y - containerRect.top, containerRect.height - 40)
    );

    setInputs(
      inputs.map((input) =>
        input.id === id
          ? { ...input, position: { x: clampedX, y: clampedY } }
          : input
      )
    );
  };

  const handleDelete = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleChange = (id, newText) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <button onClick={handleAddInput} className="mb-4">
        Add Input Text
      </button>
      <div
        ref={containerRef}
        className="relative border-2 border-gray-300 rounded-lg h-96 overflow-hidden"
      >
        {inputs.map((input) => (
          <DraggableInput
            key={input.id}
            text={input.text}
            position={input.position}
            onDrag={(newPosition) => handleDrag(input.id, newPosition)}
            onDelete={() => handleDelete(input.id)}
            onChange={(newText) => handleChange(input.id, newText)}
          />
        ))}
      </div>
    </div>
  );
};

// claude end
{
  /* <input
type="text"
value={block.text || ""}
onChange={(e) => {
  const updatedContent = [...selectedSlide.content]; // Create a copy of the content array
  updatedContent[index] = {
    ...updatedContent[index],
    text: e.target.value,
  }; // Update the specific text in the content block
  updateSlide(selectedSlide.id, { content: updatedContent }); // Pass the updated content array
}}
style={{
  outline: "none",
  background: "transparent",
  border: "1px solid white",
}}
className="text-white bg-none"
/> */
}
