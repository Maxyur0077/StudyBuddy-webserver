const { client } = require("../database/db"); // Import the database connection
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const insertQuery = `
      INSERT INTO users(name, email, password, phone, user_stage) 
      VALUES ($1, $2, $3, $4, 'ONBOARDING') 
      RETURNING id, user_stage;
    `;

    // Log the query and the parameters to see if they are correctly populated
    console.log("SQL Query:", insertQuery);
    console.log("Parameters:", [name, email, password, phone]);

    // Perform the database operation
    const insertedData = await client.query(insertQuery, [
      name,
      email,
      password,
      phone,
    ]);

    const insertedId = insertedData.rows[0].id;
    const user_stage = insertedData.rows[0].user_stage;

    // Return the result
    return res.status(201).json({ id: insertedId, user_stage });
  } catch (error) {
    // Log the error for debugging
    console.error("Error during sign up:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const completSignup = async (req, res) => {
  try {
    const { dob, gender, country, state, city } = req.body;
    const { id } = req.params;

    // Check if required fields are present
    if (!dob || !gender || !country || !state || !city) {
      return res.status(400).json({
        message: "All fields (dob, gender, country, state, city) are required",
      });
    }

    // Check if the user exists before updating
    const checkUserQuery = `SELECT id FROM users WHERE id = $1`;
    const userCheck = await client.query(checkUserQuery, [id]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Perform the update operation
    const updateQuery = `UPDATE users 
                         SET dob=$1, gender=$2, country=$3, state=$4, city=$5, user_stage='REGISTERED' 
                         WHERE id=$6`;

    const updateData = await client.query(updateQuery, [
      dob,
      gender,
      country,
      state,
      city,
      id,
    ]);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error during completeSignup:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password are required" });
    }

    const loginQuery =
      "SELECT password,id,user_stage FROM users WHERE email = $1";

    const fetchData = await client.query(loginQuery, [email]);

    if (fetchData.rows.length === 0) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    //future if we store hashed passwords
     const hashedPassword = fetchData.rows[0].password;

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
       return res
       .status(401)
        .json({ status: false, message: "Invalid password" });
     }
    const storedPassword = fetchData.rows[0].password;

    if (password !== storedPassword) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid password" });
    }

    const user_id = fetchData.rows[0].id;
    const user_stage = fetchData.rows[0].user_stage;
    return res.status(200).json({
      status: true,
      message: "Login successful",
      id: user_id,
      user_stage: user_stage,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
module.exports = { signUp, completSignup, login };

