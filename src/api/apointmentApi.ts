import {axiosClient} from "config";
import { identity, pickBy } from 'lodash'

class ApointmentApi {
  postAppointment = (paramsOb: any, org_id: any) => {
    const params = pickBy(paramsOb, identity)
    const url = `organizations/${org_id}/appointments`;
    return axiosClient.post(url, params);
  };
}
const apointmentApi = new ApointmentApi();
export default apointmentApi;
