import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: {type: Number, default: 1},
    blocked: {type: Boolean, default: false}
})

export const UsersModel = mongoose.model('Users', userSchema)

