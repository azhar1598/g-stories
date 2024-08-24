"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "@/theme";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

import Head from "next/head";

const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html>
      <head>
        {" "}
        <ColorSchemeScript />
        <Head>
          <title>Storybee</title>
          <meta name="description" content="Video creation at its best" />
          <meta property="og:image" content="./favicon.ico" />
          <meta property="og:title" content="Woxa" />
          <meta
            property="og:description"
            content="Video creation at its best"
          />
        </Head>
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
              <Notifications position="top-center" />
              <Provider store={store}>
                {/* {pathname !== "/login" && pathname !== "/signup"} */}
                {children}
                {/* <p className="text-gray-300 px-4 md:p-0 text-center leading-5 absolute bottom-12 w-full">
                Roxa ai might produce inaccuracies. Please review and edit as
                needed.
              </p> */}
              </Provider>
            </MantineProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
