import { getCookie } from 'cookies-next';

export function getToken() {
  return getCookie('token');
}

export function getRole() {
  return getCookie('role');
}
