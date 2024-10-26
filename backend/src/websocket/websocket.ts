import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import {
  createDisconnectEvent,
  createInitEvent,
  createMessageEvent,
} from "./events.js";

export default function createWebsocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    createDisconnectEvent(socket, io);
    createInitEvent(socket, io);
    createMessageEvent(socket, io);
  });

  return io;
}
