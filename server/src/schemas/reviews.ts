import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: String,
    nickname: String,
    tourId: String,
    description: String,
    date: Date
})

export const ReviewsModel = mongoose.model('Reviews', reviewSchema)