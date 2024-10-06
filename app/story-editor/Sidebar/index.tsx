import { ImageIcon, Layout, Pen, Plus, Type, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Sidebar = ({ selectedSlide, addContent }) => {
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
