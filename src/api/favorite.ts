import axiosClient from "./axios";
import { pickBy, identity } from 'lodash';
import { AUTH_HEADER, AUTH_HEADER_PARAM_DELE } from "./authHeader";

interface IPostFavoriteItem {
    org_id: number,
    product_id?: any,
    service_id?: any
}

class Favorite {
    postFavorite = (org_id: number) => {
        const params = {
            organization_id: org_id,
        };
        const url = `/favorites`;
        return axiosClient.post(url, params, AUTH_HEADER());
    };
    deleteFavorite = (org_id: number) => {
        const url = `/favorites`;
        const values = {
            organization_id: org_id,
        };
        return axiosClient.delete(url, AUTH_HEADER_PARAM_DELE(values));
    };
    postFavoriteItem = (values: IPostFavoriteItem) => {
        const url = `/favorites`;
        const paramOb = {
            organization_id: values.org_id,
            product_id: values.product_id,
            service_id: values.service_id,
        }
        const params = pickBy(paramOb, identity)
        return axiosClient.post(url, params, AUTH_HEADER())
    };
    deleteFavoriteItem = (values: IPostFavoriteItem) => {
        const url = `/favorites`;
        const paramOb = {
            organization_id: values.org_id,
            product_id: values.product_id,
            service_id: values.service_id,
        }
        const params = pickBy(paramOb, identity)
        return axiosClient.delete(url, AUTH_HEADER_PARAM_DELE(params))
    }
}
const favorites = new Favorite();
export default favorites;
