import { AUTH_HEADER } from "./authHeader";
import axiosClient from "./axios";

class Media {
    postMedia = (formData: any) => {
        const url = `media`;
        return axiosClient.post(url, formData, AUTH_HEADER())
    }
}
const mediaApi = new Media();
export default mediaApi