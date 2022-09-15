import axiosClient from "./axios";
import { pickBy, identity } from 'lodash';
class MOMOAuth {
    login = (data: any) => {
        const url = `/auth/momo`;
        const paramsOb = {
            "fullname": data.name,
            "email": data.email,
            "telephone": data.phone
        }
        // alert(JSON.stringify(paramsOb))
        const params = pickBy(paramsOb, identity);
        return axiosClient.post(url, params)
    }
}
const momoAuthApi = new MOMOAuth();
export default momoAuthApi