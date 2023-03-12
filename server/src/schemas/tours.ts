import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    name: String,
    country: String,
    startDate: String,
    endDate: String,
    price: Number,
    initialLimit: Number,
    limit: Number,
    description: String,
    photoLink: String,
    votes: Number
})

export const ToursModel = mongoose.model('Tours', tourSchema)