import { useEffect, useState } from "react";
import MoveableComponent from "../MoveableComponent";
import { Text } from "@mantine/core";
import { Clock, Copy, Trash2 } from "lucide-react";

export const Preview = ({
  slides,
  selectedSlide,
  setSelectedSlide,
  addSlide,
  updateContent,
  updateSlide,
  setSelectedElement,
  setSlides,
}) => {
  const [selectedElementId, setSelectedElementId] = useState(null);

  useEffect(() => {
    if (selectedSlide?.elements?.length > 0) {
      setSelectedElementId(selectedSlide.elements[0].id);
    } else {
      setSelectedElementId(null);
    }
  }, [selectedSlide]);

  const handleDuplicate = () => {
    const duplicatedSlide = {
      ...selectedSlide,
      id: slides.length + 1,
      elements: selectedSlide.elements.map((element) => ({
        ...element,
        id: `element-${Date.now()}-${Math.random()}`,
      })),
    };

    const currentIndex = slides.findIndex(
      (slide) => slide.id === selectedSlide.id
    );
    const updatedSlides = [
      ...slides.slice(0, currentIndex + 1),
      duplicatedSlide,
      ...slides.slice(currentIndex + 1),
    ];

    setSlides(updatedSlides);
    setSelectedSlide(duplicatedSlide);
  };

  const handleDelete = () => {
    if (slides.length <= 1) return;

    const currentIndex = slides.findIndex(
      (slide) => slide.id === selectedSlide.id
    );
    const updatedSlides = slides.filter(
      (slide) => slide.id !== selectedSlide.id
    );
    const nextSlideIndex =
      currentIndex === slides.length - 1 ? currentIndex - 1 : currentIndex;

    setSlides(updatedSlides);
    setSelectedSlide(updatedSlides[nextSlideIndex]);
  };

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-60 h-[26rem] bg-[#14141fd9] rounded-lg overflow-hidden shadow-lg relative mb-8">
          <div
            style={{
              backgroundImage: `${selectedSlide.styles.backgroundImage}`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full"
          >
            {selectedSlide?.elements.map((item) => (
              <MoveableComponent
                key={`${selectedSlide.id}-${item.id}`}
                item={item}
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

        <div className="bg-[#1E1E25] absolute bottom-10 rounded-xl p-6 w-auto max-w-[400px] z-[1000]">
          <button
            onClick={addSlide}
            className="absolute top-4 right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-lg">+</span>
          </button>

          <div className="flex space-x-4 overflow-x-auto px-2">
            {slides.map((slide) => (
              <div
                key={slide.id}
                onClick={() => setSelectedSlide(slide)}
                className={`flex-shrink-0 w-[50px] h-[80px] rounded-lg cursor-pointer transition-all
                ${
                  slide.id === selectedSlide.id
                    ? "border border-orange-500"
                    : "bg-[#2A2A33]"
                }
              `}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex absolute bottom-10 right-[300px] space-x-4 mt-4 pt-4 border-t border-gray-800">
        <button className="bg-[#1E1E25] p-2 rounded-lg flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">13s</span>
        </button>

        <button
          className="bg-[#1E1E25] p-2 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleDuplicate}
        >
          <Copy className="w-4 h-4 text-gray-400" />
        </button>

        <button
          className="bg-[#1E1E25] p-2 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </>
  );
};
