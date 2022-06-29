import axiosClient from "./axios";

class NewsApi {
    getAll = () => {
        const params = {
            page: 1,
            limit: 5,
            // _fields: "id,modified,title,content,categories,better_featured_image,_links",
            categories: 8,
            order: "desc",
            orderby: "modified",
        };
        const url = `/posts`;
        return axiosClient.get(url, {
            params,
            baseURL: "https://beautyx.vn/blog/index.php/wp-json/wp/v2",
        });
    };

    getAuthorById = (props: any) => {
        const url = `/`;
        return axiosClient.get(url, {
            baseURL: props,
        });
    };
    getVideo = () => {
        const url = `/posts`;
        const params = {
            page: 1,
            limit: 5,
            order: "desc",
            orderby: "modified",
            categories: 7,
        };
        return axiosClient.get(url, {
            params,
            baseURL: "https://beautyx.vn/blog/index.php/wp-json/wp/v2",
        });
    };
    getTrendsVideo = () => {
        const url = `/posts`;
        const params = {
            page: 1,
            limit: 5,
            order: "desc",
            orderby: "modified",
            categories: 10,
        };
        return axiosClient.get(url, {
            params,
            baseURL: "https://beautyx.vn/blog/index.php/wp-json/wp/v2",
        });
    };
}
const newsApi = new NewsApi();
export default newsApi;
