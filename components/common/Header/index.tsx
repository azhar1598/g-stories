"use client";

import React from "react";
import Search from "./Search";
import { Avatar, Button, Flex, Menu, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import StoryGenerator from "../Modals/StoryGenerator";

function Header() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <Flex py={15} justify="space-between" align="center" px="md">
      <Search />
      <Flex align="center" gap="md">
        <Button
          w={150}
          styles={(theme) => ({
            root: {
              // backgroundColor: "blue",
              // "&:hover": {
              //   backgroundColor: "skyblue",
              // },
            },
          })}
          onClick={open}
        >
          Create Story
        </Button>

        <Menu
          position="bottom-end"
          offset={5}
          withArrow
          styles={(theme) => ({
            dropdown: {
              backgroundColor: theme.colors.dark[3],
              // border: `1px solid ${theme.colors.dark[5]}`,
            },
            arrow: {
              // backgroundColor: theme.colors.dark[7],
              // border: `1px solid ${theme.colors.dark[5]}`,
            },
          })}
        >
          <Menu.Target>
            <Avatar
              color="blue"
              radius="xl"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              MK
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconUser size={14} />}
              onClick={handleProfile}
            >
              <Text size="sm">Profile</Text>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              leftSection={<IconLogout size={14} />}
              onClick={handleLogout}
              color="red"
            >
              <Text size="sm">Logout</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <StoryGenerator opened={opened} onClose={close} />
    </Flex>
  );
}

export default Header;
