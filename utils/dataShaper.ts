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

interface AccountApiResponse extends BaseApiResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
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
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genres?: {
    name: string;
  }[];
  runtime?: number;
  rating?: number;
}

interface MoviesApiResponse extends BaseApiResponse {
  results: Movie[];
}

interface SearchApiResponse extends BaseApiResponse {
  results: Movie[];
}

interface ReviewAuthor {
  name: string;
  username: string;
  avatar_path: string;
}

interface Review {
  id: string;
  author_details: ReviewAuthor;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

interface Account {
  avatarPath: string;
  accountId: number;
  name: string;
  username: string;
}
