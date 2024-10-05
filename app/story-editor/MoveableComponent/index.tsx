import { cssToJsx } from "@/lib/cssParser";
import { AlignCenter, Bold, Lock } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Moveable from "react-moveable";

const MoveableComponent = ({
  item,
  updateContent,
  selectedSlide,
  elementStyles,
}: any) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("Type here...");
  const [isEditable, setIsEditable] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 200, height: "auto" });
  const [isMoving, setIsMoving] = useState(false);
  const [isBold, setIsBold] = useState(item.styles?.fontWeight === "bold");
  const [isCenter, setIsCenter] = useState(item.styles?.textAlign === "center");
  const [isLocked, setIsLocked] = useState(false);
  console.log("slideLevel", selectedSlide);

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(event.target as Node)
    ) {
      setIsEditable(false);
      adjustHeight();
    }
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  console.log("selectedSlide", selectedSlide);

  useEffect(() => {
    console.log("bhd", targetRef.current?.style?.cssText);
    // updateContent(item.id, {
    //   styles: cssToJsx(targetRef.current?.style?.cssText),
    // });
  }, [selectedSlide.id]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("tattat", targetRef.current?.style);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setDimensions({ height: e.target.style.height });
    updateContent(item.id, { content: e.target.value });
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  console.log("item", item, selectedSlide);

  const adjustHeight = () => {
    if (textareaRef.current) {
      const newHeight = textareaRef.current.scrollHeight;
      setDimensions((prev) => ({ ...prev, height: newHeight }));
    }
  };

  useEffect(() => {
    if (!isEditable) {
      adjustHeight();
    }
  }, [isEditable]);

  const commonStyles: React.CSSProperties = {
    width: "100%",
    // padding: "10px",
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
    console.log("itemm", item);
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

  console.log(
    "byeeee",
    targetRef.current?.style.cssText,
    getStyleForType(item.tag),
    elementStyles
  );

  const toggleBold = () => {
    setIsBold(!isBold);
    updateContent(item.id, {
      styles: { ...item.styles, fontWeight: isBold ? "normal" : "bold" },
    });
  };

  const toggleCenter = () => {
    setIsCenter(!isCenter);
    updateContent(item.id, {
      styles: { ...item.styles, textAlign: isCenter ? "left" : "center" },
    });
  };

  const toggleLock = () => setIsLocked(!isLocked);

  console.log("itemdok", item, dimensions.height);

  return (
    <div className="container relative">
      <div
        ref={targetRef}
        // className="relative"
        onDoubleClick={handleDoubleClick}
        style={{
          ...elementStyles,
          ...getStyleForType(item),
          backgroundColor: item.styles?.backgroundColor || "",
          width: `${dimensions.width}px`,
          // height: isEditable ? "auto" : `${dimensions.height}px`,
          height: "auto",
          border: isEditable ? "1px solid #ccc" : "1px solid transparent",
          position: "relative",

          // overflow: "hidden",
        }}
      >
        {!isEditable && (
          <div className="absolute -top-10 z-[10000] left-0 right-0 bg-gray-800 rounded-t-md p-1 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={toggleBold}
                className={`p-1 rounded ${
                  isBold ? "bg-orange-500" : "bg-gray-700"
                }`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={toggleCenter}
                className={`p-1 rounded ${
                  isCenter ? "bg-orange-500" : "bg-gray-700"
                }`}
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
        )}

        {isEditable ? (
          <textarea
            ref={textareaRef}
            value={item.content}
            onChange={handleInputChange}
            style={{
              ...commonStyles,
              height: "auto",
              color: item.styles?.color || "",
              minHeight: `${dimensions.height}px`,
            }}
            autoFocus
          />
        ) : (
          <div
            style={{
              ...commonStyles,
              cursor: "grab",
              color: item.styles?.color || "",
              // height: `${dimensions.height}px` || "auto",
              height: "auto",
            }}
          >
            {item.content || "Type Here.."}
          </div>
        )}
      </div>

      {!isEditable && (
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

            console.log("cssTe", targetRef.current?.style?.cssText);
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
