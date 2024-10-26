import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { Position, User } from "../types/interface.js";
import {
  createGroup,
  getLocalUser,
  groups,
  removeUser,
  setUser,
  users,
} from "../utils/users.js";

const emitUpdate = (io: Server, groupId: number) => {
  io.emit(
    "update",
    groups[groupId].map((socketId) => users[socketId].name)
  );
};

export default function createWebsocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      const groupId = users[socket.id].groupId;
      removeUser(socket.id);
      emitUpdate(io, groupId);
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

        emitUpdate(io, groupId);
      }
    );

    socket.on("message", (message) => {
      console.log("Received message: ", message);
      console.log("user id: ", socket.id);
      console.log("group id: ", users[socket.id].groupId);

      groups[users[socket.id].groupId].forEach((socketId: string) => {
        const name = users[socket.id].name;
        const addressHash = "TODO: implement addressHash";
        const format = "text";
        const isSelfMessage = socketId === socket.id;
        console.log(socketId);
        io.to(socketId).emit(
          "message",
          name,
          addressHash,
          format,
          message,
          isSelfMessage
        );
      });
    });
  });

  return io;
}
