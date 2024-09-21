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
    {
      id: 1,
      styles: { backgroundImage: "", backgroundColor: "#B24592" },
      elements: [],
    },
  ]);
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);

  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      styles: { backgroundImage: "", backgroundColor: "#B24592" },
      elements: [],
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (id, updates) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, ...updates } : slide
      )
    );
    setSelectedSlide((prev) =>
      prev.id === id ? { ...prev, ...updates } : prev
    );
  };

  console.log("slides", slides);

  const deleteSlide = (id) => {
    const updatedSlides = slides.filter((slide) => slide.id !== id);
    setSlides(updatedSlides);
    if (selectedSlide.id === id) {
      setSelectedSlide(updatedSlides.length ? updatedSlides[0] : null);
    }
  };

  const addContent = (type, data) => {
    if (type === "backgroundImage") {
      // Handle adding a background image
      const updatedStyles = {
        ...selectedSlide.styles, // Keep other styles intact
        backgroundImage: `url(${data.url})`, // Set backgroundImage
      };

      updateSlide(selectedSlide.id, {
        styles: updatedStyles, // Update styles with the new backgroundImage
      });
    } else if (type === "Text") {
      // Handle adding multiple text elements
      // const newElements = data.elements.map((element) => ({
      //   id: Date.now(), // Ensure unique ID for each element
      //   type: element.tag, // 'Title', 'Headline', etc.
      //   content: element.content,
      //   styles: {},
      // }));
      const newElements = [
        {
          id: Date.now(),
          tag: data,
        },
      ];

      updateSlide(selectedSlide.id, {
        elements: [...selectedSlide.elements, ...newElements],
      });
    }
  };

  const updateContent = (contentId, updates) => {
    const updatedElements = selectedSlide.elements.map((item) =>
      item.id === contentId ? { ...item, ...updates } : item
    );
    updateSlide(selectedSlide.id, { elements: updatedElements }); // Update elements
  };

  console.log("slidess", slides);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar selectedSlide={selectedSlide} addContent={addContent} />

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

const Sidebar = ({ selectedSlide, addContent }) => {
  const [file, setFile] = useState(null); // For a single file
  const [imageUrl, setImageUrl] = useState(""); // For the image URL
  const [activePanel, setActivePanel] = useState(null);
  const fileInputRef = useRef(null);

  const buttons = [
    { icon: Layout, label: "Layout" },
    { icon: Type, label: "Text" },
    { icon: ImageIcon, label: "Image" },
    { icon: Video, label: "Video" },
    { icon: Pen, label: "Draw" },
  ];

  const handleButtonClick = (label) => {
    setActivePanel(activePanel === label ? null : label);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type.startsWith("image/") ||
        droppedFile.type.startsWith("video/"))
    ) {
      setFile(droppedFile);
      setImageUrl(URL.createObjectURL(droppedFile));
    } else {
      alert("Please upload an image or video file.");
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]; // Only handle one file
    console.log("slee", selectedFile, URL.createObjectURL(selectedFile));
    addContent("backgroundImage", {
      url: URL.createObjectURL(selectedFile),
      alt: e.target.files[0].name,
    });
    // if (selectedFile) {
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile)); // Create object URL for preview
    // }
  };

  const handleTextStyleClick = (style) => {
    addContent("Text", style);
  };

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => setFile(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [file]);

  const handleFileUpload = () => {
    //   console.log("file", file);
    //   if (file) {
    //     addContent("backgroundImage", { url: imageUrl, alt: file.name });
    //     // setFile(null); // Reset file state after upload
    //     // setImageUrl(""); // Clear preview
    //   }
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
            <h2 className="text-white text-lg">Image Upload</h2>
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
            {!file ? (
              <>
                <div className="mb-2">
                  <Video size={32} />
                </div>
                <p className="text-center text-sm">
                  Drop your file here
                  <br />
                  or browse.
                </p>
              </>
            ) : (
              <p className="text-center text-sm">1 file selected</p>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept="image/*,video/*"
          />

          <div className="mt-4">
            {imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  alt="Uploaded file"
                  className="w-full h-auto rounded"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {activePanel === "Text" && (
        <div className="p-4 bg-gray-800 text-white w-64">
          <h3 className="text-gray-400 mb-4">Text Styles</h3>
          <div className="space-y-2">
            {[
              { label: "Title", value: "h1" },
              { label: "Headline", value: "h2" },
              ,
              { label: "Sub Headline", value: "h3" },
              { label: "Normal Text", value: "p" },
              { label: "Small Text", value: "small" },
            ].map((style: { label: string; value: string }) => (
              <button
                key={style.value}
                className="block w-full py-2 bg-gray-700 rounded text-left px-2"
                onClick={() => handleTextStyleClick(style.value)}
              >
                {style.label}
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
  updateContent,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="text-gray-400 mb-4">
        Slide {slides.indexOf(selectedSlide) + 1}
      </div>
      {console.log("ssssss", selectedSlide.styles.backgroundImage)}

      <div className="w-64 h-[32rem] bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
        <div
          style={{
            backgroundImage: `${selectedSlide.styles.backgroundImage}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-full"
        >
          {selectedSlide &&
            selectedSlide.elements.map((item) => (
              <MoveableComponent
                item={item}
                selectedSlide={selectedSlide}
                updateContent={updateContent}
              />
            ))}
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-12 h-20 rounded-md cursor-pointer ${
              slide.id === selectedSlide.id ? "ring-2 ring-orange-500" : ""
            }`}
            style={{
              backgroundImage: slide.styles.backgroundImage,
              backgroundColor: "pink",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => setSelectedSlide(slide)}
          />

          // <div
          //   className={`w-24 h-12 rounded-md cursor-pointer ${
          //     slide.id === selectedSlide.id ? "ring-2 ring-orange-500" : ""
          //   }`}
          // >
          //   <div
          //     style={{
          //       backgroundImage: `${slide.styles.backgroundImage}`,
          //       backgroundRepeat: "no-repeat",
          //       backgroundSize: "cover",
          //       backgroundPosition: "center",
          //       height: "60px !important",
          //     }}
          //     className=" "
          //   >
          //     {selectedSlide &&
          //       selectedSlide.elements.map((item) => (
          //         // <MoveableComponent
          //         //   item={item}
          //         //   updateContent={updateContent}
          //         // />
          //         <></>
          //       ))}
          //   </div>
          // </div>
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
