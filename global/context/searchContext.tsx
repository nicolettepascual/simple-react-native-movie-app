import { ReactNode, createContext, useContext, useReducer } from "react";
import { request } from "../../api/api";
import { endpoints } from "../../utils/endpoints";
import { useAuthContext } from "./authContext";

enum SearchActionType {
  GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
}

type SearchContextAction = {
  type: SearchActionType;
  searchResults: Movie[];
  currentPage: number;
};

interface SearchContextValues {
  searchResults: Movie[];
  currentPage: number;
}

interface SearchContextState extends SearchContextValues {
  getSearchResults: (keyword: string, page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const initialSearchState = {
  searchResults: [],
  currentPage: 1,
  getSearchResults: async (keyword: string, page: number) => {},
  setCurrentPage: (page: number) => {},
};

export const SearchContext =
  createContext<SearchContextState>(initialSearchState);

function SearchContextReducer(
  state: SearchContextState,
  action: SearchContextAction
): SearchContextState {
  switch (action.type) {
    case SearchActionType.GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults,
      };
    case SearchActionType.SET_CURRENT_PAGE:
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

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    SearchContextReducer,
    initialSearchState
  );

  const { sessionId } = useAuthContext();

  const setCurrentPage = (page: number) =>
    dispatch({
      type: SearchActionType.SET_CURRENT_PAGE,
      searchResults: state.searchResults ?? [],
      currentPage: page,
    });

  const getSearchResults = async (keyword: string, page: number) => {
    try {
      console.log("uhm");
      const response: SearchApiResponse = await request({
        url: endpoints.movies.search,
        content: {
          query: keyword,
        },
        sessionId,
        page,
      });

      console.log(response);

      const searchResults: Movie[] = response.results.map((movie: any) => ({
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
        type: SearchActionType.GET_SEARCH_RESULTS,
        searchResults: [...searchResults],
        currentPage: page,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const SearchContextProviderValues = {
    searchResults: state.searchResults,
    currentPage: state.currentPage,
    getSearchResults,
    setCurrentPage,
  };

  return (
    <SearchContext.Provider value={SearchContextProviderValues}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = (): SearchContextState => {
  const choreSearchContext = useContext(SearchContext);
  if (!choreSearchContext) {
    throw new Error(
      "SearchContext must be used within a SearchContextProvider"
    );
  }
  return choreSearchContext;
};

export { SearchContextProvider, useSearchContext };
