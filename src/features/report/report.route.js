import express from "express";
import { getReportByStatus } from "../report/report.controller.js";

const router = express.Router();

router.route("/:status").get(getReportByStatus);

export default router;