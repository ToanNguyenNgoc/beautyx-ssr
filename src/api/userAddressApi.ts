import { AUTH_HEADER, AUTH_HEADER_PARAM_GET } from "./authHeader";
import axiosClient from "./axios";
class UserAddress {
    getAll = (session: any, local: any) => {
        const url = `/useraddresses`;
        const params = {
            limit: 15,
            page: 1
        }
        if (localStorage.getItem("_WEB_TK") || window.sessionStorage.getItem("_WEB_TK")) {
            return axiosClient.get(url, {
                params,
                headers: {
                    Authorization: `Bearer ${session ? session : local}`,
                },
            });
        }
    }
    getAddress = () => {
        const url = `/useraddresses`;
        const params = {
            limit: 15,
            page: 1
        }
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params));
    }
    postAddress = (values: any) => {
        const url = `/useraddresses`;
        const params = {
            "address": values.address,
            "is_default": values.is_default,
            "is_bookmark": true
        }
        return axiosClient.post(url, params, AUTH_HEADER());
    }

    deleteAddress = (id: number) => {
        const url = `/useraddresses/${id}`;
        if (localStorage.getItem("_WEB_TK") || window.sessionStorage.getItem("_WEB_TK")) {
            return axiosClient.delete(url, AUTH_HEADER());
        }
    }
    updateAddress = (values: any) => {
        const url = `/useraddresses/${values.id}`;
        const params = {
            "address": values.address,
            "is_default": true,
        }
        return axiosClient.put(url, params, AUTH_HEADER());
    }
    updateAddressCancelDefault = (values: any) => {
        const url = `/useraddresses/${values.id}`;
        const params = {
            "address": values.address,
            "is_default": false
        }
        return axiosClient.put(url, params, AUTH_HEADER());
    }
}
const userAddressApi = new UserAddress();
export default userAddressApi;