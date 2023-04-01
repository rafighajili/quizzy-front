import jwt_decode from 'jwt-decode';

export default function useRole() {
  const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');

  var currentRole;

  if (token) {
    const { role } = jwt_decode(token);
    currentRole = role;
  }

  return currentRole;
}
