import React from "react";

const MovieCard = ({ movie, onClick, onEdit }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{movie.name}</h3>
      <p className="text-gray-600">
        Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        Average Rating:{" "}
        {movie.averageRating
          ? movie.averageRating.toFixed(1)
          : "No ratings yet"}
      </p>
      <div className="flex justify-between mt-4">
        <button
          onClick={onClick}
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          View Reviews
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Edit Movie
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
