import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../components/ReviewForm"; // Use this component for adding/editing reviews
import { useParams } from "react-router-dom"; // Required to fetch the movie ID from the route

const MovieReviewPage = () => {
  const { id } = useParams(); // Fetching the movieId from the URL
  const [reviews, setReviews] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/movies/${id}/reviews`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const handleAddReview = () => {
    setSelectedReview(null);
    setFormVisible(true);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setFormVisible(true);
  };

  const handleFormSubmit = () => {
    setFormVisible(false);
    fetchReviews(); // Refresh the reviews list after submission
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Reviews</h1>
      {isFormVisible ? (
        <ReviewForm
          review={selectedReview}
          movieId={id}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <button
            onClick={handleAddReview}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          >
            Add Review
          </button>
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="p-4 bg-white shadow rounded-md">
                <h3 className="text-lg font-bold">
                  {review.reviewerName || "Anonymous"}
                </h3>
                <p>Rating: {review.rating}/10</p>
                <p>{review.comments}</p>
                <button
                  onClick={() => handleEditReview(review)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Edit Review
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieReviewPage;
