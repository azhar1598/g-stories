"use client";
import {
  Center,
  Container,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import DisplayImage from "../../../public/assets/auth/zazu.webp";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRoxaNotification } from "@/hooks/useNotifications";
import Login from "@/components/auth/Login";

interface FormTypes {
  email: string;
  password: string;
}

function login() {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const router = useRouter();
  const notification = useRoxaNotification();

  const login = useMutation({
    mutationFn: async (form: { values: FormTypes }) => {
      const response: any = await signIn("signin", {
        redirect: false,
        email: form.values.email,
        password: form.values.password,
      });
      if (response.error) throw new Error(response.error);
      return response;
    },
    onSuccess: async () => {
      router.push("/");
    },
    onError: (err: Error) => {
      notification.error(err.message);
      console.log(err.message);
    },
  });

  if (isMobile === undefined || login.isSuccess) {
    return (
      <Center h={"100vh"}>
        <Loader color="white" />
      </Center>
    );
  }

  return (
    <SimpleGrid cols={isMobile ? 1 : 1}>
      <Center
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundColor: "black",
          display: !isMobile ? "block" : "none",
        }}
      >
        <Image
          src={DisplayImage}
          alt="Wolf Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          unoptimized
          priority
        />
        <Group
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* <Text
            style={{ fontSize: "3rem", margin: 0 }}
            className="font-montSemibold"
          >
            {" "}
            Web stories Made Easier
          </Text>
          <Text style={{ fontSize: "1.5rem", margin: 0, textAlign: "left" }}>
            Empower your creativity with tools that bring your vision to life
            effortlessly.
          </Text> */}
          <Center>
            <Login isMobile={isMobile} login={login} />
          </Center>
        </Group>
      </Center>
    </SimpleGrid>
  );
}

export default login;
