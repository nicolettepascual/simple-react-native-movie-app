export const endpoints = {
  authentication: {
    tokenNew: "authentication/token/new",
    tokenValidateWithLogin: "authentication/token/validate_with_login",
    sessionNew: "authentication/session/new",
    logout: "authentication/session",
  },
  movies: {
    trending: "trending/movie/day",
    details: "movie/{movie_id}",
    reviews: "movie/{movie_id}/reviews",
    search: "search/movie",
  },
  account: {
    details: "account",
    postRating: "movie/{movie_id}/rating",
  },
  images: "https://image.tmdb.org/t/p/w500/",
};
