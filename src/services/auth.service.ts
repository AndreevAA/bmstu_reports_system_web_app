import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/accounts/";

class AuthService {
  login(username: string, password: string) {
    const login_user_data = JSON.stringify({username: username, password: password});

    return axios
      .post(API_URL + "login", login_user_data)
      .then(response => {
        console.log(response.data);
        debugger
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, name: string, password: string) {
    const register_user_data = JSON.stringify({username: username, email: email, name: name, password: password});

    return axios.post(API_URL + "register", register_user_data);
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
