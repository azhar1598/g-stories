import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChartBubble,
  IconSquareX,
} from "@tabler/icons-react";
import React from "react";

function ShowFullScript({ state, setState }: any) {
  return (
    <Modal
      opened={state.ShowFullScript}
      onClose={() => {
        setState({ showFullScript: false });
      }}
      size="xl"
      title=""
      //   centered
      withCloseButton={false}
      padding={0}
    >
      <Stack gap={10} align="center" w={"100%"} px={20} py={20}>
        <Textarea
          placeholder="Facts about Lion"
          w={"100%"}
          rows={25}
          rightSection={
            <IconArrowsMinimize
              style={{ position: "absolute", bottom: 2, cursor: "pointer" }}
              onClick={() => {
                setState({ ShowFullScript: false });
              }}
            />
          }
        />
      </Stack>
    </Modal>
  );
}

export default ShowFullScript;
