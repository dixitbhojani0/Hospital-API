import patientModel from "./patient.schema.js";

export const patientRegisterationRepo = async (patientData) => {
    try {
        const {phone} = patientData;
        const patientAlreadyExist = await patientModel.findOne({phone});
        if(patientAlreadyExist) {
            return { success: true, res: patientAlreadyExist, existing: true }
        }

        const newPatient = new patientModel(patientData);
        await newPatient.save();
        return { success: true, res: newPatient };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
};