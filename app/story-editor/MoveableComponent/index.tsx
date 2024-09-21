import React, { useState, useRef, useEffect } from "react";
import Moveable from "react-moveable";

const MoveableComponent = ({ item, updateContent }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("Type here...");
  const [isEditable, setIsEditable] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 200, height: "auto" });

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setDimensions({ height: e.target.style.height });
    updateContent(item.id, { text: e.target.value });
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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

  const getStyleForType = (type) => {
    switch (type) {
      case "Title":
        return { fontSize: "42px", fontWeight: "bold" };
      case "Headline":
        return { fontSize: "20px", fontWeight: "bold" };
      case "Subheadline":
        return { fontSize: "18px", fontWeight: "semi-bold" };
      case "Normal text":
        return { fontSize: "16px" };
      case "Small text":
        return { fontSize: "14px" };
      default:
        return { fontSize: "16px" };
    }
  };

  return (
    <div className="container">
      <div
        ref={targetRef}
        onDoubleClick={handleDoubleClick}
        style={{
          ...getStyleForType(item.type),
          width: `${dimensions.width}px`,
          height: isEditable ? "auto" : `${dimensions.height}px`,
          border: isEditable ? "1px solid #ccc" : "1px solid transparent",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isEditable ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInputChange}
            style={{
              ...commonStyles,
              height: "auto",
              minHeight: `${dimensions.height}px`,
            }}
            autoFocus
          />
        ) : (
          <div style={{ ...commonStyles, height: `${dimensions.height}px` }}>
            {value}
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
