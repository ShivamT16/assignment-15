const Movie = require("../models/movie");

const addMovieReview = async (movieId, userId, reviewText, ratings) => {
  try {
    const findMovie = await Movie.findById(movieId);

    if (findMovie) {
      const review = {
        userId: userId,
        text: reviewText,
        rating: ratings,
      };
      findMovie.reviews.push(review);

      await findMovie.save();

      const updatedMovie = await Movie.findById(movieId).populate(
        "reviews.userId",
        "username",
      );
      console.log(updatedMovie);
      return updatedMovie;
    } else {
      console.log("Movie not found");
    }
  } catch (error) {
    throw error;
  }
};

const getTopFiveReviews = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId).populate("reviews");
    movie.reviews.sort((a, b) => b.rating - a.rating);

    const topFiveReviews = movie.reviews.slice(0, 5);

    const allReviews = topFiveReviews.map((review) => ({
      rating: review.rating,
      reviewText: review.text,
    }));

    console.log(allReviews);
  } catch (error) {
    console.error(error);
  }
};

const getBottomFiveReviews = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId).populate("reviews");
    movie.reviews.sort((a, b) => a.rating - b.rating);

    const bottomFiveReviews = movie.reviews.slice(0, 5);

    const allReviews = bottomFiveReviews.map((review) => ({
      rating: review.rating,
      reviewText: review.text,
    }));
    console.log(allReviews);
  } catch (error) {
    console.error("unable to get reviews", error);
  }
};

const getMovieReviewsWithUserDetails = async (movieId) => {
  console.log("getMovieReviewsWithUserDetails");
  try {
    const movie = await Movie.findById(movieId).populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "username profilePictureURL",
      },
    });

    if (movie) {
      const allReviews = movie.reviews.slice(0, 3).map((review) => ({
        reviewText: review.text,
        user: review.userId.userName,
      }));
      console.log(allReviews);

      return allReviews;
    } else {
      console.log("movie not found");
    }
  } catch (error) {
    console.error("unable to find reviews", error);
  }
};

module.exports = {
  addMovieReview,
  getTopFiveReviews,
  getBottomFiveReviews,
  getMovieReviewsWithUserDetails,
};
