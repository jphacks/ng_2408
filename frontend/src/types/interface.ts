export interface Position {
  latitude: number;
  longitude: number;
}
export interface User {
  name: string;
  position: Position;
  groupId: number;
  addressHash: string;
}
export interface messageDownEventInterface {
  name: string;
  addressHash: string;
  format: string;
  message: string;
  isSelfMessage: boolean;
}

export interface initEventInterface {
  name: string;
  position: Position;
}

export interface updateEventInterface {
  name: string;
  addressHash: string;
}
