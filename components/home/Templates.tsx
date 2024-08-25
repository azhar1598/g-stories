import { Card, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

function Templates() {
  return (
    <div>
      <Text className="text-2xl font-semibold mb-6 text-left">
        Sample Templates
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Template 1 */}
        <Card shadow="sm" padding="lg" radius="md">
          <img
            src="https://via.placeholder.com/300"
            alt="Template 1"
            className="mb-4 rounded-lg"
          />
          <Text className="text-lg font-medium">Template 1</Text>
        </Card>

        {/* Template 2 */}
        <Card shadow="sm" padding="lg" radius="md">
          <img
            src="https://via.placeholder.com/300"
            alt="Template 2"
            className="mb-4 rounded-lg"
          />
          <Text className="text-lg font-medium">Template 2</Text>
        </Card>

        {/* Template 3 */}
        <Card shadow="sm" padding="lg" radius="md">
          <img
            src="https://via.placeholder.com/300"
            alt="Template 3"
            className="mb-4 rounded-lg"
          />
          <Text className="text-lg font-medium">Template 3</Text>
        </Card>
      </div>
    </div>
  );
}

export default Templates;
