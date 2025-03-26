import axios from "axios";
import { logoutUserAction } from "./authRedux/AuthActions";

// ` Configure axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3150/api/v1",
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// export const setupAxiosInterceptors = (logoutCallback) => {
//   axiosInstance.interceptors.response.use(
//     (response) => response, // ✅ Return successful response
//     (error) => {
//       if (error.response) {
//         const { status, config } = error.response;

//         // 🔹 Check if the request was NOT to login API
//         const isLoginRequest = config.url.includes("/auth/signin");

//         if (status === 401 && !isLoginRequest) {
//           console.error("Session expired! Logging out...");

//           if (typeof logoutCallback === "function") {
//             logoutCallback();
//           } else {
//             console.warn("Logout callback is not defined.");
//           }
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// ~ Export the axios instance and setup function
export { axiosInstance };
