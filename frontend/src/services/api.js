const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function getAuthToken() {
  return localStorage.getItem('token');
}

function setAuthToken(token) {
  localStorage.setItem('token', token);
}

function removeAuthToken() {
  localStorage.removeItem('token');
}

async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  apiRequest,
};
