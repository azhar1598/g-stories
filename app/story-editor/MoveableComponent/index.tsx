import * as React from "react";
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  Rotatable,
  Draggable,
  Scalable,
} from "react-moveable";
import MoveableHelper from "moveable-helper";

const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
  Rotatable,
]);

const MoveableComponent = () => {
  const [helper] = React.useState(() => new MoveableHelper());
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState("Type here...");
  const [isEditable, setIsEditable] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    width: 200, // Initial width
    height: 100, // Initial height
  });

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(event.target as Node)
    ) {
      setIsEditable(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content

    // Update Moveable dimensions based on textarea height
    const newHeight = e.target.scrollHeight + 10; // Add padding to prevent cutoff
    setDimensions((prev) => ({ ...prev, height: newHeight }));
  };

  return (
    <div className="container">
      <div
        className="target"
        ref={targetRef}
        onDoubleClick={handleDoubleClick}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          border: "1px solid black",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="input-container">
          {isEditable ? (
            <textarea
              className="text-black z-[1000]"
              value={value}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "auto", // Let the height be auto initially
                resize: "none", // Disable manual resizing
                overflow: "hidden", // Prevent scrollbar
                minHeight: "2rem", // Minimum height
              }}
              autoFocus
            />
          ) : (
            <div style={{ padding: "10px" }}>{value}</div>
          )}
        </div>
      </div>

      <Moveable
        target={targetRef.current}
        container={null}
        origin={true}
        edge={false}
        draggable={!isEditable}
        throttleDrag={0}
        onDragStart={({ target }) => {
          console.log("onDragStart", target);
        }}
        onDrag={({ target, transform }) => {
          target!.style.transform = transform;
        }}
        onDragEnd={({ target, isDrag }) => {
          console.log("onDragEnd", target, isDrag);
        }}
        resizable={!isEditable}
        throttleResize={0}
        onResize={({ target, width, height, delta }) => {
          delta[0] && (target!.style.width = `${width}px`);
          delta[1] && (target!.style.height = `${height}px`);
          setDimensions({ width, height });
        }}
        scalable={!isEditable}
        throttleScale={0}
        onScale={({ target, transform }) => {
          target!.style.transform = transform;
        }}
        rotatable={!isEditable}
        throttleRotate={0}
        onRotate={({ target, transform }) => {
          target!.style.transform = transform;
        }}
        pinchable={true}
      />
    </div>
  );
};

export default MoveableComponent;
