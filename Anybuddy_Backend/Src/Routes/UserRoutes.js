import express from "express";
import { getAllUsers } from "../Controllers/UserControllers.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;