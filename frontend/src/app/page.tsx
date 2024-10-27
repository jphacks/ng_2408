/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // クライアントサイドで実行されることを明示する

import SendForm from "@/components/SendForm/SendForm";
import NestedModal from "@/components/Modal/NestedModal";
import { getCurrentPosition } from "@/utils/geolocation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Bubble from "@/components/Bubble/Bubble";
import styles from "./page.module.scss";
import {
  initEventInterface,
  messageDownEventInterface,
  updateEventInterface,
  Position,
} from "@/types/interface";
import Header from "@/components/Header/Header";

let socket: Socket;

export default function WebSocketPage() {
  const [messageList, setMessageList] = useState<messageDownEventInterface[]>(
    []
  );
  const [modalClosed, setModalClosed] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<updateEventInterface[]>([]);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position | null>(null);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const currentPosition = await getCurrentPosition();
        const latitude = currentPosition?.coords.latitude;
        const longitude = currentPosition?.coords.longitude;

        if (!latitude || !longitude) {
          throw new Error("Failed to get location data");
        }

        setPosition({ latitude, longitude });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

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

      if (!position) {
        console.error("Failed to get location data");
        return;
      }

      const initData: initEventInterface = {
        name,
        position,
      };
      socket.emit("init", initData); // 'init' イベントで送信
      console.log("Sent location data to server:", position);
    });

    // 'message' イベントをリッスンして、メッセージを受信
    socket.on(
      "message",
      ({
        name: senderName,
        addressHash,
        format,
        message,
        isSelfMessage,
      }: messageDownEventInterface) => {
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
          { name: senderName, addressHash, format, message, isSelfMessage },
        ]);
      }
    );

    socket.on("update", (users: updateEventInterface[]) => {
      setUsers(users);
    });

    // クリーンアップ時にソケットを切断
    return () => {
      socket.disconnect();
    };
  };

  return (
    <>
      <Header users={users} />
      <main>
        <NestedModal
          initWebSocket={initWebSocket}
          setModalClosed={setModalClosed}
          setName={setName}
          name={name}
          position={position}
        />
        <div className={styles.messageList}>
          <div>
            {messageList.map((bubble, index) => (
              <Bubble key={index} bubble={bubble} />
            ))}
            <div ref={scrollBottomRef} />
          </div>
        </div>
        <SendForm socket={socket}></SendForm>
      </main>
    </>
  );
}
