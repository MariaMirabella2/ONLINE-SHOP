import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CartProducts from "./CartProducts";
import { useCart } from "../../hooks/UseCart";
import { formatNumber } from "../../utils/utils";
import "bootswatch/dist/lux/bootstrap.min.css";
import NavbarMobile from "../../components/navbar/navbarMobile";
import Navbar from"../../components/navbar/navbar";
import { useHistory } from "react-router-dom";
import Pay from "../Pay";


const Cart = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } =
    useCart();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [productsForStripe, setProductsForStripe] = useState([]);
 
  
const [mobile, setMobile] = useState();
  useEffect(() => {

    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  })
  return (
    <>
    {mobile ? (
     
      <div>
         <NavbarMobile />
        <div className="text-center mt-5" style={{padding:'20px'}}>
          <h1>Cosul Tau</h1>
        </div>

        <div className="row no-gutters justify-content-center">
          <div className="col-sm-9 p-3">
            {cartItems.length > 0 ? (
              <CartProducts />
            ) : (
              <div className="p-3 text-center text-muted">
                Cosul tau este gol
              </div>
            )}
            {checkout && success && (
              <div className="p-3 text-center text-success">
                <p>Comanda plasta</p>
                <Link to="/" className="btn btn-outline-success btn-sm">
                  Cumpara mai mult
                </Link>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="col-sm-3 p-3">
              <div className="card card-body">
                <p className="mb-1">Numarul de Produse</p>
                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                <p className="mb-1">Total de Plata</p>
                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                <hr className="my-4" />
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={(e) => {
                      history.push('/checkout')
                    }}
                  >
                    Cumpara
                  </button>
                  <button
                    type="button"
                    className="btn btn-outlineprimary btn-sm"
                    onClick={clearCart}
                  >
                    Sterge cosul
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  ) : (
<div>
  <Navbar/>
<div className="text-center mt-5" style={{padding:'20px'}}>
          <h1>Cosul Tau</h1>
        </div>

        <div className="row no-gutters justify-content-center">
          <div className="col-sm-9 p-3">
            {cartItems.length > 0 ? (
              <CartProducts />
            ) : (
              <div className="p-3 text-center text-muted">
                Cosul tau este gol
              </div>
            )}
            {checkout && success && (
              <div className="p-3 text-center text-success">
                <p>Comanda plasta</p>
                <Link to="/" className="btn btn-outline-success btn-sm">
                  Cumpara mai mult
                </Link>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="col-sm-3 p-3">
              <div className="card card-body">
                <p className="mb-1">Numarul de Produse</p>
                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                <p className="mb-1">Total de Plata</p>
                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                <hr className="my-4" />
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={(e) => {
                      history.push('/checkout')
                    }}
                  >
                    Cumpara
                  </button>
                  <button
                    type="button"
                    className="btn btn-outlineprimary btn-sm"
                    onClick={clearCart}
                  >
                    Sterge cosul
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
</div>
  )}
    </>
  );
};

export default Cart;
