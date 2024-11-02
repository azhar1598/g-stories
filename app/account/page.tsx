import React from "react";
import { Flex, Title } from "@mantine/core";

function page() {
  return (
    <Flex direction={"column"} px={50} gap={50} className="">
      <Title c={"white"}>My Account</Title>

      <Flex gap={20}></Flex>
    </Flex>
  );
}

export default page;
