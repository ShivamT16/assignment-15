const express = require("express");
const movieRouter = express.Router();

const Movie = require("../models/movie");

const {
  addMovieReview,
  getMovieReviewsWithUserDetails,
} = require("../services/movie.services");

movieRouter.use(express.json());

movieRouter.post("/:movieId/rating", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { userId, text, rating } = req.body;

    if (movieId) {
      const findMovie = await Movie.findById(movieId);

      if (findMovie && userId && text) {
        const movie = await addMovieReview(movieId, userId, text, rating);
        res.status(200).json({ "review added": movie });
      } else {
        res.status(401).json({ error: "user details missing!" });
      }
    } else {
      res.status(401).json({ error: "movie not found!" });
    }
  } catch (error) {
    console.log("unable to add review", error);
  }
});

movieRouter.get("/:movieId/reviews", async (req, res) => {
  try {
    const movie = await getMovieReviewsWithUserDetails(req.params.movieId);

    if (movie) {
      res.status(200).json({ "movie reviews": movie });
    } else {
      res.status(401).json({ error: "movie not found!" });
    }
  } catch (error) {
    console.error("unable to get reviews", error);
  }
});

module.exports = movieRouter;
