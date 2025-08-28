import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true });

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;