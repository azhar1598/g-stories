import { FC } from "react";
import { Container, Group, ActionIcon } from "@mantine/core";
import { IconSettings, IconSun, IconQuestionMark } from "@tabler/icons-react";
import Image from "next/image";
import Logo from "@/public/assets/logo/logo.png";

const Header: FC = () => {
  return (
    <header className="border-b bg-white fixed top-0 w-full h-10">
      <Container className="flex justify-between items-center py-2" fluid>
        <Group className="">
          {/* <span className="text-xl font-semibold text-gray-700">Storybee</span> */}
          <Image src={Logo} height={100} width={100} alt="logo here" />
        </Group>

        <Group className="space-x-4">
          <span className="text-green-700 text-sm font-semibold cursor-pointer">
            Upgrade
          </span>
          <ActionIcon variant="outline" radius="xl" color="pink">
            <span className="font-bold text-xl">🔥</span>
          </ActionIcon>
          <ActionIcon variant="outline" radius="xl" color="gray">
            <IconSun size={20} />
          </ActionIcon>
          <ActionIcon variant="outline" radius="xl" color="gray">
            <IconQuestionMark size={20} />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
};

export default Header;
