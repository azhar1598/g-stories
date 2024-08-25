import {
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Radio,
  Select,
  SelectProps,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconArrowsMaximize,
  IconChartBubble,
  IconSquareX,
} from "@tabler/icons-react";
import React from "react";
import ShowFullScript from "./ShowFullScript";
import Image from "next/image";

function ScriptToStory({ state, setState }: any) {
  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => {
    return (
      <Group flex="1" gap="xs">
        <Radio
          key={option.value}
          variant="outline"
          color="#182A4D"
          //   checked={form.values.colorwayGroupId == option.value}
          label=""
          value={option.value}
        />
        <div
          style={{
            // width: "36px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {[1].map((color, index) => (
            <Flex>
              <Image
                src="https://images.pexels.com/photos/733658/pexels-photo-733658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                width={100}
                height={100}
                alt="template here"
              />
              <Text
                style={{
                  position: "absolute",
                  backgroundColor: "black",
                  color: "white",
                  width: "100px",
                  opacity: 0.5,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Template
              </Text>
            </Flex>
          ))}
        </div>
      </Group>
    );
  };
  return (
    <Modal
      opened={state.openScriptModal}
      onClose={() => setState({ openScriptModal: false })}
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
              setState({ openScriptModal: false });
            }}
            style={{ position: "absolute", right: 5, cursor: "pointer" }}
          />
        </Group>
        <Stack gap={10} align="center" w={"100%"} px={20} pb={20}>
          <Textarea
            label="Script"
            placeholder="Facts about Lion"
            w={"100%"}
            rows={5}
            rightSection={
              <IconArrowsMaximize
                style={{ position: "absolute", bottom: 2, cursor: "pointer" }}
                onClick={() => {
                  setState({ ShowFullScript: true });
                }}
              />
            }
          />
          <Group justify={"Space-between"} w={"100%"} wrap="nowrap">
            <Select
              label="Choose Template"
              w={"48%"}
              placeholder="Select"
              data={["Template 1", "Template 2", "Template 3"]}
              renderOption={renderSelectOption}
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
            />
            <NumberInput
              placeholder="No. of slides"
              label="Slides"
              allowNegative={false}
              allowDecimal={false}
              rightSection={<IconChartBubble />}
              minLength={1}
              maxLength={2}
              w={"48%"}
            />
          </Group>

          <Button w={150}>Generate</Button>
        </Stack>
      </Group>
    </Modal>
  );
}

export default ScriptToStory;
