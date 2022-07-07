// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51KAyelC2UJW67kLCMMc7EQwlkhh5bLMTXXkevYEncAEJZgEhG5mVSpw6A9HF6bjTRpaQSQpxET27RT1oF4wJZ4cf00Lc4z53uD')

app.get('/', (req,res)=> {
    res.sendFile('/checkout.html',{root: __dirname });
});
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
