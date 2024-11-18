import * as React from 'react';
import stripe from 'stripe';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';


const StepCheckout:React.FC = () => {
    const [options, setOptions] = React.useState<any>(null);
    const stripePromise = loadStripe("pk_test_51P2E0WDw8D2tSnuyHl2saGO8wUu2oNiDGpnXSlwHuUTPSjoxDFAhnUSImv9UMPs6Ztj6WcEZKWZR4MHJeilR5C9N00AYBG4eY7");
    const service =  new stripe(process.env.REACT_APP_STRIPE_MAJEEKO_TEST as never);

    
    const createSession = async (prices: any[]) => {
        try {
            const session = await service.checkout.sessions.create({
                ui_mode: 'embedded',
                mode: 'subscription',
                line_items:[ {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1PJElODw8D2tSnuyAeDlEjFi',
                    quantity: 1,
                }
                ],
                //customer_email: customer_email,
                currency: 'eur',
                return_url: `http://localhost:3000/majeeko/payment`,
                //return_url: `http://localhost:3000/majeeko/payment/return?session_id={CHECKOUT_SESSION_ID}`,
                //automatic_tax: {enabled: true},
            });
            setOptions({clientSecret: session.client_secret})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box id="checkout" sx={{width:'100%' }}>
               {!!options &&  <EmbeddedCheckoutProvider 
                    stripe={stripePromise}
                    options={options as never}
                    >
                     <EmbeddedCheckout></EmbeddedCheckout>   
                </EmbeddedCheckoutProvider>}
        </Box>
    )
}

export default StepCheckout;