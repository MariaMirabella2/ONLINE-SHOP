import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextareaAutosize } from "@mui/core";
import Button from "@mui/material/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "40vh",
  p: 4,
};
function DescriptionModal({
  open,
  product,
  setOpen,
  filed,
  index,
  handleChange,
}) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ display: "block", alignText: "center" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ alignText: "center" }}
        >
          Modifica Descrierea - {product?.name}
        </Typography>
        <TextareaAutosize
          defaultValue={product?.description}
          style={{ width: "100%", height: "80%", overflow: "scroll" }}
          onChange={(e) => {
            handleChange(filed, e.target.value, index);
          }}
        />
        <Button variant="contained" color="success" onClick={handleClose}>
          Salveaza
        </Button>
      </Box>
    </Modal>
  );
}

export default DescriptionModal;
