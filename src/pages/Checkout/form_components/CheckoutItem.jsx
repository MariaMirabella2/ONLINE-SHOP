
  
import React from 'react';

import { useCart } from '../../../hooks/UseCart';
import { formatNumber } from '../../../utils/utils';
const CartItem = ({product}) => {

    const { increase, decrease, removeProduct } = useCart();
    return ( 
        <div className="row no-gutters py-2" style={{backgroundColor:'#EEEEEE'}}>
            <div className="col-sm-2 p-2">
                <img
                alt={product.name}
                style={{alignItems:'right',margin: "0 auto", maxHeight: "100px"}} 
                src={product.url} className="img-fluid d-block"/>
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1" style={{textTransform: "capitalize"}}>{product.name}</h5>
                <p className="mb-1">Pret: {formatNumber(product.price)} </p>
                
            </div>
            <div className="col-sm-2 p-2 text-center ">
                 <p className="mb-0">Buc: {product.quantity}</p>
            </div>
           
        </div>
     );
}
 
export default CartItem;