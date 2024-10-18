import { useState } from "react";
import { Preview } from "../Preview";
import { Sidebar } from "../Sidebar";
import { EditPanel } from "../EditPanel";

export const EditorComponent = () => {
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
      const updatedStyles = {
        ...selectedSlide.styles,
        backgroundImage: `url(${data.url})`,
      };

      updateSlide(selectedSlide.id, {
        styles: updatedStyles,
      });
    } else if (type === "Text") {
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

  console.log("slidess", slides, selectedSlide);

  return (
    <div className="flex h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar selectedSlide={selectedSlide} addContent={addContent} />

      <Preview
        addSlide={addSlide}
        slides={slides}
        selectedSlide={selectedSlide}
        setSelectedSlide={setSelectedSlide}
        updateSlide={updateSlide}
        updateContent={updateContent}
      />
      <EditPanel
        selectedSlide={selectedSlide}
        updateSlide={updateSlide}
        slides={slides}
      />
    </div>
  );
};
