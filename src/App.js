
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AccountEdit from './pages/account/AccountEdit';
import CheckoutForm from './pages/Checkout/CheckoutForm';
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import ProductPage from "./pages/ProductPage";
import CartContextProvider from "./contexts/CartContext";
import Cart from "./pages/Cart/Cart";
import Account from "./pages/account/Account";
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailed from './pages/CheckoutFailed';
import Orders from './pages/Orders';

function App() {
  const [mobile, setMobile] = useState();
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
      
      
  }, []);
  return (
    <CartContextProvider>
     
        <Router>
          {
            <Switch>
              <Route exact path={"/"}>
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
             
              <Route path="/my-account">
                <Account />
              </Route>
<Route path="/my-accountedit">
                <AccountEdit />
              </Route>
              <Route path="/success">
                <CheckoutSuccess/>
              </Route>
              <Route path="/failed">
                <CheckoutFailed/>
              </Route>
              <Route path="/checkout">
                <CheckoutForm/>
              </Route>
              <Route path="/orders">
                <Orders/>
              </Route>
              
              
            </Switch>
          }
        </Router>
    </CartContextProvider>
  );
}

export default App;
