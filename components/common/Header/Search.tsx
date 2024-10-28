import { Center, Input } from "@mantine/core";
import React from "react";

function Search() {
  return (
    <Center w={"100%"}>
      <Input placeholder="Search..." w={550} variant="search" />
    </Center>
  );
}

export default Search;
