"use client";
import { GoldRushProvider } from "@covalenthq/goldrush-kit";

import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import "@covalenthq/goldrush-kit/styles.css";
import './globals.css';
import { ThemeProvider, useTheme } from "next-themes";
import { NftProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

/*
Rewards: 
:firemoneybag: Top 1 Alchemist x 1000 USDC
:coval: 1500 Coval
☀️ 1000 XP

Details: Using GoldRush Kit, build a dashboard focused on the NFT collection associated with the 2024 Alchemist program.

One exists on Zora: https://zora.co/collect/zora:0xfeee3700698f8d75bcc18e009022c7b44d2af44f
It's time to build something better, with the chance it becomes the official dashboard for the Alchemist 4.0 collection.

Requirements:

    Improve on the styling of the Zora dashboard, taking cues from the Covalent website:

https://www.covalenthq.com/

    Include similar views to the Zora site:
    High level view of collection.
    Individual NFT view with animation, mint info and network
    external links to opensea etc.


    Build and deploy your site. Share the link to your deployed project with us. Vercel is recommended but not required. Also share a link to the code repository with the completed dashboard site.
*/

export default function RootLayout({ children }) {
  const { theme } = useTheme();
  const mode = theme;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-base-100">
        <ThemeProvider defaultTheme="system" enableSystem>
          <Navbar />
          <GoldRushProvider apikey={process.env.NEXT_PUBLIC_API_KEY} mode={mode} border_radius="large">
            <NftProvider>
              {children}
            </NftProvider>
          </GoldRushProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

