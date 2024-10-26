import { Position, User } from "../types/interface.js";

export const users: Record<string, User> = {};
const groups: Record<number, string[]> = {};

export const setUser = (socketId: string, user: User) => {
  users[socketId] = user;
  if (!groups[user.groupId]) {
    groups[user.groupId] = [];
  }
  groups[user.groupId].push(socketId);
};

export const removeUser = (socketId: string) => {
  const user = users[socketId];
  if (!user) return;

  const index = groups[user.groupId].indexOf(socketId);
  if (index > -1) {
    groups[user.groupId].splice(index, 1);
  }
  delete users[socketId];
};

// idをauto incrementで返す
const autoIncrement = () => {
  let id = 0;
  return () => id++;
};
const getId = autoIncrement();

export const createGroup = (): number => {
  const groupId = getId();
  groups[groupId] = [];
  return groupId;
};

export const getLocalUser = (position: Position): User | null => {
  const localUsers: (User & { dist: number })[] = [];

  Object.keys(users).forEach((socketId: string) => {
    const user = users[socketId];
    const distance = Math.sqrt(
      (user.position.latitude - position.latitude) ** 2 +
        (user.position.longitude - position.longitude) ** 2
    );
    if (distance <= 0.005) {
      localUsers.push({ ...user, dist: distance });
    }
  });

  if (localUsers.length === 0) {
    return null;
  }

  localUsers.sort((a, b) => a.dist - b.dist);

  return localUsers[0];
};
