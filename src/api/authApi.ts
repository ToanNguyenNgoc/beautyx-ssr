import {axiosClient} from "config";
import { identity, pickBy } from "lodash";
import { paramsUserProfile } from "params-query";
import { ParamsForgotSms } from "interface"

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
  getUserProfile = (token?: string) => {
    const url = `/users/profile`
    return axiosClient.get(url, {params:paramsUserProfile})
  };
  forgotPassword = (values: any) => {
    const url = `/auth/forgot`;
    const params = values
    return axiosClient.post(url, params)
  };
  forgotVoiceSms = (params: ParamsForgotSms) => {
    const url = '/auth/forgotvoicesms';
    return axiosClient.post(url, params)
  }
  putUserProfile = (params: any) => {
    const url = `/users/profile`;
    return axiosClient.put(url, pickBy(params, identity))
  };
  refreshToken = (token: string) => {
    const url = '/auth/refresh'
    return axiosClient.post(url, {
      'refresh_token': token,
      'platform': 'BEAUTYX'
    })
  }

}
const authentication = new Auth();
export const auth = new Auth()
export default authentication;
