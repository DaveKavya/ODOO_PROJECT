const pool = require("../config/db");
const bcrypt = require("bcrypt");

// SIGN UP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, hashedPassword]
  );

  res.json({ message: "User created successfully" });
};

// SIGN IN
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rows.length === 0) {
    return res.json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: user.rows[0],
  });
};