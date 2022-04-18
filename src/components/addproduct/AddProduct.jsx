import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Button from "@mui/material/Button";
import { db } from "../../firebase";
import { st } from "../../firebase";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { grey, red } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography
} from "@material-ui/core";
function AddProduct({ products, SetProducts, lastId, setLastId, setOpen }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [units, setUnits] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    let urlImage;

    const storage = st;
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            urlImage = url;
            console.log(url);
            db.collection("products")
              .add({
                name: name,
                stoc: units,
                price: price,
                description: description,
                url: urlImage
              })
              .then((docRef) => {
                SetProducts([
                  ...products,
                  {
                    name: name,
                    stoc: units,
                    price: price,
                    description: description,
                    id: docRef.id,
                    image: urlImage
                  }
                ]);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          });
      }
    );

    setOpen(false);
  }
  const Input = styled("input")({
    display: "none"
  });
  const blackTheme = createTheme({ palette: { primary: { main: grey[900] } } });
  const redTheme = createTheme({ palette: { primary: { main: red[600] } } });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        height: "100%",
        background: "#ffffff"
      }}
    >
      <div align="right" style={{ background: "#ffffff" }}>
        {" "}
        <IconButton
          size="small"
          onClick={() => {
            handleClose();
          }}
        >
          {" "}
          <CancelIcon style={{ fill: "red" }} />{" "}
        </IconButton>{" "}
      </div>

      <div
        style={{
          display: "flex",
          alignText: "center",
          background: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "100%"
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Adauga produse noi</FormLabel>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <ThemeProvider theme={blackTheme}>
              <Button
                variant="outlined"
                endIcon={<AddAPhotoIcon />}
                component="span"
                fullWidth
                color="primary"
                style={{ textTransform: "none" }}
              >
                Adauga Poza
              </Button>
            </ThemeProvider>
          </label>
          <ThemeProvider theme={blackTheme}>
            <TextField
              label="Numele produsului"
              value={name}
              placeholder="Nume"
              fullWidth
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              size="small"
              style={{ marginTop: "10px" }}
            />
          </ThemeProvider>
          <label>
            <ThemeProvider theme={blackTheme}>
              <TextField
                label="Stoc disponibil"
                value={units}
                placeholder="Stoc"
                fullWidth
                required
                onChange={(e) => {
                  setUnits(e.target.value);
                }}
                size="small"
                style={{ marginTop: "10px" }}
              />
            </ThemeProvider>
          </label>
          <label>
            <ThemeProvider theme={blackTheme}>
              <TextField
                label="Pret/buc"
                value={price}
                placeholder="Pret"
                fullWidth
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                size="small"
                style={{ marginTop: "10px" }}
              />
            </ThemeProvider>
          </label>
          <label>
            <ThemeProvider theme={blackTheme}>
              <TextareaAutosize
                minRows={4}
                maxRows={4}
                placeholder="Descriere"
                fullWidth
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                style={{ marginTop: "10px", overflow: "scroll" }}
              />
            </ThemeProvider>
          </label>
          <ThemeProvider theme={blackTheme}>
            <Button
              type="submit"
              fullWidth
              style={{ marginTop: "10px", textTransform: "none" }}
              variant="outlined"
              endIcon={<AddTaskIcon style={{ fill: "green" }} />}
              onClick={() => {
                handleSubmit();
              }}
            >
              Adauga produsul
            </Button>
          </ThemeProvider>
        </FormControl>
      </div>
    </div>
  );
}

export default AddProduct;
