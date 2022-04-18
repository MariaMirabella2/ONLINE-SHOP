import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Typography
} from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import { ShoppingCart } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useLocation } from "react-router-dom";
import SearchPopUp from "../popupsearch/SearchPopUp";
import useStyles from "./Style";
import StoreIcon from "@mui/icons-material/Store";
import { useCart } from "../../hooks/UseCart";
import { useAuth } from "../../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import { db } from "../../firebase";

const NavbarMobile = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState(false);
  useEffect(async () => {
    var docRef = db.collection("users").doc(currentUser.uid);
    console.log(currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          if (doc.data().admin) setAdmin(true);
          console.log(doc.data());
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { addProduct, cartItems, increase, itemCount } = useCart();
  return (
    <>
      <SearchPopUp open={open} handleClose={handleClose} />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.button}>
            {currentUser ? (
              <>
                <Button
                  endIcon={<StoreIcon />}
                  component={Link}
                  to="/"
                  color="black"
                  size="small"
                  style={{ textTransform: "none" }}
                ></Button>
                <IconButton component={Link} to="/login" color="inherit">
                  <Typography
                    component={Link}
                    to="/my-account"
                    variant="h6"
                    className={classes.title}
                    color="black"
                  >
                    <PersonIcon />
                  </Typography>
                </IconButton>
                <IconButton
                  component={Button}
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  <SearchIcon style={{ fill: "black" }} />
                </IconButton>
                <Button
                  component={Link}
                  to="/cart"
                  color="black"
                  size="small"
                  aria-label="Show cart items"
                  style={{ textTransform: "none" }}
                >
                  <Badge badgeContent={itemCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </Button>
                {admin === true && (
                  <>
                    <Button
                      component={Link}
                      to="/orders"
                      color="black"
                      size="small"
                      aria-label="admin"
                      style={{ textTransform: "none" }}
                    >
                      <FilterFramesIcon />
                    </Button>
                  </>
                )}{" "}
                <Button
                  endIcon={<LogoutIcon />}
                  component={Link}
                  to="/"
                  color="black"
                  size="small"
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                ></Button>
              </>
            ) : (
              <>
                <Button
                  endIcon={<StoreIcon />}
                  component={Link}
                  to="/"
                  color="black"
                  size="small"
                  style={{ textTransform: "none" }}
                ></Button>
                <IconButton component={Link} to="/login" color="inherit">
                  <Typography
                    component={Link}
                    to="/login"
                    variant="h6"
                    className={classes.title}
                    color="black"
                  >
                    <PersonIcon />
                  </Typography>
                </IconButton>
                <IconButton
                  color="black"
                  component={Button}
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  <SearchIcon style={{ fill: "black" }} />
                </IconButton>
                <Button
                  component={Link}
                  to="/cart"
                  color="black"
                  size="small"
                  aria-label="Show cart items"
                  style={{ textTransform: "none" }}
                >
                  <Badge badgeContent={itemCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavbarMobile;
