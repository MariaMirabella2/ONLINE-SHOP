import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { Link } from "react-router-dom";
import NavbarMobile from "../components/navbar/navbarMobile";
function CheckoutFailed() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  }, []);
  return (
    <div>
      <div>
        {mobile ? (
          <>
            <NavbarMobile />{" "}
            <div
              className="p-3 text-center text-failed"
              style={{ marginTop: "20%" }}
            >
              <p>Plata nu a functionat</p>
              <Link to="/cart" className="btn btn-outline-failed btn-sm">
                Mai Incearca
              </Link>
            </div>
          </>
        ) : (
          <>
            <Navbar />
            <div className="p-3 text-center text-failed">
              <p>Plata nu a functionat</p>
              <Link to="/cart" className="btn btn-outline-failed btn-sm">
                Mai Incearca
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutFailed;
