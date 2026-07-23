const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Amount",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log("=================================");
    console.log("RAZORPAY ERROR");
    console.log(error);
    console.log("Message :", error.message);
    console.log("Status :", error.statusCode);
    console.log("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  createOrder,
};