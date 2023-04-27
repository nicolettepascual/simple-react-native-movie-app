const api = "https://api.themoviedb.org/3";

// The api key is ok to be exposed, it's free and only for self study. I know that the corretly way is to store in a .env file.
const key = "024d69b581633d457ac58359146c43f6";

const defaultContent = {
  api_key: key,
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
      throw new Error(data.message || "Something went wrong");
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

export default async function request<T>(
  url: string,
  content = {},
): Promise<T> {
  const obj = { ...defaultContent, ...content };

  const response = await fetch(`${api}/${url}?${queryString(obj)}`);

  return handleApiResponse<T>(response);
}
