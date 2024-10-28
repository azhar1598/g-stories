// sidebar.tsx
"use client";

import { useState } from "react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import { IconSwitchHorizontal, IconLogout } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import classes from "./sidebar.module.css";
import { sidebarItems } from "./sidebar";

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  link: string;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  link,
}: NavbarLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(link);
  };

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={handleClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Find active index based on current pathname
  const activeIndex = sidebarItems.findIndex((item) => item.link === pathname);

  const links = sidebarItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activeIndex}
      onClick={() => {
        // Additional onClick handling if needed
      }}
    />
  ));

  const handleAccountSwitch = () => {
    // Handle account switching logic
    console.log("Switching account");
  };

  const handleLogout = () => {
    router.push("/login");
    // Add any additional logout logic here
  };

  return (
    <nav className={classes.navbar}>
      <Center>{/* Logo can go here */}</Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink
          icon={IconSwitchHorizontal}
          label="Change account"
          link="#"
          onClick={handleAccountSwitch}
        />
        <NavbarLink
          icon={IconLogout}
          label="Logout"
          link="/login"
          onClick={handleLogout}
        />
      </Stack>
    </nav>
  );
}
