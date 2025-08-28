import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../Context/ShopContext';

const ReviewSection = ({ productId }) => {
    const { backendUrl, token, userData } = useContext(AppContext);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [reviewCount, setReviewCount] = useState(0); // State to store the review count

    // Fetch reviews
    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/reviews/${productId}`);
            if (data.success) {
                setReviews(data.reviews);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Error fetching reviews");
        }
    };

    // Fetch review count
    const fetchReviewCount = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/reviews/count/${productId}`);
            if (data.success) {
                setReviewCount(data.reviewCount); // Set the review count
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Error fetching review count");
        }
    };

    useEffect(() => {
        if (productId) {
            fetchReviews();
            fetchReviewCount(); // Fetch review count on component mount
        }
    }, [productId]);

    // Submit review
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) return toast.error("Please login to leave a review");

        try {
            setLoading(true);
            const { data } = await axios.post(
                `${backendUrl}/api/reviews/add`,
                { productId, comment, rating },
                { headers: { token } }
            );
            if (data.success) {
                toast.success("Review added!");
                setComment('');
                setRating(5);
                fetchReviews();
                fetchReviewCount(); // Re-fetch the review count after adding a review
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Review failed");
        } finally {
            setLoading(false);
        }
    };

    // Delete review
    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            const { data } = await axios.delete(`${backendUrl}/api/reviews/${reviewId}`, {
                headers: { token },
            });
            if (data.success) {
                toast.success("Review deleted");
                fetchReviews();
                fetchReviewCount(); // Re-fetch the review count after deleting a review
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Failed to delete review");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>

            <p className="text-gray-600 mb-4">{reviewCount} Reviews</p>

            {reviews.length === 0 && <p className="text-gray-600">No reviews yet.</p>}
            <ul className="space-y-4">
                {reviews.map((review) => (
                    <li key={review._id} className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <strong className="text-lg font-medium text-gray-900">{review.author.name}</strong>
                            <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{review.comment}</p>
                        {userData && review.author._id === userData._id && (
                            <button 
                            onClick={() => handleDelete(review._id)} 
                            className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        >
                            Delete
                        </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Add Review */}
            {token && (
                <form onSubmit={handleSubmit} className="mt-6">
                    <h4 className="text-xl font-semibold mb-2">Write a Review</h4>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your review..."
                        required
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primaryhover transition"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewSection;
