import axios from "axios";
import { logoutUserAction } from "./authRedux/AuthActions";

// ` Configure axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3150/api/v1",
  withCredentials: true,
});

// ` Add Interceptor to axios instance
// const setupAxiosInterceptors = (logoutCallback) => {
//   axiosInstance.interceptors.response.use(
//     (response) => response, // Return successful response
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         console.error("Unauthorized! Logging out...");

//         if (typeof logoutCallback === "function") {
//           logoutCallback();
//         } else {
//           console.warn("Logout callback is not defined.");
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

export const setupAxiosInterceptors = (logoutCallback) => {
  axiosInstance.interceptors.response.use(
    (response) => response, // ✅ Return successful response
    (error) => {
      if (error.response) {
        const { status, config } = error.response;

        // 🔹 Check if the request was NOT to login API
        const isLoginRequest = config.url.includes("/auth/signin");

        if (status === 401 && !isLoginRequest) {
          console.error("Session expired! Logging out...");

          if (typeof logoutCallback === "function") {
            logoutCallback();
          } else {
            console.warn("Logout callback is not defined.");
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

// ✅ Pass logout function
setupAxiosInterceptors(() => {
  store.dispatch(logoutUserAction());
});

// ~ Export the axios instance and setup function
export { axiosInstance };
