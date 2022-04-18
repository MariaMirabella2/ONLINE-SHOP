import React,{useState} from 'react'
import "./Sidebar.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
function SidebarMobile() {
    const filters = ["Red", "Blue", "Teal"];
    const [showFilter, setShowFilter] = useState(false);
    return (
      <>
       
      <div style={{paddingTop: "80px",paddingLeft:'5px'}}>
      <Button  endIcon={<MenuIcon/>} style={{color:'#12523F'}} onClick={()=>{setShowFilter(!showFilter)}}>Filtreaza</Button>
        {showFilter && (        <div style={{paddingTop: "10px",paddingLeft:'5px'}}>
        <FormControl component="fieldset">

     
        {filters.map((e) => {return(  <FormControlLabel control={<Checkbox defaultChecked />} label={e} />)})}
    </FormControl>
    </div>
    
)}
</div>
        </> 
        )
}

export default SidebarMobile
