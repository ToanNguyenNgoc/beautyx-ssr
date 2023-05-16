import { axiosClient } from "config";

class UserAddress {
    getAll = () => {
        const url = `/useraddresses`;
        return axiosClient.get(url, { params: { limit: 15, page: 1 } })
    }
    postAddress = (values: any) => {
        const url = `/useraddresses`;
        const params = {
            "address": values.address,
            "is_default": values.is_default,
            "is_bookmark": true
        }
        return axiosClient.post(url, params);
    }

    deleteAddress = (id: number | string) => {
        const url = `/useraddresses/${id}`;
        return axiosClient.delete(url);
    }
    updateAddress = (values: { id: number | string, address?: string }) => {
        const url = `/useraddresses/${values.id}`;
        const params = {
            "address": values.address,
            "is_default": true,
        }
        return axiosClient.put(url, params);
    }
    updateAddressCancelDefault = (values: any) => {
        const url = `/useraddresses/${values.id}`;
        const params = {
            "address": values.address,
            "is_default": false
        }
        return axiosClient.put(url, params);
    }
}
const userAddressApi = new UserAddress();
export default userAddressApi;