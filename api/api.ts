// FIXME: I know the following variables should be stored in a .env file.
// The API key is ok to be exposed for now as it's free and also only for testing/self study.
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "024d69b581633d457ac58359146c43f6";

const defaultContent = {
  api_key: API_KEY,
  language: "en-US",
};

function queryString(obj: any) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join("&");
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    if (response.ok) {
      return data as T;
    } else {
      throw new Error(
        data.message || data.status_message || "Something went wrong"
      );
    }
  } else {
    const text = await response.text();
    if (response.ok) {
      return text as unknown as T;
    } else {
      throw new Error(text || "Something went wrong");
    }
  }
}

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiRequest {
  url: string;
  content?: object;
  method?: ApiMethod;
  sessionId?: string | null;
  accountId?: string | null;
  page?: number;
  movieId?: string | null;
  apiUrlWithSessionId?: boolean;
}

export async function request<T>({
  url,
  content = {},
  method = "GET",
  sessionId = undefined,
  accountId = undefined,
  page,
  movieId,
  apiUrlWithSessionId = false,
}: ApiRequest): Promise<T> {
  const obj = page
    ? { ...defaultContent, ...content, page: page }
    : { ...defaultContent, ...content };

  const requestOptions: any = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionId && sessionId !== undefined)
    requestOptions.headers.Authorization = `Bearer ${sessionId}`;

  if (method === "POST" || method === "PUT" || method === "DELETE")
    requestOptions.body = JSON.stringify(obj);

  let apiUrl = `${API_URL}/${url}?${queryString(obj)}`;

  if (movieId) {
    apiUrl = apiUrl.replace("{movie_id}", movieId);
  }
  if (apiUrlWithSessionId && sessionId) {
    apiUrl += `&session_id=${sessionId}`;
  }
  if (accountId) {
    apiUrl = apiUrl.replace("{account_id}", accountId);
  }

  console.log({ apiUrl, requestOptions });

  const response = await fetch(`${apiUrl}`, requestOptions);

  return handleApiResponse<T>(response);
}
