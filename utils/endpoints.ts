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
    postRating: "movie/{movie_id}/rating",
    addToWatchlist: "account/{account_id}/watchlist",
  },
  account: {
    details: "account",
    ratedMovies: "account/{account_id}/rated/movies",
    watchlist: "account/{account_id}/watchlist/movies",
  },
  images: "https://image.tmdb.org/t/p/w500/",
};
