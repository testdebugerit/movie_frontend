import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get("/movies");
    setMovies(response.data);
  };

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setFormVisible(true);
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setFormVisible(true);
  };

  const handleFormSubmit = () => {
    setFormVisible(false);
    fetchMovies();
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Movies</h1>
        <button
          onClick={handleAddMovie}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Movie
        </button>
      </div>
      {isFormVisible ? (
        <MovieForm
          movie={selectedMovie}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => handleEditMovie(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
