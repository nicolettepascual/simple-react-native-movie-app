interface BaseApiResponse {
  success: boolean;
}

interface LoginApiResponse extends BaseApiResponse {
  request_token: string;
}
