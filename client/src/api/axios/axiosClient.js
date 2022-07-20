import axios from "axios";

//import tokenService from "../services/token.service.js";

//cau hinh axios
// const axiosClient = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// axiosClient.interceptors.request.use(async (config) => {
//   const customHeaders = {};

//   const accessToken = tokenService.getLocalAccessToken();
//   if (accessToken) {
//     Object.assign(customHeaders, { "x-access-token": accessToken });
//     console.log("Access token", customHeaders);
//   }

//   return {
//     ...config,
//     headers: {
//       ...customHeaders, // auto attach token
//       ...config.headers, // but you can override for some requests
//     },
//   };
// });
// axiosClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log("axios.interceptors.response.use: ", error);
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       originalRequest.url.includes("account/refreshtoken")
//     ) {
//       store.commit("user/clearUserData");
//       router.push("/account/login");
//       return Promise.reject(error);
//     } else if (error.response.status === 401 && !originalRequest._retry) {
//       console.log("axios.interceptors.response.use: ");
//       originalRequest._retry = true;
//       return store.dispatch("user/refreshToken").then((accessToken) => {
//         console.log("get accessToken success", accessToken);
//         return axiosClient(originalRequest);
//       });
//     }
//     return Promise.reject(error);
//   }
// );
const axiosSetup = (store, router) => {
  axios.interceptors.request.use(async (config) => {
    const customHeaders = {};
    // console.log("axios.interceptors.request.use");
    const accessToken = store.getters["user/getAccessToken"]; //tokenService.getLocalAccessToken();
    if (accessToken) {
      const Authorization = "x-access-token";
      Object.assign(customHeaders, { "x-access-token": accessToken });
      config.headers = { [Authorization]: accessToken };
      // Object.assign(config.headers, { "x-access-token": accessToken });

      console.log("Access token", config);
    }
    return config;
  });
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("axios.interceptors.response.use: ", error);
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url.includes("account/refreshtoken")
      ) {
        store.commit("user/clearUserData");
        router.push("/account/login");
        return Promise.reject(error);
      } else if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("account/login")
      ) {
        console.log(
          "axios.interceptors.response.use: gui refreshToken để lấy accesstoken"
        );
        originalRequest._retry = true;
        await store.dispatch("user/refreshToken");
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};
export default axiosSetup;
