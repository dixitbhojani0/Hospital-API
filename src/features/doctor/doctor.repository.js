import doctorModel from "./doctor.schema.js";

export const doctorRegisterationRepo = async (doctorData) => {
    try {
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        return { success: true, res: newDoctor };
    } catch (error) {
        //  handle error for duplicate email
        if(error.code === 11000 && error.keyPattern.email) {
            return { success: false, error: { statusCode: 400, msg: 'Email already registered' } };
        }
        return { success: false, error: { statusCode: 400, msg: error } };
    }
};

export const doctorLoginRepo = async (doctorData) => {
    try {
        const { email, password } = doctorData;
        if(!email || !password) {
            return {
                success: false,
                error: { statusCode: 400, msg: "Missing email or password" },
            };
        }

        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return {
                success: false,
                error: { statusCode: 404, msg: "Doctor not found" },
            };
        }

        const passwordValidation = await doctor.compareHashedPassword(password);

        if (passwordValidation) {
            return { success: true, res: doctor };
        } 

        return {
            success: false,
            error: { statusCode: 401, msg: "invalid credentials" },
        };
    } catch (error) {
        return {
            success: false,
            error: { statusCode: 400, msg: error },
        };
    }
};