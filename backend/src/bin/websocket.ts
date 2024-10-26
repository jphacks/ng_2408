import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { Position, User } from "../types/interface.js";
import {
  createGroup,
  getLocalUser,
  removeUser,
  setUser,
} from "../utils/users.js";

export default function createWebsocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("User disconnected");
    });

    socket.on(
      "init",
      ({ name, position }: { name: string; position: Position }) => {
        console.log("Received init: ", name, position);

        if (!position.latitude || !position.longitude) {
          console.log("Invalid position");
          console.log("name: ", name);
          return;
        }

        const localUser = getLocalUser(position);
        let groupId;
        if (!localUser) {
          groupId = createGroup();
        } else {
          groupId = localUser.groupId;
        }

        const user: User = {
          name,
          position,
          groupId,
        };

        setUser(socket.id, user);
      }
    );

    socket.on("message", (message) => {
      console.log("Received message: ", message);
      io.emit("message", message);
    });
  });

  return io;
}
