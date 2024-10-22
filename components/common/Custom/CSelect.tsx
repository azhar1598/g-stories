"use client";
import {
  Combobox,
  Input,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface CSelectProps {
  label?: string;
  name?: string;
  form?: any;
  nonSearchable?: any[];
  onChange?: (value: string | null) => void;
  options: any[];
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  addCustomValue?: any;
}

export function CSelect({
  label,
  nonSearchable,
  name,
  form,
  onChange,
  options,
  disabled,
  value: controlledValue,
  addCustomValue,
  placeholder,
}: Readonly<CSelectProps>) {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState<any>(null);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  useEffect(() => {
    if (controlledValue) {
      const selectedOption = options.find(
        (option) => option.id === controlledValue
      );
      setValue(
        selectedOption || { id: controlledValue, name: controlledValue }
      );
    } else {
      setValue(null);
    }
  }, [controlledValue, options]);

  const filteredOptions = options?.filter((item) =>
    item?.name?.toLowerCase().includes(search?.toLowerCase().trim())
  );

  const optionsJSX = filteredOptions?.map((item) => (
    <Combobox.Option
      value={item}
      key={item.id}
      data-checked={value?.id === item.id}
    >
      {item.name}
    </Combobox.Option>
  ));

  const handleValueChange = (newValue: any) => {
    if (value?.id === newValue?.id) {
      // If the clicked value is the same as the current value, clear it
      setValue(null);
      onChange?.(null);
    } else {
      setValue(newValue);
      onChange?.(newValue?.id);
    }
    combobox.closeDropdown();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    searchValue: string
  ) => {
    if (
      addCustomValue &&
      event.key === "Enter" &&
      search.trim() &&
      filteredOptions.length === 0
    ) {
      event.preventDefault();
      const newCustomValue = { name: searchValue, id: searchValue };
      handleValueChange(newCustomValue);
      combobox.closeDropdown();
      setSearch("");
    }
  };

  return (
    <div className="flex items-center justify-between">
      {label && (
        <div
          style={{
            color: "#ababba",
            fontSize: "12px",
          }}
        >
          {label}
        </div>
      )}
      <div className="w-[150px]">
        <Combobox
          store={combobox}
          offset={0}
          onOptionSubmit={(val) => {
            handleValueChange(val);
          }}
        >
          <Combobox.Target>
            <InputBase
              pointer
              component="button"
              type="button"
              onClick={() => combobox.toggleDropdown()}
              rightSection={
                combobox.dropdownOpened ? (
                  <IconChevronUp
                    width={20}
                    height={15}
                    color="#868e96"
                    stroke={1.5}
                    onClick={(e) => {
                      e.stopPropagation();
                      combobox.closeDropdown();
                    }}
                  />
                ) : (
                  <IconChevronDown
                    width={20}
                    height={15}
                    color="#868e96"
                    stroke={1.5}
                    onClick={(e) => {
                      e.stopPropagation();
                      combobox.openDropdown();
                    }}
                  />
                )
              }
              rightSectionPointerEvents="auto"
              disabled={disabled}
            >
              {value?.name || (
                <Input.Placeholder>{placeholder ?? "Select"}</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown
            p={20}
            mt={5}
            bg={"#21212c"}
            style={{
              outline: "none",
              border: "none",
            }}
          >
            <Combobox.Search
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Search"
              leftSection={<IconSearch width={14} />}
              onKeyDown={(event: any) => handleKeyDown(event, search)}
            />

            <ScrollArea>
              <Combobox.Options mah={200}>
                {nonSearchable && nonSearchable.length > 0 && (
                  <div>
                    {nonSearchable.map((item) => (
                      <Combobox.Option
                        value={item}
                        key={item.id}
                        data-checked={value?.id === item.id}
                      >
                        {item.name}
                      </Combobox.Option>
                    ))}
                  </div>
                )}
                {optionsJSX?.length > 0 ? (
                  optionsJSX
                ) : (
                  <Combobox.Empty>Nothing found</Combobox.Empty>
                )}
              </Combobox.Options>
            </ScrollArea>
          </Combobox.Dropdown>
        </Combobox>
      </div>
    </div>
  );
}
