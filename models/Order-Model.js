const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "canceled"],
    default: "pending"
  },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "credit_card", "paypal"],
    default: "cash"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
