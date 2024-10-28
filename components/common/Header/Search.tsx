import { Center, Input } from "@mantine/core";
import React from "react";

function Search() {
  return (
    <Center w={"100%"}>
      <Input
        placeholder="Search..."
        w={550}
        bg={"#21212cd9"}
        style={{ bacgroundColor: "#21212cd9 !important" }}
      />
    </Center>
  );
}

export default Search;
