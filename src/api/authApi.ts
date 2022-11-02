import axiosClient from "./axios";
import { AUTH_HEADER } from "../utils/authHeader";
import { identity, pickBy } from "lodash";

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
    const url = `/users/profile`;
    if (localStorage.getItem("_WEB_TK") || window.sessionStorage.getItem("_WEB_TK")) {
      return axiosClient.get(url, AUTH_HEADER());
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
  }

}
const authentication = new Auth();
export const auth = new Auth()
export default authentication;
