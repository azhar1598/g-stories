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
    { id: 1, backgroundColor: "#B24592", content: [] },
  ]);
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      backgroundColor: "#B24592",
      content: [],
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (id, updates) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, ...updates } : slide
      )
    );

    if (selectedSlide.id === id) {
      setSelectedSlide({ ...selectedSlide, ...updates });
    }
  };

  const addTextContent = (style) => {
    const newContent = {
      id: Date.now(),
      type: style,
      text: "Type something...",
    };
    updateSlide(selectedSlide.id, {
      content: [...selectedSlide.content, newContent],
    });
  };

  const updateContent = (contentId, updates) => {
    const updatedContent = selectedSlide.content.map((item) =>
      item.id === contentId ? { ...item, ...updates } : item
    );
    updateSlide(selectedSlide.id, { content: updatedContent });
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar selectedSlide={selectedSlide} addTextContent={addTextContent} />
      <Preview
        addSlide={addSlide}
        slides={slides}
        selectedSlide={selectedSlide}
        setSelectedSlide={setSelectedSlide}
        updateSlide={updateSlide}
        updateContent={updateContent}
      />
    </div>
  );
};

const Sidebar = ({ selectedSlide, addTextContent }) => {
  const [files, setFiles] = useState([]);

  const [isTextPanelOpen, setIsTextPanelOpen] = useState(false);

  const [activePanel, setActivePanel] = useState(null);

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
    // const newContentBlock = { type: style, text: "Type something..." };
    // let updatedContent = Array.isArray(selectedSlide.content)
    //   ? [...selectedSlide.content, newContentBlock]
    //   : [newContentBlock];
    addTextContent(style);
    // updateSlide(selectedSlide.id, { content: updatedContent });
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
  updateContent,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="text-gray-400 mb-4">
        Slide {slides.indexOf(selectedSlide) + 1}
      </div>

      <div className="w-64 h-[32rem] bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
        {selectedSlide && (
          <div
            style={{ backgroundColor: selectedSlide.backgroundColor }}
            className="h-full"
          >
            {selectedSlide.content.map((item) => (
              <MoveableComponent
                key={item.id}
                content={item}
                updateContent={updateContent}
              />
            ))}
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
