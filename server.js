// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config({ override: true });

// Import Car model
const Car = require("./models/car");

// Create Express app
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Middleware to support PUT and DELETE from forms
app.use(methodOverride("_method"));

// Serve static files from public folder
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Redirect root route to cars index
app.get("/", (req, res) => {
  res.redirect("/cars");
});

// INDEX route – display all cars
app.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.render("cars/index", { cars });
});

// NEW route – show form to create a car
app.get("/cars/new", (req, res) => {
  res.render("cars/new");
});

// CREATE route – add new car to database
app.post("/cars", async (req, res) => {
  req.body.isElectric = req.body.isElectric === "on";
  req.body.year = Number(req.body.year);

  const car = await Car.create(req.body);
  res.redirect(`/cars/${car._id}`);
});

// SHOW route – display a single car
app.get("/cars/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render("cars/show", { car });
});

// EDIT route – show form to edit a car
app.get("/cars/:id/edit", async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render("cars/edit", { car });
});

// UPDATE route – update car data
app.put("/cars/:id", async (req, res) => {
  req.body.isElectric = req.body.isElectric === "on";
  req.body.year = Number(req.body.year);

  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});

// DELETE route – remove car from database
app.delete("/cars/:id", async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect("/cars");
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



