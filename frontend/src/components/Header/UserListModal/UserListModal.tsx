import * as React from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import styles from "./UserListModal.module.scss";

interface UserListModalProps {
  userNames: string[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserListModal({
  userNames,
  modalOpen,
  setModalOpen,
}: UserListModalProps) {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className={styles.modalBox}
          style={{
            width: "min(90vw, 300px)",
            boxSizing: "border-box",
            padding: "16px 22px 15px",
            border: "none",
            borderRadius: "15px",
            backgroundColor: "white",
            margin: "auto",
          }}
        >
          <Typography variant="h6" id="user-list-modal-title">
            ユーザーリスト
          </Typography>
          <List
            style={{
              overflowWrap: "break-word",
            }}
          >
            {userNames.map((user, index) => (
              <ListItem key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <ListItemAvatar>
                  <Avatar>{user.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
          <Button className={styles.modalButton} onClick={handleClose}>
            閉じる
          </Button>
        </Box>
      </Modal>
    </>
  );
}
