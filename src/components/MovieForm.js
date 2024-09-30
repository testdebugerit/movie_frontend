import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieForm = ({ movie, onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    if (movie) {
      setName(movie.name);
      setReleaseDate(new Date(movie.releaseDate).toISOString().split("T")[0]);
    }
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { name, releaseDate };

    if (movie) {
      await axios.put(`/movies/${movie._id}`, movieData);
    } else {
      await axios.post("/movies", movieData);
    }

    onSubmit();
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold">
        {movie ? "Edit Movie" : "Add New Movie"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Movie Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter movie name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Release Date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {movie ? "Update Movie" : "Add Movie"}
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

export default MovieForm;
