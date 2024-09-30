import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieReviewPage from "./pages/MovieReviewPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id/reviews" element={<MovieReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
