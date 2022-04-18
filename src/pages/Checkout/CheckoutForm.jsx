import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import ContactInfo from "./form_components/ContactInfo";

import CartDetails from "./form_components/CartDetails";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navbar/navbar";
import { useCart } from "../../hooks/UseCart";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import NavbarMobile from "../../components/navbar/navbarMobile";
import {Helmet} from 'react-helmet'
function CheckoutForm() {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [phone, setPhone] = useState();
  const [postalCode, setPostalCode] = useState();
  const [email, setEmail] = useState();
  const [county, setCounty] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const stripe = useStripe();

  const [success, setSuccess] = useState(false);
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } =
    useCart();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [productsForStripe, setProductsForStripe] = useState([]);
  const [mobile, setMobile] = useState(false);
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
          setFirstName(doc.data().firstName);
          setSecondName(doc.data().secondName);
          setPhone(doc.data().phone);
          setPostalCode(doc.data().postalCode);
          setEmail(currentUser.email);
          setCounty(doc.data().county);
          setPostalCode(doc.data().postalCode);
          setCity(doc.data().city);
          setStreet(doc.data().street);

          console.log(doc.data());
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  useEffect(() => {
    const newArray = [];
    cartItems.forEach((item) => {
      newArray.push({
        price_data: {
          currency: "RON",
          unit_amount: parseInt(item.price) * 100,
          product_data: {
            name: item.name,
            images: [item.url],
          },
        },
        quantity: item.quantity,
      });
    });
    console.log(newArray);
    setProductsForStripe(newArray);
  }, [cartItems]);
  const history = useHistory();
  const handleBuy = async (event) => {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("secondName", secondName);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("postalCode", postalCode);
    localStorage.setItem("county", county);
    localStorage.setItem("city", city);
    localStorage.setItem("street", street);
    localStorage.setItem("paymentMethod", paymentMethod);
    if(!firstName || !secondName || !phone || !email || !postalCode || !county || !city || !street || !paymentMethod)
      return;
    if (paymentMethod === "card") {
      const body = { line_items: productsForStripe };
      const { id: sessionId } = await fetchFromAPI("checkouts", {
        body,
      });

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.log(error);
      }
    } else {
      history.push("/success");
    }
  };
  return (
    <>
     <Helmet>
    <title>Cumpara Farma</title>
    <meta name="description" content="Cumpara cele mai bune produse pentru gradina" />
  </Helmet>
      {mobile ? (
        <>
        <NavbarMobile />
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingTop:'20%',
        }}
      >
        <Container>
          <Row>
            <Col className="left-col-container" md="6">
              <ContactInfo
                firstName={firstName}
                setFirstName={setFirstName}
                secondName={secondName}
                setSecondName={setSecondName}
                phone={phone}
                setPhone={setPhone}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                email={email}
                setEmail={setEmail}
                city={city}
                setCity={setCity}
                street={street}
                setStreet={setStreet}
                county={county}
                setCounty={setCounty}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </Col>
            <Col className="right-col-container pb-4" md="6">
              <CartDetails handleBuy={handleBuy} />
            </Col>
          </Row>
        </Container>
      </div>
      </>
      ) : (
        <>
          <Navbar />{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "20%",
            }}
          >
            <Container>
              <Row>
                <Col className="left-col-container" md="6">
                  <ContactInfo
                    firstName={firstName}
                    setFirstName={setFirstName}
                    secondName={secondName}
                    setSecondName={setSecondName}
                    phone={phone}
                    setPhone={setPhone}
                    postalCode={postalCode}
                    setPostalCode={setPostalCode}
                    email={email}
                    setEmail={setEmail}
                    city={city}
                    setCity={setCity}
                    street={street}
                    setStreet={setStreet}
                    county={county}
                    setCounty={setCounty}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                </Col>
                <Col className="right-col-container pb-4" md="6">
                  <CartDetails handleBuy={handleBuy} />
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default CheckoutForm;
