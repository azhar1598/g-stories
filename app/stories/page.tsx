import React from "react";
import { Story } from "./Story";
import { Flex, Title } from "@mantine/core";

function page() {
  return (
    <Flex direction={"column"} px={50} gap={50} className="">
      <Title c={"white"}>My Stories</Title>

      <Flex gap={20}>
        <Story />
        <Story />
      </Flex>
    </Flex>
  );
}

export default page;
