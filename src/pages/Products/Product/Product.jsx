import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import ImageMoca from "../../../assets/image.jpg";
import { useHistory } from "react-router-dom";
import { useCart } from "../../../hooks/UseCart";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/utils";
const Product = ({ product, onAddToCart }) => {
  const history = useHistory();

  const { addProduct, cartItems, increase } = useCart();
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
  }, []);
  console.log(product);
  return (
    <>
      {mobile ? (
        <div className="card card-body" style={{ width: "80vw" }}>
          <img
            style={{
              display: "block",
              margin: "0 auto 10px",
              maxHeight: "200px",
              height: "200px"
            }}
            className="img-fluid"
            src={product.url}
            alt=""
          />
          <p>{product.name}</p>
          <h3 className="text-left">{formatNumber(product.price)}</h3>
          <div className="text-right">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-link btn-sm mr-2"
            >
              Detalii
            </Link>

            {isInCart(product) && (
              <button
                onClick={() => {
                  if (product.quantity + 1 <= product.stoc) increase(product);
                }}
                className="btn btn-outline-primary btn-sm"
              >
                Adauga mai mult
              </button>
            )}

            {!isInCart(product) && product.stoc > 0 ? (
              <button
                onClick={() => addProduct(product)}
                className="btn btn-primary btn-sm"
              >
                Adauga in cos
              </button>
            ) : (
              product.stoc <= 0 && (
                <button
                  disabled
                  onClick={() => addProduct(product)}
                  className="btn btn-primary btn-sm"
                >
                  Nu mai avem in stoc
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="card card-body" style={{ width: "20vw" }}>
          <img
            style={{
              display: "block",
              margin: "0 auto 10px",
              maxHeight: "200px",
              height: "200px"
            }}
            className="img-fluid"
            src={product.url}
            alt=""
          />
          <p>{product.name}</p>
          <h3 className="text-left">{formatNumber(product.price)}</h3>
          <div className="text-right">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-link btn-sm mr-2"
            >
              Detalii
            </Link>

            {isInCart(product) && (
              <button
                onClick={() => increase(product)}
                className="btn btn-outline-primary btn-sm"
              >
                Adauga mai mult
              </button>
            )}

            {!isInCart(product) && product.stoc > 0 ? (
              <button
                onClick={() => addProduct(product)}
                className="btn btn-primary btn-sm"
              >
                Adauga in cos
              </button>
            ) : (
              product.stoc <= 0 && (
                <button
                  disabled
                  onClick={() => addProduct(product)}
                  className="btn btn-primary btn-sm"
                >
                  Nu mai avem in stoc
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
