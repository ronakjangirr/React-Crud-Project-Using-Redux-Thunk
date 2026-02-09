import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import { checkConnection } from "../server/config/db.js"; // 👈 add this
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

// Check database connection
checkConnection();

const app = express();

// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173", // Vite
  "http://localhost:3000"  // CRA (optional)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Node Backend Running");
});

// Error Middleware (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
