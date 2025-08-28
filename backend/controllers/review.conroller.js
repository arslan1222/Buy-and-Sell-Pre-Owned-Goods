import productModel from '../models/product.model.js';
import reviewModel from '../models/review.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const createReview = async (req, res) => {
    try {
        const { token } = req.headers;
        const { productId, comment, rating } = req.body;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Token missing." });
        }

        const decoded = jwt.verify(token, "mysecret");
        const userId = decoded.id;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user or product ID." });
        }

        if (!rating) {
            return res.status(400).json({ success: false, message: "Rating is required." });
        }

        const newReview = new reviewModel({
            comment,
            rating,
            author: userId,
            product: productId
        });

        const savedReview = await newReview.save();

        await productModel.findByIdAndUpdate(productId, {
            $push: { reviews: savedReview._id }
        });

        res.json({ success: true, message: "Review added successfully.", review: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

        const reviews = await reviewModel
            .find({ product: productId })
            .populate("author", "name");

        res.json({ success: true, reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const destroyReview = async (req, res) => {
    try {
        const { token } = req.headers;
        const { reviewId } = req.params;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Token missing." });
        }

        const decoded = jwt.verify(token, "mysecret");
        const userId = decoded.id;

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ success: false, message: "Invalid review ID." });
        }

        const review = await reviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found." });
        }

        if (review.author.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this review." });
        }

        await reviewModel.findByIdAndDelete(reviewId);

        await productModel.findByIdAndUpdate(review.product, {
            $pull: { reviews: reviewId }
        });

        res.json({ success: true, message: "Review deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getReviewCount = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

        const reviewCount = await reviewModel.countDocuments({ product: productId });

        res.json({ success: true, reviewCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    createReview,
    getProductReviews,
    destroyReview,
    getReviewCount
};