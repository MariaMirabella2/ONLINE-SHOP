import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Button,
  Typography
} from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import { ShoppingCart } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import useStyles from "./Style";
import { useAuth } from "../../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import firebase from "../../firebase";
import StoreIcon from "@mui/icons-material/Store";
import { useCart } from "../../hooks/UseCart";
import { db } from "../../firebase";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
const Navbar = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { itemCount } = useCart();
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
  return (
    <>
      {" "}
      <div style={{ alignItems: "center" }}>
        <AppBar position="relative" className={classes.appBar}>
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
                    size="large"
                    style={{ textTransform: "none" }}
                  >
                    Produsele noastre
                  </Button>
                  <Button
                    endIcon={<PersonIcon />}
                    component={Link}
                    to="/my-account"
                    color="black"
                    size="large"
                    style={{ textTransform: "none" }}
                  >
                    Contul meu
                  </Button>

                  <Button
                    endIcon={<LogoutIcon />}
                    component={Link}
                    to="/"
                    color="black"
                    size="large"
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                  >
                    Deconecteaza-te
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    endIcon={<StoreIcon />}
                    component={Link}
                    to="/"
                    color="black"
                    size="large"
                    style={{ textTransform: "none" }}
                  >
                    Produsele noastre
                  </Button>
                  <Button
                    endIcon={<PersonIcon />}
                    component={Link}
                    to="/login"
                    color="black"
                    size="large"
                    style={{ textTransform: "none" }}
                  >
                    Conecteaza-te
                  </Button>
                </>
              )}

              <Button
                component={Link}
                to="/cart"
                color="black"
                size="large"
                aria-label="Show cart items"
                style={{ textTransform: "none" }}
              >
                <Badge badgeContent={itemCount} color="secondary">
                  Cosul Tau <ShoppingCart />
                </Badge>
              </Button>
              {admin === true && (
                <>
                  <Button
                    component={Link}
                    to="/admin"
                    color="black"
                    size="large"
                    aria-label="admin"
                    style={{ textTransform: "none" }}
                  >
                    Administreaza <SettingsIcon />
                  </Button>
                  <Button
                    component={Link}
                    to="/orders"
                    color="black"
                    size="large"
                    aria-label="admin"
                    style={{ textTransform: "none" }}
                  >
                    Comnezi <FilterFramesIcon />
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
