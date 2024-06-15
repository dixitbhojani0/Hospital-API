import express from "express";
import { patientRegistration } from "./patient.controller.js";
import { getAllReportsOfPatient, reportGenerate } from "../report/report.controller.js";
import { auth } from "../../middlewares/jwtAuth.js";

const router = express.Router();

router.route("/register").post(auth, patientRegistration);
router.route("/:id/create_report").post(auth, reportGenerate);
router.route("/:id/all_reports").get(auth, getAllReportsOfPatient);

export default router;