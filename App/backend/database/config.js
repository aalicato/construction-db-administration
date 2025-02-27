// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();

// Create a 'connection pool' using the provided credentials

console.log(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_DATABASE,
);
const pool = mysql
  .createPool({
    connectionLimit: 10,
    waitForConnections: true,
    host: process.env.DB_HOST || "x",
    user: process.env.DB_USER || "x",
    password: process.env.DB_PASSWORD || "x",
    database: process.env.DB_DATABASE || "x",
    dateStrings: true,
    multipleStatements: true,
  })
  .promise();

// Export it for use in our application
module.exports = pool;
