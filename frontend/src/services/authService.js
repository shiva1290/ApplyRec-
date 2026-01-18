import { apiRequest, setAuthToken, removeAuthToken } from './api';

async function signup(email, password) {
  const response = await apiRequest('/auth/signup', {
    method: 'POST',
    body: { email, password },
  });
  setAuthToken(response.token);
  return response;
}

async function login(email, password) {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  setAuthToken(response.token);
  return response;
}

function logout() {
  removeAuthToken();
}

export {
  signup,
  login,
  logout,
};
