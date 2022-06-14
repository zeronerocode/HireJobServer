const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
}
});
pool.connect((err) => {
  if (err) {
    console.log("Database not connected");
  } else {
    console.log(`Database connected on ${process.env.DB_NAME}`);
  }
});

module.exports = pool;
