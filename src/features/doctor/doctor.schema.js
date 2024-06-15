import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "The name should be at least 3 characters long"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/]
    },
    password: {
        type: String, 
        required: [true, "password is required"]
    }
},{
    timestamps: true
});

doctorSchema.pre("save", async function (next) {
    //  hash user password before saving using bcrypt
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// user password compare
doctorSchema.methods.compareHashedPassword = async function (entredPassword) {
    return await bcrypt.compare(entredPassword, this.password);
};

const doctorModel = mongoose.model('Doctor', doctorSchema);

export default doctorModel;