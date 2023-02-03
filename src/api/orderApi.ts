import axiosClient from './axios';
import { pickBy, identity } from 'lodash'
import { AUTH_HEADER, AUTH_HEADER_PARAM_GET } from './authHeader';

class Order {
      getOrderById = (order_id: number) => {
            return axiosClient.get(
                  `/orders/${order_id}`,
                  AUTH_HEADER_PARAM_GET({
                        'include': 'btxReward',
                        'filter[productable]': false
                  })
            )
      }
      postOrder = (org_id: number, params: object) => {
            const data = JSON.stringify(pickBy(params, identity));
            const url = `/organizations/${org_id}/orders`;
            return axiosClient.post(url, data, AUTH_HEADER())
      }
}
const order = new Order();
export const orderApi = new Order()
export default order