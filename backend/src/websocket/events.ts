import { Server, Socket } from "socket.io";
import {
  initEventInterface,
  messageDownEventInterface,
  User,
} from "../types/interface.js";
import { hashIPAddress } from "../utils/hash.js";
import {
  getLocalUser,
  createGroup,
  setUser,
  groups,
  users,
  removeUser,
} from "../utils/users.js";

const emitUpdate = (io: Server, groupId: number) => {
  groups[groupId].forEach((socketId: string) => {
    io.to(socketId).emit(
      "update",
      groups[groupId].map((socketId) => users[socketId].name)
    );
  });
};

export const createInitEvent = (socket: Socket, io: Server) => {
  socket.on("init", ({ name, position }: initEventInterface) => {
    console.log("Received init: ", name, position);

    // validate position
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

    const ip = socket.handshake.address;
    const addressHash = hashIPAddress(ip);

    const user: User = {
      name,
      position,
      groupId,
      addressHash: addressHash,
    };

    setUser(socket.id, user);

    emitUpdate(io, groupId);
  });
};

export const createDisconnectEvent = (socket: Socket, io: Server) => {
  socket.on("disconnect", () => {
    const groupId = users[socket.id].groupId;
    removeUser(socket.id);
    emitUpdate(io, groupId);
    console.log("User disconnected");
  });
};

export const createMessageEvent = (socket: Socket, io: Server) => {
  socket.on("message", (message) => {
    console.log("Received message: ", message);
    console.log("user id: ", socket.id);
    console.log("group id: ", users[socket.id].groupId);

    groups[users[socket.id].groupId].forEach((socketId: string) => {
      const messageData: messageDownEventInterface = {
        name: users[socket.id].name,
        addressHash: users[socket.id].addressHash,
        format: "text",
        message: message,
        isSelfMessage: socketId === socket.id,
      };

      io.to(socketId).emit("message", messageData);
    });
  });
};
