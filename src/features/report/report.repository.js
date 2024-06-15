import reportModel from "./report.schema.js";

export const reportGenerateRepo = async (patientId, status, doctorId) => {
    try {
        const newReport = new reportModel({ doctor:doctorId, patient: patientId, status: status});
        await newReport.save();
        return { success: true, res: newReport };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
}

export const getAllReportsOfPatientRepo = async (patientId) => {
    try {
        const reports = await reportModel.find({ patient: patientId });
        return { success: true, res: reports };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
}

export const getReportByStatusRepo = async (status) => {
    try {
        const reports = await reportModel.find({ status: status });
        return { success: true, res: reports };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
}