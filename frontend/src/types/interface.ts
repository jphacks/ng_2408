export interface Position {
  latitude: number;
  longitude: number;
}

export interface User {
  name: string;
  position: Position;
  groupId: number;
}

export interface MessageInterface {
  senderName: string;
  addressHash: string;
  format: string;
  message: string;
  isSelfMessage: boolean;
}
