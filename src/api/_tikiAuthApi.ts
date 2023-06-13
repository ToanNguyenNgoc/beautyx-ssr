import {axiosClient} from "config";
import {identity, pickBy} from 'lodash'

class TIKIAuth {
    login = (paramsOb: any) => {
        const url = `/auth/tiki`;
        // "customerId": "string",
        // "avatar": "string",
        // "email": "string",
        // "name": "string",
        // "phone": "string",
        // "authCode": "string"
        const params = pickBy(paramsOb, identity)
        return axiosClient.post(url, params)
    }
}
const tikiAuthApi = new TIKIAuth();
export default tikiAuthApi