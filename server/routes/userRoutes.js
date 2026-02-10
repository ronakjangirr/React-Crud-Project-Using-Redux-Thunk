import express from "express";
import { createUserByAdmin } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getUsers } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { userOnly } from "../middlewares/userMiddleware.js";
    
const router = express.Router();

router.post("/create", protect, adminOnly, createUserByAdmin);
router.delete("/:id", protect, adminOnly, deleteUser);

router.get("/", protect, getUsers);
router.put("/:id", protect, userOnly, updateUser);

export default router;
