import React from 'react';

import CheckoutItem from './CheckoutItem';
import { useCart } from '../../../hooks/UseCart';

const CheckoutProducts = () => {

    const { cartItems } = useCart();

    return ( 
        <div>
            <div className="card card-body border-0" style={{backgroundColor:'#EEEEEE'}}>

                {
                    cartItems.map(product =>  <CheckoutItem key={product.id} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CheckoutProducts;