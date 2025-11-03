const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentService = require("../services/paymentService");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create a Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { amount, name, email } = req.body;
    if (!amount || !name || !email) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(2, 8),
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order created:", order.id);

    // (Optional) Save order info in DB
    await paymentService.saveOrder({
      order_id: order.id,
      amount,
      currency: "INR",
      name,
      email,
      status: "created",
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

// ✅ Verify payment signature (after frontend success)
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      console.log("✅ Payment verified successfully");

      // Update DB record
      await paymentService.updatePaymentStatus(razorpay_order_id, "paid");

      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("❌ Invalid signature");
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
