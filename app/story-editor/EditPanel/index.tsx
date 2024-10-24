import React, { useState } from "react";
import {
  ChevronDown,
  Trash,
  Move,
  Type,
  PenTool,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CSelect } from "@/components/common/Custom/CSelect";
import { Select, SimpleGrid, ColorPicker, Popover } from "@mantine/core";

export const EditPanel = ({
  selectedSlide,
  updateSlide,
  slides,
  selectedElement,
}) => {
  const [activeTab, setActiveTab] = useState("Design");
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [textExpanded, setTextExpanded] = useState(true);
  const [colorPickerOpened, setColorPickerOpened] = useState(false);

  const handleElementStyleChange = (elementId, property, value) => {
    const updatedElements = selectedSlide.elements.map((element) => {
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

  const ColorPickerButton = ({ value, onChange }) => (
    <Popover
      opened={colorPickerOpened}
      onChange={setColorPickerOpened}
      position="left"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <div
          className="h-7 w-7 border-2 border-gray-600 cursor-pointer rounded-md"
          style={{ backgroundColor: value || "#ffffff" }}
          onClick={() => setColorPickerOpened(true)}
        />
      </Popover.Target>
      <Popover.Dropdown className="p-0 border-0">
        <ColorPicker
          format="rgba"
          value={value}
          onChange={onChange}
          // swatches={[
          //   "#000000",
          //   "#4A4A4A",
          //   "#717171",
          //   "#9A9A9A",
          //   "#CECECE",
          //   "#FFFFFF",
          //   "#FF5252",
          //   "#FF7676",
          //   "#FF9C9C",
          //   "#BA68C8",
          //   "#7B1FA2",
          //   "#26A69A",
          //   "#4FC3F7",
          //   "#2196F3",
          //   "#64B5F6",
          //   "#81C784",
          //   "#4CAF50",
          //   "#FFA726",
          // ]}
        />
      </Popover.Dropdown>
    </Popover>
  );

  console.log("selectedElement", selectedElement);

  return (
    <div className="w-64 h-[85vh] bg-[#14141fd9]  text-white overflow-y-auto  rounded-lg  divide-y  divide-gray-800 absolute right-4 top-20">
      <div className="flex  space-x-4 p-4  ">
        <button
          className={`${
            activeTab === "Design" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("Design")}
        >
          Design
        </button>
        {selectedSlide.elements.length > 0 && (
          <button
            className={` ${
              activeTab === "Animation" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("Animation")}
          >
            Animation
          </button>
        )}
      </div>

      {activeTab === "Design" && selectedSlide && (
        <>
          <div className="px-4 py-8 overflow-scroll">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setLayoutExpanded(!layoutExpanded)}
            >
              <span className="text-sm font-semibold">Layout</span>
              <ChevronRight
                className={`transform ${layoutExpanded ? "rotate-90" : ""}`}
              />
            </button>
            {layoutExpanded && (
              <div>
                <div className="flex justify-between items-center mt-2 space-y-2 ">
                  {/* <Move size={16} /> */}
                  <p className="text-xs text-[#ababba]">Position</p>
                  <div className="space-x-4">
                    <input
                      type="number"
                      className="w-16 bg-gray-800 rounded px-2 py-1 text-sm outline-none "
                      placeholder="X"
                      onChange={(e) =>
                        handleSlideStyleChange("x", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="w-16 bg-gray-800 rounded px-2 py-1 text-sm outline-none"
                      placeholder="Y"
                      onChange={(e) =>
                        handleSlideStyleChange("y", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 space-y-2 ">
                  {/* <Move size={16} /> */}
                  <p className="text-xs text-[#ababba]">Size</p>
                  <div className="space-x-4">
                    <input
                      type="number"
                      className="w-16 bg-gray-800 rounded px-2 py-1 text-sm outline-none "
                      placeholder="W"
                      onChange={(e) =>
                        handleSlideStyleChange("x", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="w-16 bg-gray-800 rounded px-2 py-1 text-sm outline-none"
                      placeholder="H"
                      onChange={(e) =>
                        handleSlideStyleChange("y", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {Object.keys(selectedElement).length > 0 && (
            <div className=" px-4 py-8">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setTextExpanded(!textExpanded)}
              >
                <span className="text-sm font-semibold">Text Style</span>
              </button>

              <Select
                placeholder=""
                mt={12}
                data={["Title", "Headline", "Subheadline", "Normal", "Small"]}
              />

              <div className="mt-2 space-y-4">
                <div key={selectedElement.id} className="space-y-4">
                  {/* <div className="flex items-center space-x-2">
                    <Type size={16} />
                    <span className="text-sm">
                      {selectedElement?.tag.toUpperCase()}
                    </span>
                  </div> */}

                  <CSelect
                    label="Font"
                    options={[{ name: "Poppins", id: "poppins" }]}
                  />

                  {/* <input
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
                      /> */}
                  {/* <div className="flex space-x-2">
                    <select
                      className="bg-gray-800 rounded px-2 py-1 text-sm"
                      value={selectedElement.styles?.fontWeight || "normal"}
                      onChange={(e) =>
                        handleElementStyleChange(
                          selectedElement.id,
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
                      value={parseInt(selectedElement.styles?.fontSize) || ""}
                      onChange={(e) =>
                        handleElementStyleChange(
                          selectedElement.id,
                          "fontSize",
                          `${e.target.value}px`
                        )
                      }
                    />
                  </div> */}
                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: "12px", color: "#ababba" }}>
                      Weight
                    </label>
                    <Select
                      placeholder="Select"
                      w={150}
                      data={[
                        "Thin",
                        "Extra light",
                        "Light",
                        "Regular",
                        "Medium",
                        "Semi Bold",
                        "Bold",
                        "Extra Bold",
                        "Ultra Bold",
                      ]}
                      withScrollArea={true}
                      styles={{
                        dropdown: {
                          maxHeight: 200,
                          overflowY: "auto",
                        },
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: "12px", color: "#ababba" }}>
                      Size
                    </label>
                    <Select
                      placeholder="Select"
                      w={90}
                      data={[
                        "Thin",
                        "Extra light",
                        "Light",
                        "Regular",
                        "Medium",
                        "Semi Bold",
                        "Bold",
                        "Extra Bold",
                        "Ultra Bold",
                      ]}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: "12px", color: "#ababba" }}>
                      Spacing
                    </label>
                    <Select
                      placeholder="Select"
                      w={90}
                      data={[
                        "0.5",
                        "1",
                        "1.5",
                        "2",
                        "2.5",
                        "3",
                        "3.5",
                        "4",
                        "4.5",
                        "5",
                        "5.5",
                        "6",
                      ]}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: "12px", color: "#ababba" }}>
                      Color
                    </label>
                    <div className="flex items-center justify-between">
                      <ColorPickerButton
                        value={selectedElement.styles?.color}
                        onChange={(color) =>
                          handleElementStyleChange(
                            selectedElement.id,
                            "color",
                            color
                          )
                        }
                      />
                    </div>
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
                            selectedSlide.styles?.backgroundColor || "#4A5568"
                          }
                          onChange={(e) =>
                            handleElementStyleChange(
                              selectedElement.id,
                              "backgroundColor",
                              `${e.target.value}`
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <div className="mb-4 p-4 ">
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
          </div> */}
        </>
      )}
    </div>
  );
};
