const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "traveloop",
  password: "kavya07",
  port: 5432,
});

module.exports = pool;