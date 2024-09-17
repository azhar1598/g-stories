import React, { useState } from "react";
import {
  Modal,
  Select,
  TextInput,
  Button,
  SegmentedControl,
} from "@mantine/core";

export default function GenerateModal({ opened, onClose }) {
  const [value, setValue] = useState("react");
  return (
    <Modal opened={opened} onClose={onClose} title="Scraper" size="lg">
      <div className="space-y-4">
        {/* <div className="flex space-x-2">
          <button className="text-purple-600 font-medium">Post to Story</button>
          <button className="text-gray-500">Keywords to Story</button>
          <button className="text-gray-500">Single Story Scraper</button>
          <button className="text-gray-500">Bulk Story Scraper</button>
        </div> */}
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { label: "Prompt to Story", value: "promptToStory" },
            { label: "Post to Story", value: "postToStory" },
            // { label: "Vue", value: "vue" },
            // { label: "Svelte", value: "svelte" },
          ]}
        />

        <p className="text-sm text-gray-600">
          Convert Any Blog Post, News Article, Product Page to Web Story!
        </p>

        <TextInput
          placeholder="eg.https://example.com/blog/best-street-foods"
          className="border border-purple-400 rounded-md"
          rightSection={
            <Button className="bg-green-500 text-white rounded-full w-8 h-8">
              C
            </Button>
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Select Number of Slides"
            placeholder="1"
            data={["1", "2", "3", "4", "5"]}
          />
          <TextInput
            label="Enter CTA Link"
            placeholder="eg. https://mysite.com/"
          />
          <TextInput label="Enter CTA Text" placeholder="eg. Learn More" />
          <Select
            label="Select Language:"
            placeholder="English"
            data={["English", "Spanish", "French", "German"]}
          />
          <Select
            label="CTA Placement:"
            placeholder="Last Slide"
            data={["First Slide", "Last Slide", "Every Slide"]}
          />
          {/* <Select
            label="Select Your AI:"
            placeholder="OpenAI (ChatGPT) (Default)"
            data={["OpenAI (ChatGPT)", "GPT-4", "Claude"]}
          /> */}
          <Select
            label="Choose Templates:"
            placeholder="Templates (coming soon)"
            data={["Templates (coming soon)"]}
            disabled
          />
          {/* <Select
            label="Select Brands:"
            placeholder="ApertureX Media"
            data={["ApertureX Media", "Other Brand 1", "Other Brand 2"]}
          /> */}
        </div>

        <Button className="bg-purple-600 text-white w-full">Start Magic</Button>
      </div>
    </Modal>
  );
}
