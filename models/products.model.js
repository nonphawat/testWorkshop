const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema(
  {
    p_name: { type: String, unique: false, required: true },
    quantity: { type: Number , required: true },
    price: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('products', productsSchema);