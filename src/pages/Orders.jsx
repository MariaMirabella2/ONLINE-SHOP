import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckoutItem from "../pages/Checkout/form_components/CheckoutItem";
import { Input } from "reactstrap";
import Button from "@mui/material/Button";
import NavbarMobile from "../components/navbar/navbarMobile";
function Orders() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [mobile, setMobile] = useState(false);
  const [orders, setOrders] = useState([]);
  const [statusOrder, setStatusOrder] = useState("plasata");
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      "Dec",
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
  useEffect(() => {
    db.collection("orders")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs) {
          setOrders(
            querySnapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
          console.log(orders);
        }
      });
  }, []);

  const handleChangeStatus = async (orderId) => {
    await db.collection("orders").doc(orderId).update({ status: statusOrder });
    history.go(0);
  };
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  }, []);
  useEffect(() => {
    if (!currentUser) {
      history.push("/");
      return;
    }
    var docRef = db.collection("users").doc(currentUser.uid);
    console.log(currentUser.uid);

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
  return (
    <>
      {mobile ? (
        <>
          <NavbarMobile />
          <div style={{ margin: "auto", marginTop: "5%" }}>
            <h1 style={{ alignText: "center", marginLeft: "45%" }}>Comenzi</h1>

            {orders.map((order, index) => {
              return (
                <div>
                  <Accordion
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{
                          width: "50%",
                          flexShrink: 0,
                          alignItems: "right",
                        }}
                        style={{ fontFamily: "Times  new Roman" }}
                      >
                        ID comanda <br />#{order.id}
                      </Typography>
                      <Typography
                        sx={{ width: "33%", flexShrink: 0 }}
                        style={{
                          fontFamily: "Times  new Roman",
                          paddingLeft: "10%",
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
                    <AccordionDetails style={{ backgroundColor: "#EEEEEE" }}>
                      <Typography>
                        <h6 style={{ alignText: "center" }}>Produsele:</h6>
                      </Typography>
                      {order.items.map((item) => {
                        return <CheckoutItem product={item} />;
                      })}
                      <Typography>
                        <h6 style={{ alignText: "center" }}>Client:</h6>
                        <ul>
                          <li> Prenume: {order.firstName}</li>
                          <li>Nume de Familie :{order.secondName}</li>
                          <li>Email: {order.email}</li>
                        </ul>
                      </Typography>
                      <Typography>
                        <h6 style={{ alignText: "center" }}>
                          Adresa de livrare:
                        </h6>
                        <ul>
                          <li> Judet: {order.county}</li>
                          <li>Oras :{order.city}</li>
                          <li>Strada si Numarul: {order.street}</li>
                          <li>Cod Postal :{order.postalCode}</li>
                        </ul>
                      </Typography>
                      <Typography>
                        <h4 style={{ alignText: "center" }}>
                          Total: {order.total} RON
                        </h4>
                      </Typography>
                      <Typography>
                        <h6 style={{ alignText: "center" }}>
                          Plata: {order.paymentMethod}
                        </h6>
                      </Typography>
                      <br />
                      <Typography>
                        <h6 style={{ alignText: "center" }}>
                          Schimba Statusul Comenzii
                        </h6>

                        {order.status === "livrata" && (
                          <Input
                            style={{ width: "100%" }}
                            id="status"
                            name="select"
                            type="select"
                            value={statusOrder}
                            onChange={(e) => {
                              setStatusOrder(e.target.value);
                            }}
                          >
                            <option value="livrata">livrata</option>
                            <option value="plasata">nefinalizata</option>
                          </Input>
                        )}
                        {order.status === "plasata" && (
                          <Input
                            style={{ width: "100%" }}
                            id="status"
                            name="select"
                            type="select"
                            value={statusOrder}
                            onChange={(e) => {
                              setStatusOrder(e.target.value);
                            }}
                          >
                            <option value="plasata">nefinalizata</option>
                            <option value="livrata">livrata</option>
                          </Input>
                        )}

                        <Button
                          onClick={() => {
                            handleChangeStatus(order.id);
                          }}
                        >
                          Actualizeaza Statusul
                        </Button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <Navbar />

          <div style={{ margin: "auto", marginTop: "5%" }}>
            <h1 style={{ alignText: "center", marginLeft: "45%" }}>Comenzi</h1>

            {orders.map((order, index) => {
              return (
                <div>
                  <Accordion
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        #{order.id}
                      </Typography>
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Data Plasarii : {getStringDate(order.dataOrder)}
                      </Typography>

                      {order.status === "plasata" && (
                        <Typography
                          style={{ paddingLeft: "25%" }}
                          sx={{ color: "red" }}
                        >
                          nefinalizata
                        </Typography>
                      )}
                      {order.status === "livrata" && (
                        <Typography
                          style={{ paddingLeft: "25%" }}
                          sx={{ color: "green" }}
                        >
                          finalizata
                        </Typography>
                      )}
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: "#EEEEEE" }}>
                      <Typography>
                        <h6 style={{ alignText: "center" }}>Produsele:</h6>
                      </Typography>
                      {order.items.map((item) => {
                        return <CheckoutItem product={item} />;
                      })}
                      <Typography>
                        <h6 style={{ alignText: "center" }}>Client:</h6>
                        <ul>
                          <li> Prenume : {order.firstName}</li>
                          <li>Nume de Familie :{order.secondName}</li>
                          <li>Email : {order.email}</li>
                        </ul>
                      </Typography>
                      <Typography>
                        <h6 style={{ alignText: "center" }}>
                          Adresa de livrare:
                        </h6>
                        <ul>
                          <li> Judet : {order.county}</li>
                          <li>Oras :{order.city}</li>
                          <li>Strada si Numarul : {order.street}</li>
                          <li>Cod Postal :{order.postalCode}</li>
                        </ul>
                      </Typography>
                      <Typography>
                        <h4 style={{ alignText: "center" }}>
                          Total: {order.total} RON
                        </h4>
                      </Typography>
                      <Typography>
                        <h6 style={{ alignText: "center" }}>
                          Plata: {order.paymentMethod}
                        </h6>
                      </Typography>
                      <br />
                      <Typography>
                        <h6 style={{ alignText: "center" }}>
                          Schimba Statusul Comenzii
                        </h6>

                        {order.status === "livrata" && (
                          <Input
                            style={{ width: "15%" }}
                            id="status"
                            name="select"
                            type="select"
                            value={statusOrder}
                            onChange={(e) => {
                              setStatusOrder(e.target.value);
                            }}
                          >
                            <option value="livrata">livrata</option>
                            <option value="plasata">nefinalizata</option>
                          </Input>
                        )}
                        {order.status === "plasata" && (
                          <Input
                            style={{ width: "15%" }}
                            id="status"
                            name="select"
                            type="select"
                            value={statusOrder}
                            onChange={(e) => {
                              setStatusOrder(e.target.value);
                            }}
                          >
                            <option value="plasata">nefinalizata</option>
                            <option value="livrata">livrata</option>
                          </Input>
                        )}

                        <Button
                          onClick={() => {
                            handleChangeStatus(order.id);
                          }}
                        >
                          Actualizeaza Statusul
                        </Button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Orders;
