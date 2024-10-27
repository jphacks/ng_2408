import React from "react";

interface UserListProps {
  userNames: string[];
}
export default function UserList({ userNames }: UserListProps) {
  return (
    <div>
      <a>{userNames.length}</a>
    </div>
  );
}
