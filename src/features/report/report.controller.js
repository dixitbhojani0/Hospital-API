import { customErrorHandler } from "../../middlewares/errorMiddleware.js";
import { getAllReportsOfPatientRepo, getReportByStatusRepo, reportGenerateRepo } from "./report.repository.js";

export const reportGenerate = async (req, res, next) => {
    try {
        const {status} = req.body;
        const patientId = req.params.id;
        const resp = await reportGenerateRepo(patientId, status, req.doctor._id);
        if(resp.success) {
            res.status(201).json({
                success: true,
                msg: "Report registration successful",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    } catch (err) {
        next(err, req, res, next);
    }
}

export const getAllReportsOfPatient = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const resp = await getAllReportsOfPatientRepo(patientId);
        if(resp.success) {
            res.status(200).json({
                success: true,
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    } catch (err) {
        next(err, req, res, next);
    }
}

export const getReportByStatus = async (req, res, next) => {
    try {
        const status = req.params.status;
        const resp = await getReportByStatusRepo(status);
        if(resp.success) {
            res.status(200).json({
                success: true,
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    } catch (err) {
        next(err, req, res, next);
    }
}