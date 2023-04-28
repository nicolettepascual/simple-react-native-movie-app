interface BaseApiResponse {
  success: boolean;
}

interface LoginApiResponse extends BaseApiResponse {
  request_token: string;
}

interface SessionApiResponse extends BaseApiResponse {
  session_id: string;
}
