import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from "./contexts/AuthContext";
export const stripePromise = loadStripe(
  'pk_test_51KEH7RKTHpXNcTFuCbiOJLhtYsgWcCmWEJF3qfGnEYnBGuPDGTvS8pzRCvWimxj4OrsmUR7Z6w5nVvnI6dzqy0wt00tHjtmnIe'
);
ReactDOM.render(
  <AuthProvider>
  <Elements stripe={stripePromise}>
    <App />
    </Elements>
    </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
