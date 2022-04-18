import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { db } from "../firebase";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ImageSRC from "../assets/images/black.jpg";
import Navbar from "../components/navbar/navbar";
import Input from "@mui/material/Input";
import { useCart } from "../hooks/UseCart";
import NavbarMobile from "../components/navbar/navbarMobile";
import { Helmet } from "react-helmet";
function ProductPage() {
  const { addProduct, increase } = useCart();

  const { id } = useParams();
  const [item, setItem] = useState({
    url: "",
    name: "",
    price: "",
    description: ""
  });
  const [quantity, setQuantity] = useState(1);
  const handleChange = (value) => {
    if (value < 1) return;

    if (item.stoc < value) return;
    else setQuantity(value);
  };
  useEffect(() => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs) {
          setItem(
            querySnapshot.docs
              .map((doc) => {
                return { ...doc.data(), id: doc.id };
              })
              .find((e) => e.id === id)
          );
        }
      });
  }, []);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  }, []);
  return (
    <>
      <Helmet>
        <title>{item.name}</title>
        <meta name="description" content={item.description} />
      </Helmet>
      {mobile ? <NavbarMobile /> : <Navbar />}
      <div className="app">
        <div className="details" key={item._id}>
          <div className="big-img">
            <img src={item.url} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{item.name}</h2>
            </div>

            <TextareaAutosize
              value={item.description}
              disabled
              style={{ width: "100%" }}
            />
            <div class="cable-config">
              <span>Cantitate</span>
              <br />
              <Input
                type="number"
                value={quantity}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
            </div>
            <div class="product-price">
              <span>{item.price * quantity} RON</span>
              {item.stoc > 0 ? (
                <button
                  onClick={() => {
                    addProduct(item);
                    for (let i = 1; i < quantity; ++i) increase(item);
                  }}
                  class="cart-btn"
                >
                  Adauga in cos
                </button>
              ) : (
                <button
                  disabled
                  onClick={() => addProduct(item)}
                  class="cart-btn"
                >
                  Nu mai avem in stoc
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductPage;
