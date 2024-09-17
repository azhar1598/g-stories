"use client";
import { FC } from "react";
import {
  Card,
  Button,
  Group,
  Text,
  Container,
  Image,
  Center,
  Modal,
  TextInput,
  NumberInput,
  Stack,
  Select,
} from "@mantine/core";
import {
  IconPrompt,
  IconFileText,
  IconVideo,
  IconCross,
  IconSquareX,
  IconChartBubble,
} from "@tabler/icons-react";
import StoryList from "@/components/home/StoryList";
import { useDisclosure, useSetState } from "@mantine/hooks";
import PromptToStory from "@/components/home/Modals/PromptToStory";
import ScriptToStory from "@/components/home/Modals/ScriptToStory";
import ShowFullScript from "@/components/home/Modals/ShowFullScript";
import GenerateModal from "@/components/home/Modals/GenerateModal";

const MainSection: FC = () => {
  const [opened, { close, open }] = useDisclosure(false);

  const [state, setState] = useSetState({
    openScriptModal: false,
    openFileModal: false,
    showFullScript: false,
  });
  return (
    // <Center className="md:py-10 pt-20" h={"100vh"}>
    // <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    //   <Card
    //     shadow="sm"
    //     padding="lg"
    //     className="flex flex-col text-center"
    //     radius="md"
    //   >
    //     <Group justify="center" className="mb-4">
    //       <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
    //         <IconPrompt size={40} stroke={1.5} />
    //       </div>
    //     </Group>
    //     <Text className="text-lg font-semibold mb-1">Prompt to Story</Text>
    //     <Text color="dimmed" size="xs" className="mb-3">
    //       Convert a text prompt into a story easily.
    //     </Text>
    //     <Button
    //       variant="filled"
    //       color="blue"
    //       fullWidth
    //       className="mt-auto"
    //       onClick={open}
    //     >
    //       Start
    //     </Button>
    //   </Card>

    //   <Card
    //     shadow="sm"
    //     padding="lg"
    //     className="flex flex-col text-center"
    //     radius="md"
    //   >
    //     <Group justify="center" className="mb-4">
    //       <div className="bg-red-100 text-red-600 p-3 rounded-full">
    //         <IconFileText size={40} stroke={1.5} />
    //       </div>
    //     </Group>
    //     <Text className="text-lg font-semibold mb-1">Script to Story</Text>
    //     <Text color="dimmed" size="xs" className="mb-3">
    //       Turn your script into a story.
    //     </Text>
    //     <Button
    //       variant="filled"
    //       color="red"
    //       fullWidth
    //       className="mt-auto"
    //       onClick={() => {
    //         setState({ openScriptModal: true });
    //       }}
    //     >
    //       Start
    //     </Button>
    //   </Card>

    //   <Card
    //     shadow="sm"
    //     padding="lg"
    //     className="flex flex-col text-center"
    //     radius="md"
    //   >
    //     <Group justify="center" className="mb-4">
    //       <div className="bg-green-100 text-green-600 p-3 rounded-full">
    //         <IconVideo size={40} stroke={1.5} />
    //       </div>
    //     </Group>
    //     <Text className="text-lg font-semibold mb-1">File to Story</Text>
    //     <Text color="dimmed" size="xs" className="mb-3">
    //       Upload a file and generate a video from it.
    //     </Text>
    //     <Button variant="filled" color="green" fullWidth className="mt-auto">
    //       Start
    //     </Button>
    //   </Card>
    // </div>
    <></>
  );
  {
    /* <PromptToStory opened={opened} close={close} /> */
  }
  // <GenerateModal opened={opened} onClose={close} />
  // <ScriptToStory state={state} setState={setState} />
  // <ShowFullScript state={state} setState={setState} />
  // </Center>
};

export default MainSection;
