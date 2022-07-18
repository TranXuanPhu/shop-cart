import url from "../index.js";
import axios from "axios";

class AccountService {
  async register(user) {
    return await axios.post(url.register, {
      email: user.email,
      fullName: user.fullName,
      userName: user.userName,
      password: user.password,
    });
  }
  async login(user) {
    return await axios
      .post(url.login, {
        userName: user.userName,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new AccountService();
