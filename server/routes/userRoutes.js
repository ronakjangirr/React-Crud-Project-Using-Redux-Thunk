import express from "express";
import { createUserByAdmin } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getUsers } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", protect, createUserByAdmin);
router.get("/", protect, getUsers); // 👈 GET USERS
router.delete("/:id", protect, deleteUser);
router.put("/:id", protect, updateUser);

export default router;
