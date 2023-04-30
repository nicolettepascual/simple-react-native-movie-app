interface BaseApiResponse {
  success: boolean;
}

// Authentication
interface LoginApiResponse extends BaseApiResponse {
  request_token: string;
}

interface SessionApiResponse extends BaseApiResponse {
  session_id: string;
}

// Movies
interface Movie {
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string
  title: string;
  vote_average: number;
  vote_count: number;
  genres?: string;
  runtime?: number;
}

interface MoviesApiResponse extends BaseApiResponse {
  results: Movie[];
}
