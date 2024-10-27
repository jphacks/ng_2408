import React, { useState } from "react";
import UserListModal from "../UserListModal/UserListModal";
import styles from "./UserList.module.scss";
import { IconButton, Badge } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { updateEventInterface } from "@/types/interface";
interface UserListProps {
  users: updateEventInterface[];
}
export default function UserList({ users }: UserListProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div className={styles.userListContainer}>
      <UserListModal
        userNames={users.map(
          (user) => user.name + " #" + user.addressHash.slice(0, 4)
        )}
        modalOpen={open}
        setModalOpen={setOpen}
      />
      <IconButton onClick={handleClick} style={{ paddingTop: "13px" }}>
        <Badge badgeContent={users.length} color="secondary">
          <PersonIcon />
        </Badge>
      </IconButton>
    </div>
  );
}
