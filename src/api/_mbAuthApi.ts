import axiosClient from "./axios";
import {identity, pickBy} from 'lodash'

class MBAUTH {
    login = (props: any) => {
        const url = `/auth/mbbank`;
        // "customerId": "string",
        // "avatar": "string",
        // "email": "string",
        // "name": "string",
        // "phone": "string",
        // "authCode": "string"
        const paramsOb = {
            "token": props.token,
            "telephone": props.telephone,
            "code": props.code,
            "verification_id": props.verification_id
        }
        const params = pickBy(paramsOb, identity)
        return axiosClient.post(url, params)
    }
}
const mbAuthApi = new MBAUTH();
export default mbAuthApi