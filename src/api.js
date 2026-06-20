import config from './config';
import { ApiError } from './components/utils/ApiError';

export async function api(path, method = 'GET', body = null) {
  const url = config.apiBaseUrl + path;
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  const contentType = response.headers.get("content-type");

  let data = null;

  if (contentType?.includes("application/json")) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text().catch(() => null);
  }

  const message =
  data?.message ||
  data?.error?.message ||
  (typeof data === "string" ? data : null) ||
  "Request failed";

  if (!response.ok) {
    throw new ApiError(message, response.status, data);
  }

  if (response.status === 204) {
    return null;
  }

  return data;
}