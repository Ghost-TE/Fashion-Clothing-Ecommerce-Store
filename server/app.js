const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51N3Xz8Dai2cvOdS60L0aQCouRnJBtEMNOThyTykmcErdvgtTAPhmeNKSXr7KiLTCiQ6EQXfVFLCWTvpCGa7OncYY00woDJBXTh")

app.use(express.json());
app.use(cors());

//checout api

app.post("/api/create-checkout-session", async(req, res) => {
    const {products} = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency:"USD",
            product_data :{
                name: product.name,
            },
            unit_amount: product.price * 100

        },
        quantity: product.Quantity
    }));
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    })

    res.json({id:session.id})
})

app.listen(7000, () => {
    console.log("Server Started");
})