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
      throw new Error(data.message || data.status_message || "Something went wrong");
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

export async function request<T>(
  url: string,
  content = {},
  method = "GET",
  sessionId?: string
): Promise<T> {
  const obj = { ...defaultContent, ...content };

  const requestOptions: any = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (sessionId !== undefined) {
    requestOptions.headers.Authorization = `Bearer ${sessionId}`;
  }

  if (method === "POST" || method === "PUT" || method === "DELETE") {
    requestOptions.body = JSON.stringify(obj);
  }

  const response = await fetch(
    `${API_URL}/${url}?${queryString(obj)}`,
    requestOptions
  );

  return handleApiResponse<T>(response);
}
