import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "1234",
    database: process.env.DB_NAME || "react_crud_project",
    connectionLimit: 10, // Limit active connections
  });

const checkConnection = async () => {
    try {
      const connection = await db.promise().getConnection(); 
      console.log("✅ DB connected successfully");
      connection.release(); // Release connection
    } catch (error) {
      console.error(`❌ Database connection failed: ${error.message}`);
      throw error; 
    }
  };

export {db, checkConnection} 