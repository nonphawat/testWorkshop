const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    approve: { type: Boolean }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('members', memberSchema);