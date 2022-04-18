/* import React, { useState } from "react";
import "../components/sidebar/Sidebar.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
function AddProduct() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [units, setUnits] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const filters = ["Red", "Blue", "Teal"];
  return (
    <section id="sidebar">
      <FormControl component="fieldset">
        <FormLabel component="legend">Filtreaza</FormLabel>
        {filters.map((e) => {
          return (
            <FormControlLabel control={<Checkbox defaultChecked />} label={e} />
          );
        })}
        <FormLabel component="legend">Adauga produse noi</FormLabel>
        <label>
          Poza Produsului {"      "}
          <input
            type="file"
            value={file}
            onChange={(e) => {
              setFile(e.event.target[0]);
            }}
          />
        </label>

        <label>
          Numele Produsului{"      "}
          <input
            type="text"
            name="numele"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Stocul disponibil{"      "}
          <input
            type="number"
            name="stoc"
            value={units}
            onChange={(e) => {
              setUnits(e.target.vale);
            }}
          />
        </label>
        <label>
          Pretul per bucata{"      "}
          <input
            type="number"
            name="pret"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>
        <label>
          Descrierea Produsului{"      "}
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
      </FormControl>
    </section>
  );
}

export default AddProduct;*/
