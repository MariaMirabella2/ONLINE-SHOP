import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import './Stripe.css';
const PUBLIC_KEY = "pk_test_51KEH7RKTHpXNcTFuCbiOJLhtYsgWcCmWEJF3qfGnEYnBGuPDGTvS8pzRCvWimxj4OrsmUR7Z6w5nVvnI6dzqy0wt00tHjtmnIe"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({amount,success, setSuccess,setOpenModal}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm amount={amount} success={success} setSuccess={setSuccess} setOpenModal={setOpenModal}/>
		</Elements>
	)
}