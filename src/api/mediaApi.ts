import {axiosClient} from "config";

class Media {
    postMedia = (formData: any) => {
        const url = `media`;
        return axiosClient.post(url, formData, {
            headers:{'Content-Type':'multipart/form-data'}
        })
    }
}
const mediaApi = new Media();
export default mediaApi