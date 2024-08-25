"use client";

import {
  Button,
  createTheme,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import classes from "@/styles/default.module.css";
import {
  IconArrowDown,
  IconCaretDown,
  IconCaretDownFilled,
} from "@tabler/icons-react";

export const theme = createTheme({
  colors: {
    deepBlue: [
      "#eff3fa",
      "#dee3ef",
      "#b7c5df",
      "#8fa5d1",
      "#6d89c5",
      "#5878be",
      "#4d6fbd",
      "#3e5ea6",
      "#355495",
      "#294884",
    ],
  },
  components: {
    Textarea: Textarea.extend({
      classNames: {
        input: classes.text_area,
        label: "",
        required: "",
      },
    }),

    TextInput: TextInput.extend({
      classNames: {
        input: classes.text_input,
        label: "",
        required: "",
      },
    }),

    Select: Select.extend({
      classNames: {
        input: classes.select_input,
        label: classes.select_input_label,
        groupLabel: "",
        required: "",
        options: classes.select_options,
      },
      defaultProps: {
        rightSection: <IconCaretDownFilled stroke={2} width={20} height={20} />,
        withCheckIcon: false,
        withScrollArea: false,
        maxDropdownHeight: 200,
        comboboxProps: {
          position: "bottom",
          middlewares: { flip: false, shift: false },
          dropdownPadding: 0,
          offset: 0,
        },
      },
    }),

    Button: Button.extend({
      classNames: { root: classes.button },
    }),
  },
});
