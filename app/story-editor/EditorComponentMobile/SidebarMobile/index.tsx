import {
  Folder,
  FolderUp,
  ImageIcon,
  Layout,
  Pen,
  Plus,
  Type,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const SidebarMobile = ({ selectedSlide, addContent }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const fileInputRef = useRef(null);
  const navRef = useRef(null);

  const buttons = [
    { icon: Layout, label: "Layout" },
    { icon: Type, label: "Text" },
    { icon: FolderUp, label: "Upload" },
    { icon: ImageIcon, label: "Image" },
    { icon: Pen, label: "Draw" },
  ];

  const handleButtonClick = (label) => {
    setActivePanel(activePanel === label ? null : label);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActivePanel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    const selectedFile = e.target.files[0];
    addContent("backgroundImage", {
      url: URL.createObjectURL(selectedFile),
      alt: e.target.files[0].name,
    });
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-100" ref={navRef}>
      {/* Bottom Navigation Bar */}
      <div className="flex justify-around items-center bg-[#14141fd9] h-16 px-4">
        {buttons.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={`p-3 rounded-lg flex flex-col items-center ${
              activePanel === label
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleButtonClick(label)}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>

      {/* Popup Panels */}
      {activePanel === "Upload" && (
        <div className="absolute bottom-20 left-4 right-4 bg-[#14141fd9] rounded-lg p-4">
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
                  <Folder size={32} />
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
            multiple={false}
            accept="image/*,video/*"
          />
        </div>
      )}

      {activePanel === "Text" && (
        <div className="absolute bottom-20 left-4 right-4 bg-[#14141fd9] rounded-lg p-4 z-100">
          <h3 className="text-gray-400 mb-4">Text Styles</h3>
          <div className="space-y-2">
            {[
              { label: "Title", value: "h1" },
              { label: "Headline", value: "h2" },
              { label: "Sub Headline", value: "h3" },
              { label: "Normal Text", value: "p" },
              { label: "Small Text", value: "small" },
            ].map((style) => (
              <button
                key={style.value}
                className="block w-full py-3 bg-[#21212c] rounded text-left px-2 hover:bg-[#2e2e38] text-white"
                onClick={() => handleTextStyleClick(style.value)}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMobile;
