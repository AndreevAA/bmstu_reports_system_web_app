import axios from 'axios';
import authHeader from './auth-header';
// import {Http, Headers, Response } from "@angular/http";

const API_URL = 'http://localhost:8000/api/v1/reports';

class UserService {

  getPublicContent() {

    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);

    // if (user && user.accessToken) {
    //   return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    //   // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    // } else {
    //   return { Authorization: '' }; // for Spring Boot back-end
    //   // return { 'x-access-token': null }; // for Node Express back-end
    // }

    const config = {
      headers:{
        Authorization: 'Bearer ' + user.accessToken,
      },
    };

    return axios.get(API_URL, config);
  }

  getUserBoard() {
    return this.getPublicContent();
    // return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
