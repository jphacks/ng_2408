export interface Position {
  latitude: number;
  longitude: number;
}

export interface User {
  name: string;
  position: Position;
  groupId: number;
}
