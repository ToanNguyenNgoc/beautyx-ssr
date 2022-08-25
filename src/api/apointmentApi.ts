import axiosClient from "./axios";
import { AUTH_HEADER_PARAM_GET, AUTH_HEADER } from "../utils/authHeader";
import { EXTRA_FLAT_FORM } from "./extraFlatForm";
import { identity, pickBy } from 'lodash'

class ApointmentApi {
  sendApointment = (props: any) => {
    const url = "organizations/" + props.orgId + "/appointments/";

    return axiosClient.post(
      url,
      {
        ...props.apointment,
      },
      {
        headers: {
          Authorization: "Bearer " + props.token, // headers token
        },
      }
    );
  };
  // get detail appointment by id
  getAppointmentById = (id: any) => {
    //const session = window.sessionStorage.getItem("_WEB_TK");
    //const local = localStorage.getItem("_WEB_TK");
    const url = `appointments/${id}`;
    if (localStorage.getItem("_WEB_TK")) {
      return axiosClient.get(url, AUTH_HEADER());
    }
  };
  getAppoitment = (time: any) => {
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const url = 'appointments';
    const params = {
      page: 1,
      limit: 300,
      "filter[time_start]": time,
      // "filter[platform]": FLAT_FORM,
      "append": "services",
      "include": "organization|order|branch",
      "sort": "-id"
    }
    return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params));
  };
  postAppointment = (paramsOb: any, org_id: any) => {
    //const session = window.sessionStorage.getItem("_WEB_TK");
    //const local = localStorage.getItem("_WEB_TK");
    const params = pickBy(paramsOb, identity)
    const url = `organizations/${org_id}/appointments`;
    return axiosClient.post(url, params, AUTH_HEADER());
  };
}
const apointmentApi = new ApointmentApi();
export default apointmentApi;
