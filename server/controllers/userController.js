import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

export const createUserByAdmin = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const { name, email, password, phone, city } = req.body;
        if (!name || !email || !password || !phone || !city) {
            const err = new Error("All fields are required");
            err.statusCode = 400;
            throw err;
        }

        const [existing] = await db.promise().query(
            "SELECT id FROM role_auth WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            const err = new Error("User already exists");
            err.statusCode = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [authResult] = await db.promise().query(
            `INSERT INTO role_auth (name, email, password, role)
       VALUES (?, ?, ?, 'user')`,
            [name, email, hashedPassword]
        );

        const authId = authResult.insertId;

        await db.promise().query(
            `INSERT INTO user_profile (auth_id, phone, city, created_by)
       VALUES (?, ?, ?, ?)`,
            [authId, phone, city, adminId]
        );

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: authId,
                name,
                email,
                phone,
                city,
            },
        });

    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const userId = req.user.id;   
        const role = req.user.role;  

        let query = "";
        let params = [];

        if (role === "admin") {
            query = `
        SELECT 
          ra.id,
          ra.name,
          ra.email,
          ra.role,
          up.phone,
          up.city
        FROM role_auth ra
        INNER JOIN user_profile up ON ra.id = up.auth_id
        WHERE ra.role = 'USER'
          AND up.created_by = ?
        ORDER BY ra.id DESC
      `;
            params = [userId];
        } else {
            query = `
        SELECT 
          ra.id,
          ra.name,
          ra.email,
          ra.role,
          up.phone,
          up.city
        FROM role_auth ra
        INNER JOIN user_profile up ON ra.id = up.auth_id
        WHERE ra.id = ?
      `;
            params = [userId];
        }

        const [rows] = await db.promise().query(query, params);

        res.status(200).json({
            success: true,
            count: rows.length,
            users: rows,
        });
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const adminId = req.user.id;

        await db.promise().query(
            `
      DELETE ra, up
      FROM role_auth ra
      INNER JOIN user_profile up ON ra.id = up.auth_id
      WHERE ra.id = ? AND up.created_by = ?
      `,
            [userId, adminId]
        );

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id; 
        const adminId = req.user.id;  
        const role = req.user.role;

        const { name, email, phone, city } = req.body;

        if (role === "user" && userId != adminId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this user",
            });
        }

        await db.promise().query(
            `
      UPDATE role_auth 
      SET name = ?, email = ?
      WHERE id = ?
      `,
            [name, email, userId]
        );

        await db.promise().query(
            `
      UPDATE user_profile 
      SET phone = ?, city = ?
      WHERE auth_id = ?
      `,
            [phone, city, userId]
        );

        const [rows] = await db.promise().query(
            `
      SELECT 
        ra.id,
        ra.name,
        ra.email,
        ra.role,
        up.phone,
        up.city
      FROM role_auth ra
      INNER JOIN user_profile up ON ra.id = up.auth_id
      WHERE ra.id = ?
      `,
            [userId]
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: rows[0],
        });
    } catch (error) {
        next(error);
    }
};
