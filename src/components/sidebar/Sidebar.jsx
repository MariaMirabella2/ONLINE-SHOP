import React from "react";
import "./Sidebar.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
function Sidebar() {
  const filters = ["Red", "Blue", "Teal"];
  
  return (
    <section id="sidebar">
       <FormControl component="fieldset">
      <FormLabel component="legend">Filtreaza</FormLabel>
       

     
        {filters.map((e) => {return(  <FormControlLabel control={<Checkbox defaultChecked />} label={e} />)})}
    </FormControl>
    </section>
  );
}

export default Sidebar;
