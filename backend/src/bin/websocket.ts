import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export default function createWebsocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on(
      "init",
      (location: { latitude?: number; longtitude?: number }) => {
        console.log("Received location: ", location);
      }
    );

    socket.on("message", (message) => {
      console.log("Received message: ", message);
      io.emit("message", message);
    });
  });

  return io;
}
