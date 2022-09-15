import axios from "axios";
import queryString from "query-string";

// export const baseURL = process.env.REACT_APP_API_TEST;
// export const baseURL = process.env.REACT_APP_API_URL;
export const baseURL = process.env.NEXT_PUBLIC_API_URL;
const axiosServer = axios.create({
    baseURL: "/v1",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosServer.interceptors.request.use(async (config) => {
    return config;
});
axios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);
export default axiosServer;

