import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import {db} from "../../firebase";
import styles from './products.css';
import './products.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import {Helmet} from 'react-helmet';
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs) {
          setProducts(
            querySnapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
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
  
      <div style={{position: 'relative', height:'100vh', width:'100vw'}}>
        <Helmet>
    <title>Farma</title>
    <meta name="description" content="Produse pentru gradina" />
  </Helmet>
            <div className='upp'>
                {products.length} Produse
            
            </div>
            {mobile ? (
              <>

             <div className='p-container'>
              {
                products.map(product => (
                  <Product className="p-grid" key={product.id} product={product}/>
                ))
              }
            </div>
            </>
           ) : (
             <>
             <div className='p-container_mobile'>
              {
                products.map(product => (
                  <Product className="p-grid" key={product.id} product={product}/>
                ))
              }
            </div>
            <div className="search"><SearchBar/></div>
            </>
            )}
            
    </div>
  );
};

export default Products;
 