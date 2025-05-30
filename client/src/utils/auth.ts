
import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
     const token = this.getToken();
    if (!token) {
      return null; // No token found
    }
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null; // Return null if decoding fails
    }
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp ? decoded.exp < currentTime : true; // If exp is not set, consider it expired
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.href = '/';
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.href = '/login';
  }
}

export default new AuthService();
