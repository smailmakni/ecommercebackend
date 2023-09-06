const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =
stripe('sk_test_51NnLo2BWSbXcct2riIj5M5Ze1J3gZBacmEBh6UlhJq0tnqqKk5qeVKcpMQmbE3ckBIDmMIR1KB62bkGSrTTee2cm00YsJAFlhC');
router.post('/', async (req, res) => {
let status, error;
const { token, amount } = req.body;
try {
await Stripe.charges.create({
source: token.id,
amount,
currency: 'usd',
});
status = 'success';
} catch (error) {
console.log(error);
status = 'Failure';
}
res.json({ error, status });
});
module.exports = router;