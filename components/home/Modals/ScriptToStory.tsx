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
import { IconChartBubble, IconSquareX } from "@tabler/icons-react";
import React from "react";

function ScriptToStory({ state, setState }: any) {
  return (
    <Modal
      opened={state.openScriptModal}
      onClose={state.openScriptModal}
      size="xl"
      title=""
      //   centered
      withCloseButton={false}
      padding={0}
    >
      <Group>
        <Group bg={"#1f2937"} h={50} w={"100%"} align="center">
          <Text
            color="white"
            className="text-center font-montMedium w-full"
            size="sm"
          >
            Script to Story
          </Text>
          <IconSquareX
            stroke={2}
            color="white"
            onClick={() => {
              setState({ openScriptStory: false });
            }}
            style={{ position: "absolute", right: 5, cursor: "pointer" }}
          />
        </Group>
        <Stack gap={10} align="center" w={"100%"} px={20} pb={20}>
          <Textarea
            label="Script"
            placeholder="Facts about Lion"
            w={"100%"}
            rows={13}
          />
          <NumberInput
            placeholder="No. of slides"
            label="Slides"
            allowNegative={false}
            allowDecimal={false}
            rightSection={<IconChartBubble />}
            minLength={1}
            maxLength={2}
            w={"100%"}
          />
          <Select
            label="Language"
            placeholder="Pick language"
            data={["English", "Hindi", "Telugu", "Urdu"]}
            w={"100%"}
          />
          <Button w={150}>Generate</Button>
        </Stack>
      </Group>
    </Modal>
  );
}

export default ScriptToStory;
