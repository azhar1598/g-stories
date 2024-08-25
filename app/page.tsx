import { FC } from "react";
import {
  Card,
  Button,
  Group,
  Text,
  Container,
  Image,
  Center,
} from "@mantine/core";
import { IconPrompt, IconFileText, IconVideo } from "@tabler/icons-react";
import StoryList from "@/components/home/StoryList";

const MainSection: FC = () => {
  return (
    <Center className="py-10" h={"100vh"}>
      {/* Main Button Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card
          shadow="sm"
          padding="lg"
          className="flex flex-col text-center"
          radius="md"
        >
          <Group justify="center" className="mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <IconPrompt size={40} stroke={1.5} />
            </div>
          </Group>
          <Text className="text-lg font-semibold mb-1">Prompt to Story</Text>
          <Text color="dimmed" size="xs" className="mb-3">
            Convert a text prompt into a story easily.
          </Text>
          <Button variant="filled" color="blue" fullWidth className="mt-auto">
            Start
          </Button>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          className="flex flex-col text-center"
          radius="md"
        >
          <Group justify="center" className="mb-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <IconFileText size={40} stroke={1.5} />
            </div>
          </Group>
          <Text className="text-lg font-semibold mb-1">Script to Story</Text>
          <Text color="dimmed" size="xs" className="mb-3">
            Turn your script into a story.
          </Text>
          <Button variant="filled" color="red" fullWidth className="mt-auto">
            Start
          </Button>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          className="flex flex-col text-center"
          radius="md"
        >
          <Group justify="center" className="mb-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <IconVideo size={40} stroke={1.5} />
            </div>
          </Group>
          <Text className="text-lg font-semibold mb-1">File to Story</Text>
          <Text color="dimmed" size="xs" className="mb-3">
            Upload a file and generate a video from it.
          </Text>
          <Button variant="filled" color="green" fullWidth className="mt-auto">
            Start
          </Button>
        </Card>
      </div>
      {/* <StoryList /> */}
    </Center>
  );
};

export default MainSection;
