const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config({ override: true });

const Car = require("./models/car");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

// Redirect root
app.get("/", (req, res) => {
  res.redirect("/cars");
});

// INDEX
app.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.render("cars/index", { cars });
});

// NEW
app.get("/cars/new", (req, res) => {
  res.render("cars/new");
});

// CREATE
app.post("/cars", async (req, res) => {
  req.body.isElectric = req.body.isElectric === "on";
  req.body.year = Number(req.body.year);

  const newCar = await Car.create(req.body);
  res.redirect(`/cars/${newCar._id}`);
});

// SHOW
app.get("/cars/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render("cars/show", { car });
});

// EDIT
app.get("/cars/:id/edit", async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render("cars/edit", { car });
});

// UPDATE
app.put("/cars/:id", async (req, res) => {
  req.body.isElectric = req.body.isElectric === "on";
  req.body.year = Number(req.body.year);

  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});

// DELETE
app.delete("/cars/:id", async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect("/cars");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


