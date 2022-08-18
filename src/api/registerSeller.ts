import axios from "axios";
import queryString from "query-string";

const axiosClientSeller = axios.create({
    baseURL: "https://4659-42-117-36-77.ap.ngrok.io/myspa_website",
    headers: {
        // Accept: "application/json",
        "Content-Type": "multipart/form-data",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClientSeller.interceptors.request.use(async (config) => {
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
class Register {
    post = (params:any) => {
          const url = `/Frontend/register_momo`;
          return axiosClientSeller.post(url, params)
    }
}
const registerSeller = new Register();
export default registerSeller