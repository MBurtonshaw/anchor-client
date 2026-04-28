import { api } from '../api';

export function login(user) {
  return api('/users/login', 'POST', user);
}

export function register(user) {
  return api('/users', 'POST', user);
}