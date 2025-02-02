import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./NestedModal.module.scss";
import { Position } from "@/types/interface";

interface NestedModalProps {
  initWebSocket: () => void;
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  position: Position | null;
}

export default function NestedModal({
  initWebSocket,
  setModalClosed,
  setName,
  name,
  position,
}: NestedModalProps) {
  const [open, setOpen] = React.useState(true);

  //モーダルを閉じる
  const handleClose = () => {
    setOpen(false);
    setModalClosed((prev) => !prev);
    initWebSocket();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  //エンターキーで名前決定
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name !== "" && position !== null) {
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
            width: "min(90vw, 600px)",
            boxSizing: "border-box",
            padding: "16px 22px 15px",
            border: "none",
            borderRadius: "15px",
          }}
        >
          <h3 id="parent-modal-title" style={{ marginBottom: "0.5em" }}>
            ニックネームを入力してください
          </h3>
          <p style={{ color: "#757575", margin: 0 }}>
            メッセージ画面では名前の横にユーザー固有IDが付与されます
          </p>
          <TextField
            label="Nickname"
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            fullWidth
            margin="normal"
          />
          <p style={{ color: "#757575", margin: 0 }}>ex. お名前 #a1b2</p>
          <div className={styles.modalButtonContainer}>
            {position === null && (
              <p style={{ color: "#ff2222", fontSize: "12px" }}>
                位置情報が取得できませんでした。
                <br />
                位置情報の取得を許可するか、別のブラウザをお試しください。
              </p>
            )}
            <Button
              onClick={handleClose}
              disabled={name === "" || position === null}
            >
              接続
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
