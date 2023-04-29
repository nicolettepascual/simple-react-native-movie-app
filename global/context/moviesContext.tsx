import { ReactNode, createContext, useContext, useReducer } from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import { useAuthContext } from "./authContext";

enum MoviesActionType {
  GET_TRENDING = "GET_TRENDING",
}

type MoviesContextAction = {
  type: MoviesActionType;
  trendingMovies: Movie[];
};

interface MoviesContextValues {
  trendingMovies: Movie[] | null;
}

interface MoviesContextState extends MoviesContextValues {
  getTrendingMovies: () => Promise<void>;
}

const initialMoviesState = {
  trendingMovies: null,
  getTrendingMovies: async () => {},
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

  const getTrendingMovies = async () => {
    try {
      const response: MoviesApiResponse = await request(
        endpoints.movies.trending,
        {},
        "GET",
        sessionId
      );

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
        trendingMovies,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const MoviesContextProviderValues = {
    trendingMovies: state.trendingMovies,
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
