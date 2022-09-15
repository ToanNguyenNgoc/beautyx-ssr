import axiosClient from "./axios";

class Tag {
    getAll = (values) => {
        const url = `/tags`;
        const params = {
            filter: "ORGANIZATION",
            include: "children|media",
            sort: "-organizations_count",
        };
        return axiosClient.get(url, { params });
    };
    getServicesChild = () => {
        const url = `/tags`;
        const params = {
            "filter[group]": "SERVICE",
            include: "parent.media|media",
            sort: "-organizations_count",
        };
        return axiosClient.get(url, { params });
    };
    getProducts = () => {
        const url = `/tags`;
        const params = {
            "filter[group]": "PRODUCT",
            include:
                "parent.media|children.media|media",
            sort: "-organizations_count",
        };
        return axiosClient.get(url, { params });
    };
}
const tagsApi = new Tag();
export default tagsApi;
