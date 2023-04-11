import axiosClient from './axios';

class Banners {
      getAll = () => {
            const url = `/banners`
            const params = {
                  page: 1,
                  limit: 15,
                  'filter[platform]': 'MOMO',
                  'sort': '-priority|-created_at',
            }
            return axiosClient.get(url, { params })
      }
}
const bannersApi = new Banners();
export default bannersApi