import { useState } from "react";
import {
  Modal,
  TextInput,
  Select,
  Button,
  NumberInput,
  Stack,
  Text,
  Group,
} from "@mantine/core";

interface StoryGeneratorProps {
  opened: boolean;
  onClose: () => void;
}

const StoryGenerator = ({ opened, onClose }: StoryGeneratorProps) => {
  const [url, setUrl] = useState("");
  const [slides, setSlides] = useState<number>(1);
  const [ctaLink, setCtaLink] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [language, setLanguage] = useState("english");
  const [ai, setAi] = useState("openai");
  const [template, setTemplate] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      url,
      slides,
      ctaLink,
      ctaText,
      language,
      ai,
      template,
      brand,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      //   title="Convert Any Blog Post, News Article, Product Page to Web Story!"
      size="lg"
      padding={0}
      withCloseButton={false}
      centered
    >
      <Stack gap="lg" py={50} px={50} bg={"#2b2b36"}>
        <TextInput
          label="Enter URL"
          variant="primary"
          placeholder="eg.https://example.com/blog/best-street-foods"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          //   className="w-full"
          required
        />

        <Group grow>
          <NumberInput
            label="Select Number of Slides"
            variant="primary"
            value={slides}
            onChange={(val) => setSlides(val || 1)}
            min={1}
            allowDecimal={false}
            allowNegative={false}
            className="w-full"
            hideControls
          />

          <TextInput
            label="Enter CTA Link"
            variant="primary"
            placeholder="eg. https://mysite.com/"
            value={ctaLink}
            onChange={(e) => setCtaLink(e.target.value)}
            className="w-full"
          />
        </Group>

        <Group grow>
          <TextInput
            label="Enter CTA Text"
            variant="primary"
            placeholder="eg. Learn More"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full"
          />

          <Select
            label="Select Language"
            value={language}
            variant="primary"
            onChange={(val) => setLanguage(val || "english")}
            data={[
              { value: "english", label: "English" },
              { value: "spanish", label: "Spanish" },
              { value: "french", label: "French" },
            ]}
            className="w-full"
          />
        </Group>

        <Group grow>
          <Select
            label="CTA Placement"
            variant="primary"
            data={[
              { value: "last", label: "Last Slide" },
              { value: "first", label: "First Slide" },
              { value: "all", label: "All Slides" },
            ]}
            defaultValue="last"
            className="w-full"
          />

          <Select
            label="Select Your AI"
            value={ai}
            variant="primary"
            onChange={(val) => setAi(val || "openai")}
            data={[
              { value: "openai", label: "OpenAI (ChatGPT) (Default)" },
              { value: "claude", label: "Claude" },
              { value: "palm", label: "PaLM" },
            ]}
            className="w-full"
          />
        </Group>

        <Group grow>
          <Select
            label="Choose Templates"
            variant="primary"
            value={template}
            onChange={(val) => setTemplate(val || "")}
            data={[{ value: "coming-soon", label: "Templates (coming soon)" }]}
            className="w-full"
          />

          <Select
            label="Select Brands"
            variant="primary"
            value={brand}
            onChange={(val) => setBrand(val || "")}
            data={[{ value: "aperturex", label: "ApertureX Media" }]}
            className="w-full"
          />
        </Group>

        <Group justify="center">
          <Button mt={4} onClick={handleSubmit} variant="primary" w={200}>
            Start Magic
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default StoryGenerator;
