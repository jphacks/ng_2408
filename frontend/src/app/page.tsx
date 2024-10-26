/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // クライアントサイドで実行されることを明示する

import SendForm from "@/components/SendForm/SendForm";
import NestedModal from "@/components/Modal/NestedModal";
import { getCurrentPosition } from "@/utils/geolocation";
import { useLayoutEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Bubble from "@/components/Bubble/Bubble";
import styles from "./page.module.scss";
import { MessageInterface } from "@/types/interface";

let socket: Socket;

export default function WebSocketPage() {
  const [messageList, setMessageList] = useState<MessageInterface[]>([]);
  const [modalClosed, setModalClosed] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  });

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

        const position = { latitude, longitude };
        socket.emit("init", { name, position }); // 'init' イベントで送信
        console.log("Sent location data to server:", latitude, longitude);
      } catch (err) {
        console.error(err);
      }
    });

    // 'message' イベントをリッスンして、メッセージを受信
    socket.on(
      "message",
      (
        senderName: string,
        addressHash: string,
        format: string,
        message: string,
        isSelfMessage: boolean
      ) => {
        console.log(
          "Received messages: ",
          senderName,
          addressHash,
          format,
          message,
          isSelfMessage
        );
        setMessageList((prev) => [
          ...prev,
          { senderName, addressHash, format, message, isSelfMessage },
        ]);
      }
    );

    socket.on("update", (names: string[]) => {
      setNames(names);
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
      <div className={styles.messageList}>
        <h2>Connected Users: </h2>
        {names.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
        <div>
          <h2>Received Messages: </h2>
          {messageList.map((bubble, index) => (
            <Bubble key={index} bubble={bubble} />
          ))}
          <div ref={scrollBottomRef} />
        </div>
      </div>
      <SendForm socket={socket}></SendForm>
    </>
  );
}
