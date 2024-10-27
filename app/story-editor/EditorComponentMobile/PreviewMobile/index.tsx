import { useEffect, useState } from "react";
import MoveableComponentMobile from "../MoveableComponentMobile";
import MoveableComponent from "../../MoveableComponent";

export const PreviewMobile = ({
  slides,
  selectedSlide,
  setSelectedSlide,
  addSlide,
  updateContent,
  updateSlide,
  setSelectedElement,
}) => {
  const [selectedElementId, setSelectedElementId] = useState(null);

  useEffect(() => {
    if (selectedSlide && selectedSlide.elements.length > 0) {
      setSelectedElementId(selectedSlide.elements[0].id);
    } else {
      setSelectedElementId(null);
    }
  }, [selectedSlide]);

  console.log("selected", selectedSlide);
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="text-gray-400 mb-4">
        Slide {slides.indexOf(selectedSlide) + 1}
      </div>

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
                key={`${selectedSlide.id}-${item.id}`}
                selectedSlide={selectedSlide}
                updateContent={updateContent}
                isSelected={item.id === selectedElementId}
                elementStyles={item.styles}
                updateSlide={updateSlide}
                onSelect={() => setSelectedElementId(item.id)}
                setSelectedElement={setSelectedElement}
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
