import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import { useAuthContext } from "./authContext";

import Toast from "react-native-simple-toast";
import { useAccountContext } from "./accountContext";

enum MoviesActionType {
  GET_TRENDING = "GET_TRENDING",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS",
  GET_MOVIE_REVIEWS = "GET_MOVIE_REVIEWS",
  POST_RATING = "POST_RATING",
  GET_RATING = "GET_RATING",
  DELETE_RATING = "DELETE_RATING",
  ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST",
  UPDATE_IF_RATED = "UPDATE_IF_RATED",
}

type MoviesContextAction = {
  type: MoviesActionType;
  trendingMovies: Movie[];
  currentPage: number;
  movieDetails?: Movie;
  movieReviews?: Review[];
  currentMovieId?: number;
  isCurrentMovieInWatchlist?: boolean;
  isCurrentMovieRated?: boolean;
  currentMovieRating?: number;
};

interface MoviesContextValues {
  trendingMovies: Movie[];
  currentPage: number;
  movieDetails?: Movie;
  movieReviews?: Review[];
  currentMovieId?: number;
  isCurrentMovieInWatchlist?: boolean;
  isCurrentMovieRated?: boolean;
  currentMovieRating?: number;
}

interface MoviesContextState extends MoviesContextValues {
  getTrendingMovies: (page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  getMovieDetails: (movieId: string) => Promise<void>;
  getMovieReviews: (movieId: string) => Promise<void>;
  postRating: (
    movieId: number,
    rating: number,
    forDelete?: boolean
  ) => Promise<void>;
  postToWatchList: (movieId: number, watchlist: boolean) => Promise<void>;
  addToWatchList: (status: boolean) => void;
  updateIfRated: (rating: number) => void;
}

const initialMoviesState = {
  trendingMovies: [],
  currentPage: 1,
  movieDetails: undefined,
  movieReviews: [],
  currentMovieId: undefined,
  isCurrentMovieInWatchlist: false,
  isCurrentMovieRated: false,
  currentMovieRating: 0,
  getTrendingMovies: async (page: number) => {},
  setCurrentPage: (page: number) => {},
  getMovieDetails: async (movieId: string) => {},
  getMovieReviews: async (movieId: string) => {},
  postRating: async (
    movieId: number,
    rating: number,
    forDelete?: boolean
  ) => {},
  postToWatchList: async (movieId: number, watchlist: boolean) => {},
  addToWatchList: (status: boolean) => {},
  updateIfRated: (rating: number) => {},
};

export const MoviesContext =
  createContext<MoviesContextState>(initialMoviesState);

function MoviesContextReducer(
  state: MoviesContextState,
  action: MoviesContextAction
): MoviesContextState {
  switch (action.type) {
    case MoviesActionType.GET_TRENDING:
      return {
        ...state,
        trendingMovies: action.trendingMovies,
      };
    case MoviesActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case MoviesActionType.GET_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.movieDetails,
        currentMovieId: action.currentMovieId,
      };
    case MoviesActionType.GET_MOVIE_REVIEWS:
      return {
        ...state,
        movieReviews: action.movieReviews,
      };
    case MoviesActionType.ADD_TO_WATCHLIST:
      return {
        ...state,
        isCurrentMovieInWatchlist: action.isCurrentMovieInWatchlist,
      };
    case MoviesActionType.UPDATE_IF_RATED:
      return {
        ...state,
        isCurrentMovieRated: action.isCurrentMovieRated,
        currentMovieRating: action.currentMovieRating,
      };
    default:
      return {
        ...state,
      };
  }
}

const MoviesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    MoviesContextReducer,
    initialMoviesState
  );

  const { sessionId, account } = useAuthContext();
  const { watchlist, ratedMovies, getWatchlist, getRatedMovies } =
    useAccountContext();

  const setCurrentPage = (page: number) =>
    dispatch({
      type: MoviesActionType.SET_CURRENT_PAGE,
      trendingMovies: state.trendingMovies ?? [],
      currentPage: page,
    });

  const getTrendingMovies = async (page: number) => {
    try {
      const response: MoviesApiResponse = await request({
        url: endpoints.movies.trending,
        sessionId,
        page,
      });

      const trendingMovies: Movie[] = response.results.map((movie: any) => ({
        backdrop_path: movie.backdrop_path,
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      }));

      dispatch({
        type: MoviesActionType.GET_TRENDING,
        trendingMovies: [...state.trendingMovies, ...trendingMovies],
        currentPage: page,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getMovieDetails = async (movieId: string) => {
    try {
      const response: MoviesApiResponse = await request({
        url: endpoints.movies.details,
        movieId,
        sessionId,
      });

      const movieDetails: Movie = JSON.parse(JSON.stringify(response));

      dispatch({
        type: MoviesActionType.GET_MOVIE_DETAILS,
        trendingMovies: state.trendingMovies,
        currentPage: state.currentPage,
        movieDetails: movieDetails,
        currentMovieId: Number(movieId),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getMovieReviews = async (movieId: string) => {
    try {
      const response: MoviesApiResponse = await request({
        url: endpoints.movies.reviews,
        movieId,
        sessionId,
      });

      const movieReviews: Review[] = response.results.map((review: any) => ({
        id: review.id,
        author_details: {
          name: review.author_details.name,
          username: review.author_details.username,
          avatar_path: review.author_details.avatar_path,
        },
        content: review.content,
        created_at: review.created_at,
        updated_at: review.updated_at,
        url: review.url,
      }));

      dispatch({
        type: MoviesActionType.GET_MOVIE_REVIEWS,
        trendingMovies: state.trendingMovies,
        currentPage: state.currentPage,
        movieDetails: state.movieDetails,
        movieReviews: [...movieReviews],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const postRating = async (
    movieId: number,
    rating: number,
    forDelete = false
  ) => {
    try {
      console.log(sessionId);
      const response = await request({
        url: endpoints.movies.postRating,
        sessionId,
        movieId: `${movieId}`,
        apiUrlWithSessionId: true,
        content: {
          value: rating,
        },
        method: forDelete ? "DELETE" : "POST",
      });

      console.log(response);

      updateIfRated(rating);

      Toast.show(
        rating === 0
          ? "Your rating has been deleted"
          : "Your Rating has been posted",
        Toast.CENTER
      );
      // TODO: Dispatch an action that handles the current movie has been rated
    } catch (e) {
      console.error(e);
    }
  };

  const postToWatchList = useCallback(
    async (movieId: number, watchlistStatus: boolean) => {
      try {
        const accountId = account?.accountId;

        if (accountId) {
          const response = await request({
            url: endpoints.movies.addToWatchlist,
            sessionId,
            accountId: `${accountId}`,
            movieId: `${movieId}`,
            apiUrlWithSessionId: true,
            content: {
              media_type: "movie",
              media_id: movieId,
              watchlist: watchlistStatus,
            },
            method: "POST",
          });

          console.log(response);
          Toast.show("Watchlist updated", Toast.CENTER);
        }

        if (!watchlist) await getWatchlist();
        // TODO: Dispatch an action that handles the current movie has been added/removed to watchlist
        addToWatchList(watchlistStatus);
      } catch (e) {
        console.error(e);
      }
    },
    [watchlist]
  );

  const addToWatchList = (status: boolean) => {
    dispatch({
      type: MoviesActionType.ADD_TO_WATCHLIST,
      isCurrentMovieInWatchlist: status,
      trendingMovies: state.trendingMovies,
      currentPage: state.currentPage,
      movieDetails: state.movieDetails,
      movieReviews: state.movieReviews,
    });
  };

  const updateIfRated = (rating: number) => {
    dispatch({
      type: MoviesActionType.UPDATE_IF_RATED,
      currentMovieId: state.currentMovieId,
      isCurrentMovieInWatchlist: state.isCurrentMovieInWatchlist,
      currentMovieRating: rating,
      isCurrentMovieRated: rating !== 0,
      trendingMovies: state.trendingMovies,
      currentPage: state.currentPage,
      movieDetails: state.movieDetails,
      movieReviews: state.movieReviews,
    });
  };

  useEffect(() => {
    addToWatchList(
      watchlist.find((item) => item.id === state.currentMovieId) !== undefined
    );
  }, [state.currentMovieId, watchlist]);

  useEffect(() => {
    const ratedMovie = ratedMovies.find(
      (item) => item.id === state.currentMovieId
    );
    const rating = ratedMovie?.rating;
    updateIfRated(rating ?? 0);
  }, [state.currentMovieId, ratedMovies]);

  const MoviesContextProviderValues = {
    trendingMovies: state.trendingMovies,
    currentPage: state.currentPage,
    movieDetails: state.movieDetails,
    movieReviews: state.movieReviews,
    currentMovieId: state.currentMovieId,
    isCurrentMovieInWatchlist: state.isCurrentMovieInWatchlist,
    currentMovieRating: state.currentMovieRating,
    isCurrentMovieRated: state.isCurrentMovieRated,
    getMovieDetails,
    setCurrentPage,
    getTrendingMovies,
    getMovieReviews,
    postRating,
    postToWatchList,
    addToWatchList,
    updateIfRated,
  };

  return (
    <MoviesContext.Provider value={MoviesContextProviderValues}>
      {children}
    </MoviesContext.Provider>
  );
};

const useMoviesContext = (): MoviesContextState => {
  const choreMoviessContext = useContext(MoviesContext);
  if (!choreMoviessContext) {
    throw new Error(
      "MoviesContext must be used within a MoviesContextProvider"
    );
  }
  return choreMoviessContext;
};

export { MoviesContextProvider, useMoviesContext };
