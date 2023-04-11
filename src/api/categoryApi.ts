import axiosClient from './axios';
import { pickBy, identity } from 'lodash'

class CategoryApi {
      getByOrgId = (org_id: any) => {
            const url = `/organizations/${org_id}/product_categories`;
            const paramsOb = {
                  page: 1,
                  limit: 15,
                  include: "productsCount"
            }
            const params = pickBy(paramsOb, identity)
            return axiosClient.get(url, { params });
      }
      getByOrgId_services = (values: any) => {
            const url = `/organizations/${values.org_id}/service_categories`;
            const paramsOb = {
                  page: 1,
                  limit: 15,
                  include: "servicesCount",
            }
            const params = pickBy(paramsOb, identity)
            return axiosClient.get(url, { params });
      }
}
const categoryApi = new CategoryApi();
export default categoryApi