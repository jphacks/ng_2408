/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // クライアントサイドで実行されることを明示する

import SendForm from "@/components/SendForm/SendForm";
import NestedModal from "@/components/Modal/NestedModal";
import { getCurrentPosition } from "@/utils/geolocation";
import { useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export default function WebSocketPage() {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [modalClosed, setModalClosed] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const initWebSocket = () => {
    // 本番環境と開発環境で WebSocket サーバーの URL を変更する
    if (process.env.NODE_ENV === "production") {
      socket = io();
    } else {
      socket = io("ws://localhost:5000");
    }

    // 接続されたときにサーバーからメッセージを受信する
    socket.on("connect", async () => {
      console.log("Connected to WebSocket server");

      try {
        const currentPosition = await getCurrentPosition();
        const latitude = currentPosition?.coords.latitude;
        const longitude = currentPosition?.coords.longitude;

        if (!latitude || !longitude) {
          throw new Error("Failed to get location data");
        }

        const name = "noname";
        const position = { latitude, longitude };
        socket.emit("init", { name, position }); // 'init' イベントで送信
        console.log(
          "Sent location data to server : " + { latitude, longitude }
        );
      } catch (err) {
        console.error(err);
      }
    });

    // 'message' イベントをリッスンして、メッセージを受信
    socket.on("message", (data: string) => {
      setMessageList((prev) => [...prev, data]);
    });

    // クリーンアップ時にソケットを切断
    return () => {
      socket.disconnect();
    };
  };

  return (
    <>
      <NestedModal
        initWebSocket={initWebSocket}
        setModalClosed={setModalClosed}
        setName={setName}
        name={name}
      />
      <div>
        <label>Received Message: </label>
        {messageList.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <SendForm socket={socket}></SendForm>
    </>
  );
}
