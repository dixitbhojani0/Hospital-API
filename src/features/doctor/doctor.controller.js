import { customErrorHandler } from "../../middlewares/errorMiddleware.js";
import { doctorLoginRepo, doctorRegisterationRepo } from "./doctor.repository.js";
import jwt from "jsonwebtoken";

export const doctorRegisteration = async (req, res, next) => {
    try {
        const resp = await doctorRegisterationRepo({ ...req.body });
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "Doctor registration successful",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    } catch (err) {
        next(err, req, res, next);
    }
};

export const doctorLogin = async (req, res, next) => {
    try {
        const resp = await doctorLoginRepo(req.body);
        if (resp.success) {
            const token = jwt.sign(
                { _id: resp.res._id, doctor: resp.res },
                process.env.SECRET,
                {
                    expiresIn: "1h",
                }
            );
            res
                .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
                .json({ success: true, msg: "Doctor logged in successfully", token });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    } catch (err) {
        next(err, req, res, next);
    }
};