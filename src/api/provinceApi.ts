import {axiosClient} from "config";

class Provinces {
      getAll = () => {
            const url = `/provinces`
            const params = {
                  type: 'PROVINCE',
                  sort: '-organizations_count|branches_count',
                  include: 'media'
            }
            return axiosClient.get(url, { params })
      }
      //get list district by province code
      getDistricts = (province_code: number | null) => {
            const url = `provinces/${province_code}/districts`;
            return axiosClient.get(url);
      }
      //get list ward by district code 
      getWards = (district_code: number | null) => {
            const url = `districts/${district_code}/wards`;
            if (district_code) {
                  return axiosClient.get(url)
            }
      }
}
const provincesApi = new Provinces();
export default provincesApi