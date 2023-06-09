import axios from "axios";
import queryString from "query-string";
import { IRefreshToken, Response } from "interface";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { handleValidToken } from "config/header.config";
import { LOCAL_TK } from "common";

// export const baseURL = process.env.REACT_APP_API_URL;
export const baseURL = process.env.REACT_APP_API_DEV;
export const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json"
  },
  paramsSerializer: {
    encode: (param: string) => { },
    serialize: (params) => queryString.stringify(params),
    indexes: false,
  },
});
axiosClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(LOCAL_TK) ?? sessionStorage.getItem(LOCAL_TK)}`
  const { refresh, token_refresh, token } = handleValidToken()
  const platform = EXTRA_FLAT_FORM()
  if (refresh) {
    try {
      const response = await axios.post<Response<IRefreshToken>>(
        `${baseURL}auth/refresh`,
        { refresh_token: token_refresh, platform: platform },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (localStorage.getItem(LOCAL_TK)) localStorage.setItem(LOCAL_TK, response.data?.context?.token)
      if (sessionStorage.getItem(LOCAL_TK)) sessionStorage.setItem(LOCAL_TK, response.data?.context?.token)
      localStorage.setItem('_WEB_TK_EX', response.data?.context?.token_expired_at)
      config.headers.Authorization = `Bearer ${response.data?.context?.token}`
    } catch (error) {
      localStorage.removeItem('_WEB_TK_EX')
      localStorage.removeItem('_WEB_TK_RE')
      localStorage.removeItem('_WEB_TK_RE')
    }
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    throw error;
  }
);
