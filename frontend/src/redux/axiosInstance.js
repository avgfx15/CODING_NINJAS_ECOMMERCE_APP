import axios from "axios";

// ` Configure axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3150/api/v1",
  withCredentials: true,
});

// ` Add Interceptor to axios instance
const setupAxiosInterceptors = (logoutCallback) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // $ Call the logout callback
        logoutCallback();
      }
      return Promise.reject(error);
    }
  );
};

// ~ Export the axios instance and setup function
export { axiosInstance, setupAxiosInterceptors };
