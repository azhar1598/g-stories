import React, { useState } from "react";
import { ChevronDown, Trash, Move, Type, PenTool } from "lucide-react";

export const EditPanel = ({ selectedSlide, updateSlide, slides }) => {
  console.log("slides-new-levels", slides);
  const [activeTab, setActiveTab] = useState("Design");
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [textExpanded, setTextExpanded] = useState(true);

  const handleElementStyleChange = (elementId, property, value) => {
    const updatedElements = selectedSlide.elements.map((element) => {
      console.log("nnn", elementId, element.id, element.styles);
      return element.id === elementId
        ? { ...element, styles: { ...element.styles, [property]: value } }
        : element;
    });
    updateSlide(selectedSlide.id, { elements: updatedElements });
  };

  const handleSlideStyleChange = (property, value) => {
    updateSlide(selectedSlide.id, {
      styles: { ...selectedSlide.styles, [property]: value },
    });
  };

  return (
    <div className="w-80 bg-gray-900 text-white p-4 overflow-y-auto">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${
            activeTab === "Design" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("Design")}
        >
          Design
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "Animation" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("Animation")}
        >
          Animation
        </button>
      </div>

      {activeTab === "Design" && (
        <>
          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setLayoutExpanded(!layoutExpanded)}
            >
              <span className="font-semibold">Layout</span>
              <ChevronDown
                className={`transform ${layoutExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {layoutExpanded && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Move size={16} />
                  <span className="text-sm">Position</span>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    className="w-20 bg-gray-800 rounded px-2 py-1 text-sm"
                    placeholder="X"
                    onChange={(e) =>
                      handleSlideStyleChange("x", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="w-20 bg-gray-800 rounded px-2 py-1 text-sm"
                    placeholder="Y"
                    onChange={(e) =>
                      handleSlideStyleChange("y", e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setTextExpanded(!textExpanded)}
            >
              <span className="font-semibold">Text</span>
              <ChevronDown
                className={`transform ${textExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {textExpanded && (
              <div className="mt-2 space-y-4">
                {selectedSlide.elements.map((element) =>
                  element.tag.startsWith("h") ||
                  element.tag === "p" ||
                  element.tag === "small" ? (
                    <div key={element.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Type size={16} />
                        <span className="text-sm">
                          {element.tag.toUpperCase()}
                        </span>
                      </div>
                      <input
                        type="text"
                        className="w-full bg-gray-800 rounded px-2 py-1 text-sm"
                        placeholder="Text content"
                        value={element.content || ""}
                        onChange={(e) =>
                          handleElementStyleChange(
                            element.id,
                            "content",
                            e.target.value
                          )
                        }
                      />
                      <div className="flex space-x-2">
                        <select
                          className="bg-gray-800 rounded px-2 py-1 text-sm"
                          value={element.styles?.fontWeight || "normal"}
                          onChange={(e) =>
                            handleElementStyleChange(
                              element.id,
                              "fontWeight",
                              e.target.value
                            )
                          }
                        >
                          <option value="normal">Normal</option>
                          <option value="bold">Bold</option>
                        </select>
                        <input
                          type="number"
                          className="w-20 bg-gray-800 rounded px-2 py-1 text-sm"
                          placeholder="Size"
                          value={parseInt(element.styles?.fontSize) || ""}
                          onChange={(e) =>
                            handleElementStyleChange(
                              element.id,
                              "fontSize",
                              `${e.target.value}px`
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm text-gray-400">
                            Background color
                          </label>
                          <div className="flex items-center space-x-2">
                            <Trash
                              className="text-gray-400"
                              size={16}
                              onClick={() =>
                                handleSlideStyleChange("backgroundColor", "")
                              }
                            />
                            <input
                              type="color"
                              className="w-8 h-8 rounded"
                              value={
                                selectedSlide.styles?.backgroundColor ||
                                "#4A5568"
                              }
                              onChange={(e) =>
                                handleElementStyleChange(
                                  element.id,
                                  "backgroundColor",
                                  `${e.target.value}`
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-400">
                              Color
                            </label>
                            <div className="flex items-center space-x-2">
                              <Trash
                                className="text-gray-400"
                                size={16}
                                onClick={() =>
                                  handleSlideStyleChange("color", "")
                                }
                              />
                              <input
                                type="color"
                                className="w-8 h-8 rounded"
                                value={
                                  selectedSlide.styles?.backgroundColor ||
                                  "#4A5568"
                                }
                                onChange={(e) =>
                                  handleElementStyleChange(
                                    element.id,
                                    "color",
                                    `${e.target.value}`
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Effects</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-400">
                  Background color
                </label>
                <div className="flex items-center space-x-2">
                  <Trash
                    className="text-gray-400"
                    size={16}
                    onClick={() =>
                      handleSlideStyleChange("backgroundColor", "")
                    }
                  />
                  <input
                    type="color"
                    className="w-8 h-8 rounded"
                    value={selectedSlide.styles?.backgroundColor || "#4A5568"}
                    onChange={(e) =>
                      handleSlideStyleChange("backgroundColor", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedSlide.styles?.opacity || 100}
                  onChange={(e) =>
                    handleSlideStyleChange("opacity", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
