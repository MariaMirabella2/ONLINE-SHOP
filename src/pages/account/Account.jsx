import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Typography } from "@material-ui/core";
import "../../components/sidebar/Sidebar.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckoutItem from "../Checkout/form_components/CheckoutItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { DataUsageTwoTone } from "@material-ui/icons";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

function Account() {
  const [mobile, setMobile] = useState(false);
  const [userData, setUserData] = useState({});
  const [myOrders, setMyOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [statusOrder, setStatusOrder] = useState("plasata");
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
                  <h1 style={{ textTransform: "capitalize" }}>Datele tale</h1>
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
                            {userData.secondName}
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
                            {userData.firstName}
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
                            {userData.county}
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
                            {userData.city}
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
                            {userData.street}
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
                            {userData.postalCode}
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
                            {userData.phone}
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
                      onClick={() => {
                        history.push("/my-accountedit");
                      }}
                      style={{ textTransform: "none" }}
                    >
                      Modifica
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
              <div
                align="center"
                style={{ width: "100%", textTransform: "none" }}
              >
                <a
                  style={{
                    fontFamily: "Times  new Roman",
                    fontSize: "30px",
                    color: "#000000",
                    background: "none"
                  }}
                >
                  <h1 style={{ textTransform: "capitalize" }}>
                    Comenzile tale
                  </h1>
                </a>
                {myOrders.length === 0 ? (
                  <p> Nu aveti comenzi momentan</p>
                ) : (
                  myOrders.map((order, index) => {
                    return (
                      <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography
                            sx={{
                              width: "50%",
                              flexShrink: 0,
                              alignItems: "right"
                            }}
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            ID comanda <br />#{order.id}
                          </Typography>
                          <Typography
                            sx={{ width: "33%", flexShrink: 0 }}
                            style={{
                              fontFamily: "Times  new Roman",
                              paddingLeft: "10%"
                            }}
                          >
                            {order.status === "plasata" && (
                              <Typography>
                                Status{" "}
                                <Typography style={{ color: "red" }}>
                                  nefinalizata
                                </Typography>
                              </Typography>
                            )}
                            {order.status === "livrata" && (
                              <Typography>
                                Status{" "}
                                <Typography style={{ color: "green" }}>
                                  finalizata
                                </Typography>
                              </Typography>
                            )}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{ backgroundColor: "#EEEEEE" }}
                        >
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Produsele:{" "}
                            </h4>
                          </Typography>
                          {order.items.map((item) => {
                            return <CheckoutItem product={item} />;
                          })}
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Client:{" "}
                            </h4>
                            <ul style={{ alignText: "center" }}>
                              <li style={{ display: "block" }}>
                                Prenume: {order.firstName}
                              </li>
                              <li style={{ display: "block" }}>
                                Nume de familie: {order.secondName}
                              </li>
                              <li style={{ display: "block" }}>
                                Email: {order.email}
                              </li>
                            </ul>
                          </Typography>
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Data plasarii
                            </h4>
                            <ul style={{ alignText: "center" }}>
                              <li style={{ display: "block" }}>
                                {" "}
                                {getStringDate(order.dataOrder)}
                              </li>
                            </ul>
                          </Typography>
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Adresa de livrare:{" "}
                            </h4>
                            <ul style={{ alignText: "center" }}>
                              <li style={{ display: "block" }}>
                                Judet: {order.county}
                              </li>
                              <li style={{ display: "block" }}>
                                Oras: {order.city}
                              </li>
                              <li style={{ display: "block" }}>
                                Strada si numarul: {order.street}
                              </li>
                              <li style={{ display: "block" }}>
                                Cod postal: {order.postalCode}
                              </li>
                            </ul>
                          </Typography>
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Total: {order.total} RON
                            </h4>
                          </Typography>
                          <Typography>
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize",
                                fontFamily: "Times  new Roman"
                              }}
                            >
                              Metoda de plata: {order.paymentMethod}
                            </h4>
                          </Typography>
                          <br />
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                )}
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
                  <h1 style={{ textTransform: "capitalize" }}>Datele tale</h1>
                </a>
                <div style={{ marginBottom: "30px" }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow align="center">
                          <StyledTableCell
                            style={{
                              fontFamily: "Times  new Roman",
                              textTransform: "capitalize"
                            }}
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
                            {userData.secondName}
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
                            {userData.firstName}
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
                            {userData.county}
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
                            {userData.city}
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
                            {userData.street}
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
                            {userData.postalCode}
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
                            {userData.phone}
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
                      onClick={() => {
                        history.push("/my-accountedit");
                      }}
                      style={{ textTransform: "none" }}
                    >
                      Modifica
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
              <div
                align="center"
                style={{ width: "50%", textTransform: "none" }}
              >
                <a
                  style={{
                    fontFamily: "Times  new Roman",
                    fontSize: "30px",
                    color: "#000000",
                    background: "none"
                  }}
                >
                  <h1 style={{ textTransform: "capitalize" }}>
                    Comenzile tale
                  </h1>
                </a>
                {myOrders.length === 0 ? (
                  <p> Nu aveti comenzi momentan</p>
                ) : (
                  myOrders.map((order, index) => {
                    return (
                      <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography
                            sx={{ width: "33%", flexShrink: 0 }}
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            ID comanda <br />#{order.id}
                          </Typography>
                          <Typography
                            sx={{ width: "33%", flexShrink: 0 }}
                            style={{
                              paddingLeft: "5%",
                              paddingRight: "5%",
                              fontFamily: "Times new Roman"
                            }}
                          >
                            Data plasarii <br />{" "}
                            {getStringDate(order.dataOrder)}
                          </Typography>
                          <Typography
                            sx={{ width: "33%", flexShrink: 0 }}
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            {order.status === "plasata" && (
                              <Typography style={{ alignItems: "right" }}>
                                Status <br />
                                <Typography style={{ color: "red" }}>
                                  nefinalizata
                                </Typography>
                              </Typography>
                            )}
                            {order.status === "livrata" && (
                              <Typography style={{ alignItems: "right" }}>
                                Status <br />{" "}
                                <Typography style={{ color: "green" }}>
                                  {" "}
                                  finalizata{" "}
                                </Typography>
                              </Typography>
                            )}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{ backgroundColor: "#EEEEEE" }}
                        >
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Produsele:
                            </h4>
                          </Typography>
                          {order.items.map((item) => {
                            return <CheckoutItem product={item} />;
                          })}
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Client:
                            </h4>
                            <ul style={{ alignText: "center" }}>
                              <li style={{ display: "block" }}>
                                {" "}
                                Prenume : {order.firstName}
                              </li>
                              <li style={{ display: "block" }}>
                                Nume de Familie :{order.secondName}
                              </li>
                              <li style={{ display: "block" }}>
                                Email : {order.email}
                              </li>
                            </ul>
                          </Typography>
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Adresa de livrare:
                            </h4>
                            <ul style={{ alignText: "center" }}>
                              <li style={{ display: "block" }}>
                                {" "}
                                Judet : {order.county}
                              </li>
                              <li style={{ display: "block" }}>
                                Oras :{order.city}
                              </li>
                              <li style={{ display: "block" }}>
                                Strada si Numarul : {order.street}
                              </li>
                              <li style={{ display: "block" }}>
                                Cod Postal :{order.postalCode}
                              </li>
                            </ul>
                          </Typography>
                          <Typography
                            style={{ fontFamily: "Times  new Roman" }}
                          >
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize"
                              }}
                            >
                              Total: {order.total} RON
                            </h4>
                          </Typography>
                          <Typography>
                            <h4
                              style={{
                                alignText: "center",
                                textTransform: "capitalize",
                                fontFamily: "Times  new Roman"
                              }}
                            >
                              Plata: {order.paymentMethod}
                            </h4>
                          </Typography>
                          <br />
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
