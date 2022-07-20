import url from "../index.js";
//import axiosClient from "../axios/axiosClient.js";
import axios from "axios";
import tokenService from "./token.service.js";
class AccountService {
  register(user) {
    return axios.post(url.register, {
      email: user.email,
      fullName: user.fullName,
      userName: user.userName,
      password: user.password,
    });
  }
  login(user) {
    return axios
      .post(url.login, {
        userName: user.userName,
        password: user.password,
      })
      .then((response) => {
        const user = response.data.user;
        if (user) {
          console.log("login:", user);
          tokenService.setUser(user);
        }
        return user;
      });
  }
  logOut() {
    tokenService.removeUser();
  }
  refreshToken(token) {
    return axios
      .post(url.refreshtoken, { refreshToken: token })
      .then((response) => {
        console.log("account/refresh thành công:", response);
        const user = response.data.user;
        tokenService.updateLocalAccessToken(user.accessToken);
        return user.accessToken;
      })
      .catch((error) => {
        console.error("account/refresh loi roi: ", error);
        return error;
      });
  }
}

export default new AccountService();
