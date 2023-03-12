import mongoose, {Schema} from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: String,
    tourId: String,
    amount: Number,
    date: Date
})

export const OrdersModel = mongoose.model('Orders', orderSchema)