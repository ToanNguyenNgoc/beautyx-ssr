import axiosClient from "./axios";
import { AUTH_HEADER } from "../utils/authHeader";

class Media {
    postMedia = (formData: any) => {
        const url = `media`;
        return axiosClient.post(url, formData, AUTH_HEADER())
    }
}
const mediaApi = new Media();
export default mediaApi