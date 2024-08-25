"use client";
import SignUp from "@/components/auth/SignUp";
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
import DisplayImage from "../../../public/assets/auth/login.jpeg";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRoxaNotification } from "@/hooks/useNotifications";

interface FormTypes {
  name: string;
  email: string;
  password: string;
}

function signup() {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const router = useRouter();
  const notification = useRoxaNotification();

  const signup = useMutation({
    mutationFn: async (form: { values: FormTypes }) => {
      const response: any = await signIn("signup", {
        redirect: false,
        name: form.values.name,
        email: form.values.email,
        password: form.values.password,
      });
      if (response.error) throw new Error(response.error);
      return response;
    },
    onSuccess: async (res: any) => {
      router.push("/");
    },
    onError: (err: Error) => {
      notification.error(err.message);
      console.error("Signup Error:", err.message);
    },
  });

  if (isMobile === undefined || signup.isSuccess) {
    return (
      <Center h={"100vh"}>
        <Loader color="white" />
      </Center>
    );
  }

  return (
    <SimpleGrid cols={isMobile ? 1 : 2}>
      <Center>
        <SignUp isMobile={isMobile} signup={signup} />
      </Center>
      <Center
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          display: !isMobile ? "block" : "none",
        }}
      >
        <Image
          src={DisplayImage}
          alt="Wolf Banner"
          layout="fill"
          objectFit="cover"
          priority
          unoptimized
          className="opacity-40"
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
          <Text
            style={{ fontSize: "3rem", margin: 0 }}
            className="font-montSemibold"
          >
            {" "}
            Video Creation Has Never Been This Easy
          </Text>
          <Text style={{ fontSize: "1.5rem", margin: 0, textAlign: "left" }}>
            Dozens of creative tools to ideate, generate and edit content like
            never before.
          </Text>
        </Group>
      </Center>
    </SimpleGrid>
  );
}

export default signup;
