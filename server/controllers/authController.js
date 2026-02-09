import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";   // ✅ named import
// import responseHandler from "../middlewares/responseMiddleware.js";
 
export const registerUser = async (req, res, next) => {
   try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    const [existingUser] = await db.promise().query(
      "SELECT id FROM role_auth WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      const err = new Error("User already exists");
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.promise().query(
      "INSERT INTO role_auth (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    // ✅ CREATE JWT (same as login)
    const token = jwt.sign(
      { id: result.insertId, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, // 🔥 SEND TOKEN
      user: {
        id: result.insertId,
        name,
        email,
        role
      }
    });
  } catch (error) {
    next(error);
  }
};



export const loginUser = async (req, res, next) => {
 try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      throw err;
    }

    const [rows] = await db.promise().query(
      "SELECT id, name, email, password, role FROM role_auth WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    // ✅ CREATE JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // 🔥 SEND TOKEN
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};