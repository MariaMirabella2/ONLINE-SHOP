import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Typography } from "@material-ui/core";
import "../../components/sidebar/Sidebar.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import NavbarMobile from "../../components/navbar/navbarMobile";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const blackTheme = createTheme({ palette: { primary: { main: grey[900] } } });
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function AccountEdit() {
  const [mobile, setMobile] = useState(false);
  const [userData, setUserData] = useState({});
  const [myOrders, setMyOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  }, []);
  useEffect(async () => {
    var docRef = db.collection("users").doc(currentUser.uid);
    console.log(currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          setUserData(doc.data());
          setFirstName(doc.data().firstName);
          setSecondName(doc.data().secondName);
          setCounty(doc.data().county);
          setCity(doc.data().city);
          setStreet(doc.data().street);
          setPostalCode(doc.data().postalCode);
          setPhone(doc.data().phone);
          console.log(doc.data());
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    const snapshot = await db.collection("orders").get();
    const allOrders = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setMyOrders(allOrders.filter((order) => order.userId === currentUser.uid));
  }, [currentUser]);
  console.log(myOrders);
  const getStringDate = (date) => {
    var a = new Date(date * 1000);
    console.log(date * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var DATE = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      DATE + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };
  const handleSave = async () => {
    var docRef = db.collection("users").doc(currentUser.uid);
    await docRef.update({
      firstName: firstName,
      secondName: secondName,
      phone: phone,
      county: county,
      city: city,
      street: street,
      postalCode: postalCode
    });
    history.push("/my-account");
  };
  return (
    <div>
      {" "}
      {mobile ? (
        <>
          <NavbarMobile />
          <div
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "60px",
              backgound: "#ffffff"
            }}
          >
            <div style={{}}>
              <div style={{ marginRight: "5%", width: "100%" }} align="center">
                <a
                  style={{
                    fontFamily: "Times  new Roman",
                    fontSize: "30px",
                    color: "#000000",
                    background: "none"
                  }}
                >
                  <h1>Datele tale</h1>
                </a>
                <div style={{ marginBottom: "30px" }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow align="center">
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Adresa
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            {" "}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Nume:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={secondName}
                              onChange={(e) => {
                                setSecondName(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Prenume:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={firstName}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Email:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            {currentUser.email}
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Judet:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={county}
                              onChange={(e) => {
                                setCounty(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Localitate:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Strada:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={street}
                              onChange={(e) => {
                                setStreet(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Cod postal:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={postalCode}
                              onChange={(e) => {
                                setPostalCode(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Numar de telefon:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <ThemeProvider theme={blackTheme}>
                    <Button
                      variant="contained"
                      endIcon={<SettingsIcon />}
                      component="span"
                      fullWidth
                      color="primary"
                      style={{ textTransform: "none" }}
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      Salveaza
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
              <div align="center" style={{ width: "100%" }}>
                <a
                  style={{
                    fontFamily: "Times  new Roman",
                    fontSize: "30px",
                    color: "#000000",
                    background: "none"
                  }}
                >
                  <h1>Comenzile tale</h1>
                </a>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow align="center">
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          ID comanda
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          Stadiul comenzii
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          Total plata
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myOrders.map((order) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell
                              style={{ fontFamily: "Times  new Roman" }}
                            >
                              #{order.id}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontFamily: "Times  new Roman" }}
                            >
                              {getStringDate(order.dataOrder)}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{
                                fontFamily: "Times  new Roman",
                                align: "center"
                              }}
                            >
                              {order.status}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontFamily: "Times  new Roman" }}
                            >
                              {order.total}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "60px",
              backgound: "#ffffff"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginRight: "5%", width: "50%" }} align="center">
                <a
                  style={{
                    fontFamily: "Times  new Roman",
                    fontSize: "30px",
                    color: "#000000",
                    background: "none"
                  }}
                >
                  <h1>Datele tale</h1>
                </a>
                <div style={{ marginBottom: "30px" }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow align="center">
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Adresa
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            {" "}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Nume:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={secondName}
                              onChange={(e) => {
                                setSecondName(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Prenume:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={firstName}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Email:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            {currentUser.email}
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Judet:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={county}
                              onChange={(e) => {
                                setCounty(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Localitate:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Strada:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={street}
                              onChange={(e) => {
                                setStreet(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Cod postal:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={postalCode}
                              onChange={(e) => {
                                setPostalCode(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            Numar de telefon:
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <Input
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <ThemeProvider theme={blackTheme}>
                    <Button
                      variant="contained"
                      endIcon={<SettingsIcon />}
                      component="span"
                      fullWidth
                      color="primary"
                      style={{ textTransform: "none" }}
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      Salveaza
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
              <div align="center" style={{ width: "50%" }}>
                <a
                  style={{
                    fontFamily: "Times  new Roman",
                    fontSize: "30px",
                    color: "#000000",
                    background: "none"
                  }}
                >
                  <h1>Comenzile tale</h1>
             
                </a>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow align="center">
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          ID comanda
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          Data
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          Stadiul comenzii
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontFamily: "Times  new Roman" }}
                        >
                          Total plata
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myOrders.map((order) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell
                              style={{ fontFamily: "Times  new Roman" }}
                            >
                              #{order.id}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontFamily: "Times  new Roman" }}
                            >
                              {getStringDate(order.dataOrder)}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{
                                fontFamily: "Times  new Roman",
                                align: "center"
                              }}
                            >
                              {order.status}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontFamily: "Times  new Roman" }}
                            >
                              {order.total}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountEdit;
