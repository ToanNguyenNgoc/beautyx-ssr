import axiosClient from './axios';
import { EXTRA_FLAT_FORM } from './extraFlatForm';
import { pickBy, identity } from 'lodash'
import { AUTH_HEADER, AUTH_HEADER_PARAM_GET } from './authHeader';

class Order {
      getOrder = (page: number) => {
            const url = `/orders?sort=-id&page=${page}&limit=4`;
            return axiosClient.get(url, AUTH_HEADER())
      }
      getOrders = (values: any) => {
            const FLAT_FORM = EXTRA_FLAT_FORM();
            const url = '/orders'
            const paramsOb = {
                  page: values.page,
                  limit: 15,
                  include: 'items|items_count|organization',
                  sort: '-created_at',
                  'filter[platform]': FLAT_FORM,
                  'filter[productable]': true,
                  "filter[status]": values.status,
                  "append":"qr_link"
            }
            return axiosClient.get(url, AUTH_HEADER_PARAM_GET(pickBy(paramsOb, identity)))
      }
      postOrder = (org_id: number, params: object) => {
            const data = JSON.stringify(params);
            const url = `/organizations/${org_id}/orders`;
            return axiosClient.post(url, data, AUTH_HEADER())
      }
}
const order = new Order();
export default order