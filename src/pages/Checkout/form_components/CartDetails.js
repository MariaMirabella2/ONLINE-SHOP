import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import { useCart } from "../../../hooks/UseCart";
import { formatNumber } from "../../../utils/utils";
import "bootswatch/dist/lux/bootstrap.min.css";
import CheckoutProducts from './CheckoutProducts'
function CartDetails({handleBuy}) {
  

  
    const { total} = useCart();
    
    return (
  
       <div style={{backgroundColor:'#EEEEEE'}}>
              <div style={{backgroundColor:'red'}}>
                <CheckoutProducts/>
              </div>    
                   
                <div style={{width:'100%',display:'flex', alignItems: 'center', justifyContent:'center'}}>
                  Total de plata :  {total} RON
              </div>
        
        <Button className="mt-4" color="primary" block onClick={()=>{handleBuy()}}>
        TERMINA COMANDA
        </Button>
        
     </div>
    );
 
}
export default CartDetails;
