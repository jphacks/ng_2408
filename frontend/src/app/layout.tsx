import type { Metadata } from "next";
import "@/styles/style.scss";
import React from "react";

export const metadata: Metadata = {
  title: "What's Up!",
  description:
    "「What's Up!」でイベントをもっと楽しもう。周りの参加者と匿名でつながり、その瞬間の体験を共有できる新しいチャットアプリ。話題のスポットやセッションの感想など、リアルタイムで会場の空気を感じながら、自由に会話を楽しめます。",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
