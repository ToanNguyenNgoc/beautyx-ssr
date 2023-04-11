import axiosClient from './axios'

class ComboApi {
      getByOrg_id = (values: any) => {
            //organizations/4/treatment_combo?page=1&limit=12
            const url = `/organizations/${values.org_id}/treatment_combo`;
            const params = {
                  page: values.page,
                  limit: 15,
                  "filter[is_momo_ecommerce_enable]": true,
                  "include": "products|services"
            }
            return axiosClient.get(url, { params });
      };
      getComboDetail = (values: any) => {
            const url = `/organizations/${values.org_id}/treatment_combo/${values.com_id}`
            const params = {
                  include: "products|services"
            }
            return axiosClient.get(url, { params })
      }
}
const comboApi = new ComboApi()
export default comboApi