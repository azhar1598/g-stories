"use client";

import React from "react";
import Search from "./Search";
import { Avatar, Button, Flex, Menu, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import StoryGenerator from "../Modals/StoryGenerator";
import { signOut } from "next-auth/react";

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
          variant="primary"
          onClick={open}
        >
          Create Story
        </Button>

        <Menu
          position="bottom-end"
          offset={4}
          styles={(theme) => ({
            dropdown: {
              backgroundColor: "#2C2E33",
              padding: "8px 8px",
              minWidth: "140px",
              border: "0.2px solid gray",
            },
            item: {
              // backgroundColor: "transparent",
              color: "#C1C2C5",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "red",
              },
            },
            divider: {
              borderColor: "rgba(255, 255, 255, 0.1)",
              margin: "4px 0",
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
              leftSection={<IconUser className="w-4 h-4" />}
              onClick={handleProfile}
            >
              <Text className="text-gray-300" size="12px">
                Profile
              </Text>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              leftSection={<IconLogout className="w-4 h-4" />}
              onClick={handleLogout}
              className="text-red-400"
            >
              <Text
                size="12px"
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Logout
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <StoryGenerator opened={opened} onClose={close} />
    </Flex>
  );
}

export default Header;
