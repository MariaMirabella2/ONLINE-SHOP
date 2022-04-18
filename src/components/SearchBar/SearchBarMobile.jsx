import React, { useState,useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {db} from  '../../firebase';

function SearchBarMobile({ placeholder }) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs) {
          setData(
            querySnapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        }
      });
  }, []);
  const handleFilter = (event) => { 
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter(value =>value.name.toLowerCase().includes(searchWord.toLowerCase()));
    if (searchWord === "") {
      setFilteredData([]);
    } else {
     
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div  >
      <div >
        <input
          type="text"
          placeholder={"Cauta Produse"}
          value={wordEntered}
          onChange={handleFilter}
          style={{border: '1px solid',width:'100%',height:'40px'}}
          
        />
        
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) =>
           
              (<a className="dataItem" href={`/product/${value.id}`} target="_blank">
                <p>{value.name} </p>
              </a>)
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBarMobile;
