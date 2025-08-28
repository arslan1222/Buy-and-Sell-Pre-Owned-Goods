import express from "express";
import reviewValidationSchema from "../validators/review.validator.js";
import { createReview, destroyReview, getProductReviews, getReviewCount } from "../controllers/review.conroller.js";

const reviewRouter = express.Router();

const validateReview = (req, res, next) => {
    const { error } = reviewValidationSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(", ");
        return res.status(400).json({ success: false, message });
    }
    next();
};

reviewRouter.post("/add", validateReview, createReview);
reviewRouter.delete("/:reviewId", destroyReview);
reviewRouter.get("/:productId", getProductReviews);
reviewRouter.get("/count/:productId", getReviewCount);


export default reviewRouter;