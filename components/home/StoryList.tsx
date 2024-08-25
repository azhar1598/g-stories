import { Card, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function StoryList() {
  return (
    <div>
      <Text className="text-2xl font-semibold mb-6 text-left">
        Work History
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Template 1 */}
        <Card shadow="sm" padding="lg" radius="md">
          <img
            src="https://via.placeholder.com/300"
            alt="Template 1"
            className="mb-4 rounded-lg"
          />
          <Text className="text-lg font-medium">Sample story 1</Text>
        </Card>

        {/* Template 2 */}
        <Card shadow="sm" padding="lg" radius="md">
          <img
            src="https://via.placeholder.com/300"
            alt="Template 2"
            className="mb-4 rounded-lg"
          />
          <Text className="text-lg font-medium">Sample story 2</Text>
        </Card>

        {/* <Card shadow="sm" padding="lg" radius="md"> */}
        <div className="flex items-center justify-center h-full">
          <Link href="" className="underline">
            View all
          </Link>
        </div>
        {/* </Card> */}
      </div>
    </div>
  );
}

export default StoryList;
