import axiosClient from "./axios";
import { identity, pickBy } from "lodash";
import { AUTH_HEADER, AUTH_HEADER_PARAM_GET } from "./authHeader";
import { paramsUserProfile } from "params-query";

class Auth {
  login = (values: any) => {
    const url = `/auth/login`;
    const params = {
      ...values,
      "platform": "BEAUTYX"
    }
    return axiosClient.post(url, params);
  };
  register = (params: any) => {
    const url = `/auth/register`;
    return axiosClient.post(url, params);
  };
  getUserProfile = () => {
    const url = `/users/profile`
    if (localStorage.getItem("_WEB_TK") || window.sessionStorage.getItem("_WEB_TK")) {
      return axiosClient.get(url, AUTH_HEADER_PARAM_GET(paramsUserProfile));
      // return axiosClient.get(url);
    }
  };
  forgotPassword = (values: any) => {
    const url = `/auth/forgot`;
    const params = values
    return axiosClient.post(url, params)
  };
  putUserProfile = (params: any) => {
    const url = `/users/profile`;
    return axiosClient.put(url, pickBy(params, identity), AUTH_HEADER())
  };
  refreshToken = (token: string) => {
    const url = '/auth/refresh'
    return axiosClient.post(url, {
      'refresh_token': token,
      'platform': 'BEAUTYX'
    }, AUTH_HEADER())
  }

}
const authentication = new Auth();
export const auth = new Auth()
export default authentication;
