import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DescriptionIcon from "@mui/icons-material/Description";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import { useEffect } from "react";
import { db } from "../firebase";
import Input from "@mui/material/Input";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import DescriptionModal from "../components/DescriptionModal/DescriptionModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 30,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [state, setState] = useState([]);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [curentIndex, setCurentIndex] = useState(0);
  const [product, setProduct] = useState({});
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
      return;
    }
    var docRef = db.collection("users").doc(currentUser.uid);
    // console.log(currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          if (!doc.data().admin) history.push("/");
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser]);

  useEffect(() => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs) {
          setState(
            querySnapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
          console.log(state);
        }
      });
  }, []);
  const handleChange = (field, value, index) => {
    let newArray = [...state];
    newArray[index][field] = value;
    setState(newArray);
    const docRef = db.collection("products").doc(newArray[index].id);
    const obj = {};
    obj[field] = value;
    docRef.update(newArray[index]);
  };
  const deleteProduct = (index) => {
    let newArray = [...state];
    const documentId = newArray[index].id;
    db.collection("products").doc(documentId).delete();
    newArray.splice(index, 1);
    setState(newArray);
  };
  return (
    <>
      <Navbar />
      <NavbarAdmin state={state} setState={setState} />
      <DescriptionModal
        open={descriptionModal}
        setDescrptionModal={setDescriptionModal}
        handleChange={handleChange}
        filed={"description"}
        setOpen={setDescriptionModal}
        index={curentIndex}
        product={product}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Produse</StyledTableCell>
              <StyledTableCell align="center">Descriere</StyledTableCell>
              <StyledTableCell align="center">Cantitate&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Pret&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Sterge&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <Input
                    type="text"
                    value={row.name}
                    onChange={(e) => {
                      handleChange("name", e.target.value, index);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    onClick={() => {
                      setCurentIndex(index);
                      setProduct(row);
                      setDescriptionModal(true);
                    }}
                  >
                    Descriere
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Input
                    type="number"
                    value={row.stoc}
                    onChange={(e) => {
                      handleChange("stoc", e.target.value, index);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Input
                    type="number"
                    value={row.price}
                    onChange={(e) => {
                      handleChange("price", e.target.value, index);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => deleteProduct(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
