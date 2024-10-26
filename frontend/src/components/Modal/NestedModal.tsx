import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./NestedModal.module.scss";

interface NestedModalProps {
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}

export default function NestedModal({
  setModalClosed,
  setName,
  name,
}: NestedModalProps) {
  const [open, setOpen] = React.useState(true);

  //モーダルを閉じる
  const handleClose = () => {
    setOpen(false);
    setModalClosed((prev) => !prev);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  //エンターキーで名前決定
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name !== "") {
      handleClose();
    }
  };
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className={styles.modalBox}
          style={{
            width: "90vw",
            boxSizing: "border-box",
            padding: "16px 22px 15px",
            border: "none",
            borderRadius: "15px",
          }}
        >
          <h3 id="parent-modal-title" style={{ marginBottom: "0.5em" }}>
            ニックネームを入力してください
          </h3>
          <TextField
            label="Nickname"
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            fullWidth
            margin="normal"
          />
          <Button
            className={styles.modalButton}
            onClick={handleClose}
            disabled={name === ""}
          >
            送信
          </Button>
        </Box>
      </Modal>
    </>
  );
}
