require("dotenv").config();
const { Client } = require("pg");

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // This allows SSL without verifying the certificate
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to the PostgreSQL database");
  } catch (err) {
    console.error("Connection error", err.stack);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
