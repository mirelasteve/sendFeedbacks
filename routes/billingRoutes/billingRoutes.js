const keys = require('../../config/config');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../../middlewares/requireLogIn');
module.exports = app => {
     
        app.post('/api/stripepayments',requireLogin,async (req,res)=>{
           
           const charge = await stripe.charges.create({
                amount:500,
                currency:'usd',
                description:'5$ for 5 emails',
                source:req.body.id
            });
           req.user.credits+=5;
           const user = await req.user.save();
           res.send(user);
        })
    
    
}