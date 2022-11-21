import axios from "axios";
import printValue from "yup/es/util/printValue";

const API_URL = "http://localhost:8000/api/v1/accounts/";

class AuthService {

  login(username: string, password: string) {
    const loginBody = JSON.stringify({ username: username, password: password });
    var customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // printValue(axios.post(API_URL, loginBody, customConfig));

    return axios
      .postForm(API_URL + "login/", loginBody, customConfig)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, name: string, email: string, password: string) {
    const loginBody = JSON.stringify({ username: username, name: name, email: email, password: password });
    var customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return axios.postForm(API_URL + "register/", loginBody, customConfig);
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
