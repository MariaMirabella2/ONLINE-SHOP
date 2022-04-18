import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { useCart } from "../hooks/UseCart";
import { useAuth } from "../contexts/AuthContext";
import NavbarMobile from "../components/navbar/navbarMobile";
function CheckoutSuccess() {
  const { handleCheckout } = useCart();
  const { currentUser } = useAuth();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  }, []);
  useEffect(() => {
    handleCheckout(currentUser);
  }, []);
  return (
    <div>
      {mobile ? (
        <>
          <NavbarMobile />{" "}
          <div
            className="p-3 text-center text-success"
            style={{ marginTop: "20%" }}
          >
            <p>Comanda plasta</p>
            <Link to="/" className="btn btn-outline-success btn-sm">
              Cumpara mai mult
            </Link>
          </div>
        </>
      ) : (
        <>
          <Navbar />{" "}
          <div className="p-3 text-center text-success">
            <p>Comanda plasta</p>
            <Link to="/" className="btn btn-outline-success btn-sm">
              Cumpara mai mult
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutSuccess;
