const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema(
    {
      p_foreignKey: { type : String, required: true },
      p_name_order: { type: String,  required: true },
      p_total: { type: Number, required: true }
      

    },
    {
      timestamps: true,
    }
  );
  
module.exports = mongoose.model('orders', ordersSchema);