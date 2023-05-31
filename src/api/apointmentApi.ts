import axiosClient from "./axios";
import { identity, pickBy } from 'lodash'
import { AUTH_HEADER } from "./authHeader";

class ApointmentApi {
  postAppointment = (paramsOb: any, org_id: any) => {
    const params = pickBy(paramsOb, identity)
    const url = `organizations/${org_id}/appointments`;
    return axiosClient.post(url, params, AUTH_HEADER());
  };
}
const apointmentApi = new ApointmentApi();
export default apointmentApi;
