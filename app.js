// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware
const { connectDB, client } = require("./database/db"); // Import the database connection
const authRoutes = require("./routes/auth");
const aiRoutes = require('./routes/ai')
// Create an instance of express
const app = express();

// Middleware to allow CORS
app.use(cors()); // Enable all CORS requests

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the PostgreSQL database
connectDB();

// Define a basic route
app.use("/auth", authRoutes);
app.use('/ai',aiRoutes);
// Start the server using the PORT from .env or fallback to 5800
const PORT = process.env.PORT || 5800;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


