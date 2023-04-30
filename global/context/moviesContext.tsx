import { ReactNode, createContext, useContext, useReducer } from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import { useAuthContext } from "./authContext";

enum MoviesActionType {
  GET_TRENDING = "GET_TRENDING",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS",
}

type MoviesContextAction = {
  type: MoviesActionType;
  trendingMovies: Movie[];
  movieDetails?: Movie;
  currentPage: number;
};

interface MoviesContextValues {
  trendingMovies: Movie[];
  movieDetails?: Movie;
  currentPage: number;
}

interface MoviesContextState extends MoviesContextValues {
  getTrendingMovies: (page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  getMovieDetails: () => Promise<void>;
}

const initialMoviesState = {
  trendingMovies: [],
  currentPage: 1,
  movieDetails: undefined,
  getTrendingMovies: async (page: number) => {},
  setCurrentPage: (page: number) => {},
  getMovieDetails: async () => {},
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

  const getMovieDetails = async () => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

  const MoviesContextProviderValues = {
    trendingMovies: state.trendingMovies,
    currentPage: state.currentPage,
    movieDetails: state.movieDetails,
    getMovieDetails,
    setCurrentPage,
    getTrendingMovies,
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
