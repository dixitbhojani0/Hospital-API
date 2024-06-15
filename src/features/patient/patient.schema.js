import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "The name should be at least 3 characters long"],
    },
    phone: {
        type: Number,
        maxlength: [10, "The phone nummber should be in 10 digits"],
        required: [true, "phone field is required"],
        unique: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, "doctor is required to register patient"]
    }
}, {
    timestamps: true
});

const patientModel = mongoose.model("Patient", patientSchema);

export default patientModel;