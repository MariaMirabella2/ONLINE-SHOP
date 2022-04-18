import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';
import {db} from '../firebase';
export const CartContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const increase = payload => {
        console.log('intru ')
        dispatch({type: 'INCREASE', payload})
    }

    const decrease = payload => {
        dispatch({type: 'DECREASE', payload})
    }

    const addProduct = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }

    const removeProduct = payload => {
        dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR'})
    }

    const handleCheckout = (currentUser) => {
        console.log('CHECKOUT', state);
        let OrderObject= {
            items:[...state.cartItems],
            totalItems: state.itemCount,
            total:state.total,
            userId:  currentUser.uid,
            email: currentUser.email,
            status:'plasata',
            dataOrder: Math.round(+new Date()/1000),
            firstName:localStorage.getItem("firstName"),
            secondName:localStorage.getItem("secondName"),
            phone:localStorage.getItem("phone"),
            postalCode:localStorage.getItem("postalCode"),
            county:localStorage.getItem("county"),
            city:localStorage.getItem("city"),
            street:localStorage.getItem("street"),
            paymentMethod:localStorage.getItem("paymentMethod"),
            }
        db.collection("orders").add(OrderObject)
        localStorage.removeItem("firstName");
        localStorage.removeItem("secondName");
        localStorage.removeItem("phone");
        localStorage.removeItem("postalCode");
        localStorage.removeItem("county");
        localStorage.removeItem("city");
        localStorage.removeItem("street");
        localStorage.removeItem("paymentMethod");
        state.cartItems.forEach((item) => {
            const docRef = db.collection("products").doc(item.id);
            const obj =  Object.assign(item);
            obj.stoc-=obj.quantity;
            delete obj.quantity;
            docRef.update(obj);
        })
        console.log(OrderObject)
        

        dispatch({type: 'CHECKOUT'})
        
    }

    const contextValues = {
        removeProduct,
        addProduct,
        increase,
        decrease,
        clearCart,
        handleCheckout,
        ...state
    } 

    return ( 
        <CartContext.Provider value={contextValues} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;