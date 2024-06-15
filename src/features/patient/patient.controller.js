import { customErrorHandler } from "../../middlewares/errorMiddleware.js";
import { patientRegisterationRepo } from "./patient.repository.js";

export const patientRegistration = async (req, res, next) => {
    try {
        const resp = await patientRegisterationRepo({ ...req.body, doctor: req._id });
        if(resp.success) {
            res.status(resp?.existing ? 200 : 201).json({
                success: true,
                msg: resp?.existing ? "Patient already exist" : "Patient registration successful",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    } catch (err) {
        next(err, req, res, next);
    }
}