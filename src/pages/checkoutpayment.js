import {loadStripe} from "@stripe/stripe-js"
import Product from "../models/Product"


export async function checkout({lineItems,successUrl}) {
    let stripePromise =null
    const getstripe =()=>{
        if(!stripePromise){
            stripePromise =loadStripe(process.env.NEXT_PUBLIC_API_KEY)
        }
        return stripePromise
    }
    const stripe =await getstripe()
    await stripe.redirectToCheckout({
        mode:"payment",
        lineItems,
        successUrl,
		cancelUrl: window.location.origin
    })
}

  
