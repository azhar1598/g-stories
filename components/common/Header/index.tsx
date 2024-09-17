import { FC } from "react";
import { Container, Group, ActionIcon, Button } from "@mantine/core";
import { IconSettings, IconSun, IconQuestionMark } from "@tabler/icons-react";
import Image from "next/image";
import Logo from "@/public/assets/logo/logo.png";

const Header: FC = () => {
  return (
    // <header className="border-b bg-white fixed top-0 w-full h-10">
    //   <Container className="flex justify-between items-center py-2" fluid>
    //     <Group className="">
    //       {/* <span className="text-xl font-semibold text-gray-700">Storybee</span> */}
    //       <Image src={Logo} height={100} width={100} alt="logo here" />
    //     </Group>

    //     <Group className="space-x-4">
    //       <Button size="xs">Create Story</Button>
    //       <span className="text-green-700 text-sm font-semibold cursor-pointer">
    //         Upgrade
    //       </span>
    //       <ActionIcon variant="outline" radius="xl" color="pink">
    //         <span className="font-bold text-xl">🔥</span>
    //       </ActionIcon>
    //       <ActionIcon variant="outline" radius="xl" color="gray">
    //         <IconSun size={20} />
    //       </ActionIcon>
    //       <ActionIcon variant="outline" radius="xl" color="gray">
    //         <IconQuestionMark size={20} />
    //       </ActionIcon>
    //     </Group>
    //   </Container>
    // </header>
    <header className="flex items-center justify-between bg-[#0d0d21d9] w-full">
      <Image
        src={Logo}
        alt="logo here"
        className="mx-5"
        height={70}
        width={70}
      />

      <ul className="menu text-white lg:menu-horizontal ">
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Inbox
            <span className="badge badge-sm">99+</span>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Updates
            <span className="badge badge-sm badge-warning">NEW</span>
          </a>
        </li>
        <li>
          <a>
            Stats
            <span className="badge badge-xs badge-info"></span>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
