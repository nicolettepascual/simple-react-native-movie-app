import { ReactNode, createContext, useContext, useReducer } from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import { useAuthContext } from "./authContext";

enum MoviesActionType {
  GET_TRENDING = "GET_TRENDING",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS",
  GET_MOVIE_REVIEWS = "GET_MOVIE_REVIEWS",
  POST_RATING = "POST_RATING",
  GET_RATING = "GET_RATING",
}

type MoviesContextAction = {
  type: MoviesActionType;
  trendingMovies: Movie[];
  currentPage: number;
  movieDetails?: Movie;
  movieReviews?: Review[];
};

interface MoviesContextValues {
  trendingMovies: Movie[];
  currentPage: number;
  movieDetails?: Movie;
  movieReviews?: Review[];
}

interface MoviesContextState extends MoviesContextValues {
  getTrendingMovies: (page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  getMovieDetails: (movieId: string) => Promise<void>;
  getMovieReviews: (movieId: string) => Promise<void>;
  postRating: (movieId: number, rating: number) => Promise<void>;
}

const initialMoviesState = {
  trendingMovies: [],
  currentPage: 1,
  movieDetails: undefined,
  movieReviews: [],
  getTrendingMovies: async (page: number) => {},
  setCurrentPage: (page: number) => {},
  getMovieDetails: async (movieId: string) => {},
  getMovieReviews: async (movieId: string) => {},
  postRating: async (movieId: number, rating: number) => {},
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
      };
    case MoviesActionType.GET_MOVIE_REVIEWS:
      return {
        ...state,
        movieReviews: action.movieReviews,
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

  const { sessionId } = useAuthContext();

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

  const postRating = async (movieId: number, rating: number) => {
    try {
      console.log(sessionId);
      const response = await request({
        url: endpoints.account.postRating,
        sessionId,
        movieId: `${movieId}`,
        apiUrlWithSessionId: true,
        content: {
          value: Number(rating),
        },
        method: "POST",
      });

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const MoviesContextProviderValues = {
    trendingMovies: state.trendingMovies,
    currentPage: state.currentPage,
    movieDetails: state.movieDetails,
    movieReviews: state.movieReviews,
    getMovieDetails,
    setCurrentPage,
    getTrendingMovies,
    getMovieReviews,
    postRating,
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
