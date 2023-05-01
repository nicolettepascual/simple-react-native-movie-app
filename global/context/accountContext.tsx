import { ReactNode, createContext, useContext, useReducer } from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import { useAuthContext } from "./authContext";

enum AccountActionType {
  GET_RATED_MOVIES = "GET_RATED_MOVIES",
  GET_WATCHLIST = "GET_WATCHLIST",
}

type AccountContextAction = {
  type: AccountActionType;
  ratedMovies: Movie[];
  watchlist: Movie[];
};

interface AccountContextValues {
  ratedMovies: Movie[];
  watchlist: Movie[];
}

interface AccountContextState extends AccountContextValues {
  getRatedMovies: () => Promise<void>;
  getWatchlist: () => Promise<void>;
}

const initialAccountState = {
  ratedMovies: [],
  watchlist: [],
  getRatedMovies: async () => {},
  getWatchlist: async () => {},
};

export const AccountContext =
  createContext<AccountContextState>(initialAccountState);

function AccountContextReducer(
  state: AccountContextState,
  action: AccountContextAction
): AccountContextState {
  switch (action.type) {
    case AccountActionType.GET_RATED_MOVIES:
      return {
        ...state,
        ratedMovies: action.ratedMovies,
      };
    case AccountActionType.GET_WATCHLIST:
      return {
        ...state,
        watchlist: action.watchlist,
      };
    default:
      return {
        ...state,
      };
  }
}

const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    AccountContextReducer,
    initialAccountState
  );

  const { sessionId, account } = useAuthContext();

  const getRatedMovies = async () => {
    try {
      const accountId = account?.accountId;
      if (!accountId) return;

      const response: MoviesApiResponse = await request({
        url: endpoints.account.ratedMovies,
        sessionId,
        accountId: `${accountId}`,
        apiUrlWithSessionId: true,
      });

      const ratedMovies: Movie[] = response.results.map((movie: any) => ({
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
        type: AccountActionType.GET_RATED_MOVIES,
        ratedMovies,
        watchlist: state.watchlist,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getWatchlist = async () => {
    try {
      const accountId = account?.accountId;
      if (!accountId) return;

      const response: MoviesApiResponse = await request({
        url: endpoints.account.watchlist,
        sessionId,
        accountId: `${accountId}`,
        apiUrlWithSessionId: true,
      });

      const watchlist: Movie[] = response.results.map((movie: any) => ({
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
        type: AccountActionType.GET_WATCHLIST,
        watchlist,
        ratedMovies: state.ratedMovies,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const AccountContextProviderValues = {
    ratedMovies: state.ratedMovies,
    watchlist: state.watchlist,
    getRatedMovies,
    getWatchlist,
  };

  return (
    <AccountContext.Provider value={AccountContextProviderValues}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccountContext = (): AccountContextState => {
  const choreAccountContext = useContext(AccountContext);
  if (!choreAccountContext) {
    throw new Error(
      "AccountContext must be used within a AccountContextProvider"
    );
  }
  return choreAccountContext;
};

export { AccountContextProvider, useAccountContext };
