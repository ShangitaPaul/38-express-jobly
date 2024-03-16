const express = require("express");
const cors = require("cors");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const morgan = require("morgan");

"use strict";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny")); // Logging requests
app.use(authenticateJWT);

// Routes
app.use("/companies", companiesRoutes);
app.use("/auth", authRoutes);

// Handle 404 errors
app.use(function (req, res, next) {
  next(new NotFoundError());
});

// Error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack); // Log the error
  }
  const status = err.status || 500;
  const message = err.message;

  res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
