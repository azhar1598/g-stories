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
import {
  Select,
  SimpleGrid,
  ColorPicker,
  Popover,
  Text,
  Group,
  SelectProps,
  Input,
  Flex,
} from "@mantine/core";
import { getStyleForType } from "@/constants";

export const EditPanel = ({
  selectedSlide,
  updateSlide,
  slides,
  selectedElement,
}) => {
  const [activeTab, setActiveTab] = useState("Design");
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [textExpanded, setTextExpanded] = useState(true);

  // const handleElementStyleChange = (elementId, property, value) => {
  //   console.log("selecone", selectedElement, elementId, property, value);
  //   const updatedElements = selectedSlide.elements.map((element) => {
  //     return element.id === elementId
  //       ? { ...element, styles: { ...element.styles, [property]: value } }
  //       : element;
  //   });

  //   updateSlide(selectedSlide.id, { elements: updatedElements });
  // };

  const handleElementStyleChange = (elementId, property, value) => {
    const updatedElements = selectedSlide.elements.map((element) => {
      if (element.id === elementId) {
        if (property === "tag") {
          let textStyle = getStyleForType({
            tag: value,
          });
          let tag = property;
          let newElement = structuredClone(element);
          newElement.tag = value;
          newElement.styles.fontSize = textStyle.fontSize;

          console.log("newElement", newElement);
          return newElement;
        } else if (property === "transform") {
          return {
            ...element,
            styles: {
              ...element.styles,
              [property]: `translate(${value}px,24px)`,
            },
          };
        } else {
          return {
            ...element,
            styles: { ...element.styles, [property]: value },
          };
        }
      } else return element;
    });

    updateSlide(selectedSlide.id, { elements: updatedElements });
  };

  const handleSlideStyleChange = (property, value) => {
    updateSlide(selectedSlide.id, {
      styles: { ...selectedSlide.styles, [property]: value },
    });
  };

  const ColorPickerButton = ({ handleElementStyleChange, selectedElement }) => {
    const [value, onChange] = useState("");
    const [colorPickerOpened, setColorPickerOpened] = useState(false);

    const handleColorChange = (newColor) => {
      // let colorHex = newColor.target ? newColor.target.value : newColor;
      onChange(newColor);

      handleElementStyleChange(selectedElement.id, "color", newColor);
    };

    return (
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
            format="hex"
            value={value}
            onChange={(e) => {
              // onChange(e);
              handleColorChange(e);
            }}
            draggable={true}
            swatches={[
              "#000000",
              "#4A4A4A",
              "#717171",
              "#9A9A9A",
              "#CECECE",
              "#FFFFFF",
              "#FF5252",
              "#FF7676",
              "#FF9C9C",
              "#BA68C8",
              "#7B1FA2",
              "#26A69A",
              "#4FC3F7",
              "#2196F3",
              "#64B5F6",
              "#81C784",
              "#4CAF50",
              "#FFA726",
            ]}
          />
          <Text>{value}</Text>
        </Popover.Dropdown>
      </Popover>
    );
  };

  const renderSelectOption: SelectProps["renderOption"] = ({ option }) => {
    const { value, label } = option;
    let size =
      value === "h1"
        ? "36px"
        : value === "h2"
        ? "28px"
        : value === "h3"
        ? "20px"
        : value === "p"
        ? "16px"
        : "12px";
    return <Text size={size}>{option.label}</Text>;
  };
  return (
    <div className="w-64 h-[85vh] bg-[#14141fd9]  text-white overflow-y-auto  rounded-lg  divide-y  divide-gray-800 absolute right-4 top-20 hidden md:block">
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
                  <Flex className="space-x-4">
                    <Input
                      type="number"
                      size="xs"
                      w={64}
                      onChange={(e) =>
                        handleElementStyleChange(
                          selectedElement.id,
                          "transform",
                          e.target.value
                        )
                      }
                      rightSection={<Text size="12px">X</Text>}
                    />
                    <Input
                      type="number"
                      size="xs"
                      w={64}
                      onChange={(e) =>
                        handleElementStyleChange(
                          selectedElement.id,
                          "transform",
                          e.target.value
                        )
                      }
                      rightSection={<Text size="12px">Y</Text>}
                    />
                  </Flex>
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
                data={[
                  { label: "Title", value: "h1" },
                  { label: "Headline", value: "h2" },
                  { label: "Subheadline", value: "h3" },
                  { label: "Normal", value: "p" },
                  { label: "Small", value: "small" },
                ]}
                renderOption={renderSelectOption}
                allowDeselect={false}
                value={selectedElement.tag}
                onChange={(value) => {
                  console.log("eee", value);
                  handleElementStyleChange(selectedElement.id, "tag", value);
                }}
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
                        { label: "Thin", value: "100" },
                        { label: "Extra Light", value: "200" },
                        { label: "Light", value: "300" },
                        { label: "Regular", value: "400" },
                        { label: "Medium", value: "500" },
                        { label: "Semi Bold", value: "550" },
                        { label: "Bold", value: "700" },
                        { label: "Extra Bold", value: "800" },
                        { label: "Ultra Bold", value: "900" },
                      ]}
                      withScrollArea={true}
                      styles={{
                        dropdown: {
                          maxHeight: 200,
                          overflowY: "auto",
                        },
                      }}
                      value={String(selectedElement.styles?.fontWeight)}
                      onChange={(value) => {
                        console.log("eee", value);
                        handleElementStyleChange(
                          selectedElement.id,
                          "fontWeight",
                          Number(value)
                        );
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
                      value={selectedElement.styles?.fontSize}
                      data={[
                        { label: "8", value: "8px" },
                        { label: "24", value: "24px" },
                        { label: "28", value: "28px" },
                        { label: "32", value: "32px" },
                        { label: "36", value: "36px" },
                        { label: "48", value: "48px" },
                        { label: "80", value: "80px" },
                        { label: "120", value: "120px" },
                        { label: "180", value: "180px" },
                      ]}
                      onChange={(value) => {
                        console.log("eee", value);
                        handleElementStyleChange(
                          selectedElement.id,
                          "fontSize",
                          value
                        );
                      }}
                      searchable
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
                      {/* <ColorPickerButton
                        selectedElement={selectedElement}
                        handleElementStyleChange={handleElementStyleChange}
                      /> */}
                      <input
                        type="color"
                        className="w-8 h-8 rounded"
                        value={selectedSlide.styles?.color || "#4A5568"}
                        onChange={(e) =>
                          handleElementStyleChange(
                            selectedElement.id,
                            "color",
                            `${e.target.value}`
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
