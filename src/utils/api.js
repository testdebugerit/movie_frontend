import axios from "axios";

// Create an instance of axios with the backend API base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // Change the URL based on your backend environment
});

// Get all movies
export const getMovies = () => api.get("/movies");

// Get movie details by ID
export const getMovieById = (id) => api.get(`/movies/${id}`);

// Add a new movie
export const addMovie = (movie) => api.post("/movies", movie);

// Update an existing movie
export const updateMovie = (id, movie) => api.put(`/movies/${id}`, movie);

// Delete a movie
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

// Get reviews for a movie
export const getReviewsByMovieId = (movieId) =>
  api.get(`/movies/${movieId}/reviews`);

// Add a new review
export const addReview = (review) => api.post("/reviews", review);

// Update an existing review
export const updateReview = (id, review) => api.put(`/reviews/${id}`, review);

// Delete a review
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export default api;
