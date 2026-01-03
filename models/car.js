// Import mongoose
const mongoose = require("mongoose");

// Define schema for Car model
const carSchema = new mongoose.Schema(
  {
    // Car make (required)
    make: {
      type: String,
      required: true
    },
    // Car model (required)
    model: {
      type: String,
      required: true
    },
    // Year the car was made
    year: {
      type: Number,
      required: true,
      min: 1886
    },
    // Optional color
    color: {
      type: String
    },
    // Boolean for electric cars
    isElectric: {
      type: Boolean,
      default: false
    }
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true
  }
);

// Export Car model
module.exports = mongoose.model("Car", carSchema);

