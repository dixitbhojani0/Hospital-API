import cookieParser from "cookie-parser";
import express from "express";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorMiddleware.js";
import doctorRouter from "./src/features/doctor/doctor.route.js";
import patientRouter from "./src/features/patient/patient.route.js";
import reportRouter from "./src/features/report/report.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/reports', reportRouter);

app.use(appLevelErrorHandlerMiddleware);

export default app;
