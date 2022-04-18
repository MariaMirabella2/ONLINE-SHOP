import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography
} from "@material-ui/core";
import Modal from "@mui/material/Modal";
import AddProduct from "../addproduct/AddProduct";
import { ShoppingCart } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import useStyles from "./Style";
import BookData from "../data.json";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Button from "@mui/material/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "35%",
  height: "50%",
  background: "#ffffff"
};

const Navbar = ({ state, setState }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  return (
    <>
      <Modal open={open} onClose={handleClose} style={style}>
        <AddProduct products={state} SetProducts={setState} setOpen={setOpen} />
      </Modal>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.button}>
            <Typography
              onClick={() => {
                handleOpen();
              }}
              variant="h6"
              className={classes.title}
              color="black"
            >
              <AddBusinessIcon />
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
