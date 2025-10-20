const stripe = require("../config/stripe");

exports.createPayment = async (req, res) => {
  const { amount, email } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "php",
      payment_method_types: ["card"],
      receipt_email: email,
    });
    res.status(200).json({ clientSecret: payment.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
