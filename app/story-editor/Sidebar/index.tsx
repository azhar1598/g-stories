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

export const Sidebar = ({ selectedSlide, addContent }) => {
  const [file, setFile] = useState(null); // For a single file
  const [imageUrl, setImageUrl] = useState(""); // For the image URL
  const [activePanel, setActivePanel] = useState(null);
  const fileInputRef = useRef(null);
  const sidebarRef = useRef(null);

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
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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
    <div className="flex " ref={sidebarRef}>
      <div className="w-16 bg-[#14141fd9] p-4 flex flex-col items-center space-y-6 absolute top-20 left-4 rounded-lg">
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

      {activePanel === "Upload" && (
        <div className="w-60 p-4 absolute left-[88px] top-56 rounded-lg bg-[#14141fd9] h-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg">Image Upload</h2>
            <button className="bg-orange-500 text-white rounded-full p-1">
              <Plus size={16} />
            </button>
          </div>
          <div
            className="border-2 border-dashed border-gray-600  rounded-lg h-72 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
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

          {/* <div className="mt-4">
            {imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  alt="Uploaded file"
                  className="w-full h-auto rounded"
                />
              </div>
            )} 
          </div>*/}
        </div>
      )}

      {activePanel === "Text" && (
        <div className="p-4 bg-[#14141fd9] text-white w-60 h-auto absolute left-[88px] top-40 rounded-lg">
          <h3 className="text-gray-400 mb-4">Text Styles</h3>
          <div className="space-y-2">
            {[
              { label: "Title", value: "h1" },
              { label: "Headline", value: "h2" },
              { label: "Sub Headline", value: "h3" },
              { label: "Normal Text", value: "p" },
              { label: "Small Text", value: "small" },
            ].map((style: { label: string; value: string }) => (
              <button
                key={style.value}
                className="block w-full py-3 bg-[#21212c] rounded text-left px-2 hover:bg-[#2e2e38]"
                onClick={() => handleTextStyleClick(style.value)}
              >
                {style.label}
              </button>
            ))}
          </div>
          {/* <button className="mt-4 w-full border border-white py-2 text-center rounded">
            Edit text styles
          </button> */}
        </div>
      )}
    </div>
  );
};
