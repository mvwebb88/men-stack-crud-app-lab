const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1886 },
    color: { type: String },
    isElectric: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
