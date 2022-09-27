import axiosClient from "./axios";

class MobaGalleries {
    getByOrgId = (org_id: any) => {
        const url = `/organizations/${org_id}/moba_galleries`;
        const params = {
            page: 1,
            include: "images|videos",
        };
        return axiosClient.get(url, {
            params : {
            page: 1,
            limit: 15,
            include: "images|videos"
        }});
    };
}
const galleriesApi = new MobaGalleries();
export default galleriesApi;
