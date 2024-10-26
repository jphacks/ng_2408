import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./NestedModal.module.scss"; // スタイルモジュールをインポート

interface NestedModalProps {
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NestedModal({ setModalClosed }: NestedModalProps) {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState(""); // 名前の状態を追加

  const handleClose = () => {
    setOpen(false);
    setModalClosed((prev) => !prev);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={styles.modalBox}>
          <h2 id="parent-modal-title">Enter NickName</h2>
          <TextField
            label="nickname"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
          <Button className={styles.modalButton} onClick={handleClose}>
            送信
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
