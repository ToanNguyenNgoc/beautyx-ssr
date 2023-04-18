import axios from "axios";
import queryString from "query-string";
import { handleValidToken } from "./authHeader";
import { EXTRA_FLAT_FORM } from "./extraFlatForm";
import { IRefreshToken, Response } from "interface";

// export const baseURL = process.env.REACT_APP_API_URL;
export const baseURL = process.env.REACT_APP_API_DEV;
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('_WEB_TK') ?? sessionStorage.getItem('_WEB_TK')}`
  },
  paramsSerializer: {
    encode: (param: string) => { },
    serialize: (params) => queryString.stringify(params),
    indexes: false,
  },
});
axiosClient.interceptors.request.use(async (config) => {
  const { refresh, token_refresh, token } = handleValidToken()
  const platform = EXTRA_FLAT_FORM()
  if (refresh) {
    try {
      const response = await axios.post<Response<IRefreshToken>>(
        `${baseURL}auth/refresh`,
        { refresh_token: token_refresh, platform: platform },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (localStorage.getItem('_WEB_TK')) localStorage.setItem('_WEB_TK', response.data?.context?.token)
      if (sessionStorage.getItem('_WEB_TK')) sessionStorage.setItem('_WEB_TK', response.data?.context?.token)
      localStorage.setItem('_WEB_TK_EX', response.data?.context?.token_expired_at)
      config.headers.Authorization = `Bearer ${response.data?.context?.token}`
    } catch (error) { }
  }
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

export default axiosClient;
