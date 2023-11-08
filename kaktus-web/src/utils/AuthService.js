import axios from 'axios';
const API_URL = 'http://localhost:8000/api/v1/auth/';

class AuthService {
  login = (data) => {
    axios
      .post(API_URL + 'login', data)
      .then((res) => {
        if (res.data.access.token) {
          localStorage.setItem('user', JSON.stringify(res.data.access));
        }
        return res.data.access;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  logout = () => {
    localStorage.removeItem('user');
  };

  register = (data) => {
    axios.post(API_URL + 'register', data).catch((error) => {
      console.error(error);
    });
  };
}

export default new AuthService();
