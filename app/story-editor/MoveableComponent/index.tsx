import { cssToJsx } from "@/lib/cssParser";
import { AlignCenter, Bold, Lock } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Moveable from "react-moveable";

const MoveableComponent = ({
  item,
  updateContent,
  selectedSlide,
  elementStyles,

  onSelect,
}: any) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("Type here...");
  const [isEditable, setIsEditable] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 200, height: "auto" });
  const [isMoving, setIsMoving] = useState(false);
  const [isBold, setIsBold] = useState(item.styles?.fontWeight === "bold");
  const [isCenter, setIsCenter] = useState(item.styles?.textAlign === "center");
  const [isLocked, setIsLocked] = useState(false);

  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [currentStyles, setCurrentStyles] = useState(item.styles);

  useEffect(() => {
    setCurrentStyles(elementStyles);
  }, [selectedSlide]);

  const handleDoubleClick = () => {
    if (!isLocked) {
      setIsEditable(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(event.target as Node)
    ) {
      setIsEditable(false);
      setIsSelected(false);
      setIsHovered(false);
      adjustHeight();
    }
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isLocked) {
      setValue(e.target.value);
      setDimensions({ height: e.target.style.height });
      updateContent(item.id, { content: e.target.value });
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      const newHeight = textareaRef.current.scrollHeight;
      setDimensions((prev) => ({ ...prev, height: newHeight }));
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [isEditable, item.content]);

  const commonStyles: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    lineHeight: "1.5",
    fontFamily: "Arial, sans-serif",
    border: "none",
    outline: "none",
    background: "transparent",
    resize: "none",
    overflow: "hidden",
    color: "white",
  };

  const getStyleForType = (item) => {
    switch (item.tag) {
      case "h1":
        return {
          fontSize: item.styles?.fontSize || "42px",
          fontWeight: item.styles?.fontWeight || "bold",
        };
      case "h2":
        return {
          fontSize: item?.styles?.fontSize || "20px",
          fontWeight: item?.styles?.fontWeight || "bold",
        };
      case "h3":
        return {
          fontSize: item?.styles?.fontSize || "18px",
          fontWeight: item?.styles?.fontWeight || "semi-bold",
        };
      case "p":
        return { fontSize: item?.styles?.fontSize || "16px" };
      case "small":
        return { fontSize: item?.styles?.fontSize || "14px" };
      default:
        return { fontSize: item?.styles?.fontSize || "16px" };
    }
  };

  const toggleBold = () => {
    if (!isLocked) {
      setIsBold(!isBold);
      updateContent(item.id, {
        styles: { ...item.styles, fontWeight: isBold ? "normal" : "bold" },
      });
    }
  };

  const toggleCenter = () => {
    if (!isLocked) {
      setIsCenter(!isCenter);
      updateContent(item.id, {
        styles: { ...item.styles, textAlign: isCenter ? "left" : "center" },
      });
    }
  };

  const handleInput = () => {
    if (textareaRef.current && !isLocked) {
      updateContent(item.id, { content: textareaRef.current.innerText });
      adjustHeight();
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    setIsEditable(false);
  };

  return (
    <div className="container relative">
      <div
        ref={targetRef}
        id={`moveable-${item.id}`}
        onDoubleClick={handleDoubleClick}
        onClick={() => setIsSelected(true)}
        onMouseEnter={() => {
          setIsHovered(true);
          if (!isSelected) setIsSelected(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isSelected) setIsSelected(false);
        }}
        key={selectedSlide}
        style={{
          ...currentStyles,
          ...getStyleForType(item),
          backgroundColor: item.styles?.backgroundColor || "",
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          // border: isEditable ? "1px solid #ccc" : "1px solid transparent",
          position: "relative",
          cursor: isLocked ? "not-allowed" : "all-scroll",
          border: isEditable
            ? "1px solid #ccc"
            : isSelected
            ? "2px solid #3b82f6"
            : isHovered
            ? "1px dashed #9ca3af"
            : "1px solid transparent",
          zIndex: 10000,
        }}
      >
        <div className="absolute -top-10 z-[10000] left-0 right-0 bg-gray-800 rounded-t-md p-1 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={toggleBold}
              className={`p-1 rounded ${
                isBold ? "bg-orange-500" : "bg-gray-700"
              } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLocked}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={toggleCenter}
              className={`p-1 rounded ${
                isCenter ? "bg-orange-500" : "bg-gray-700"
              } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLocked}
            >
              <AlignCenter size={16} />
            </button>
          </div>
          <button
            onClick={toggleLock}
            className={`p-1 rounded ${
              isLocked ? "bg-orange-500" : "bg-gray-700"
            }`}
          >
            <Lock size={16} />
          </button>
        </div>

        {isEditable && !isLocked ? (
          <textarea
            ref={textareaRef}
            value={item.content}
            rows={1}
            onChange={handleInputChange}
            style={{
              ...commonStyles,
              height: `${`${dimensions.height}px` || "auto"}`,
              color: item.styles?.color || "",
            }}
            autoFocus
          />
        ) : (
          <div
            style={{
              ...commonStyles,
              color: item.styles?.color || "",
              height: `${dimensions.height}px` || "auto",
            }}
          >
            {item.content || "Type"}
          </div>
        )}
      </div>

      {!isEditable &&
        selectedSlide &&
        !isLocked &&
        (isSelected || isHovered) && (
          <Moveable
            target={targetRef.current}
            container={null}
            origin={false}
            edge={false}
            draggable={true}
            resizable={true}
            scalable={false}
            rotatable={false}
            pinchable={false}
            onDrag={({ target, transform }) => {
              target!.style.transform = transform;

              updateContent(item.id, {
                styles: cssToJsx(targetRef.current?.style?.cssText),
              });
            }}
            onResize={({ target, width, height, delta }) => {
              if (delta[0]) target!.style.width = `${width}px`;
              if (delta[1]) target!.style.height = `${height}px`;
              setDimensions({ width, height });
            }}
            renderDirections={["e", "w"]}
            keepRatio={false}
            throttleResize={0}
          />
        )}
    </div>
  );
};

export default MoveableComponent;
