import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewForm = ({ review, movieId, onSubmit, onCancel }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (review) {
      setReviewerName(review.reviewerName || "");
      setRating(review.rating);
      setComments(review.comments);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { reviewerName, rating, comments, movieId };

    if (review) {
      await axios.put(`/reviews/${review._id}`, reviewData);
    } else {
      await axios.post("/reviews", reviewData);
    }

    onSubmit();
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold">
        {review ? "Edit Review" : "Add New Review"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Reviewer Name</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Rating (out of 10)
          </label>
          <input
            type="number"
            max="10"
            min="0"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your comments"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {review ? "Update Review" : "Add Review"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
