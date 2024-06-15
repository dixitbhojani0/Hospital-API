import express from "express";
import { doctorLogin, doctorRegisteration } from "./doctor.controller.js";

const router = express.Router();

router.route("/register").post(doctorRegisteration);
router.route("/login").post(doctorLogin);

export default router;