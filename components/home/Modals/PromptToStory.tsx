import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconChartBubble, IconSquareX } from "@tabler/icons-react";
import React from "react";

function PromptToStory({ opened, close }: any) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      size="md"
      title=""
      centered
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
            Prompt to Story
          </Text>
          <IconSquareX
            stroke={2}
            color="white"
            onClick={close}
            style={{ position: "absolute", right: 5, cursor: "pointer" }}
          />
        </Group>
        <Stack gap={10} align="center" w={"100%"} px={20} pb={20}>
          <TextInput label="Prompt" placeholder="Facts about Lion" w={"100%"} />
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

export default PromptToStory;
