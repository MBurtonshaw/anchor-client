import config from './config';

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

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or navigate via router
    return;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return null;
}

