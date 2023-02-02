import axiosClient from "./axios";

class BannerApi {
  getAll = () => {
    const params = {
      page: 1,
      limit: 15,
      platform: "MOMO",
      sort: "-priority|-created_at",
      // sort: "-created_at",
    };
    const url = `/banners`;
    return axiosClient.get(url, { params });
  };
}
const bannerApi = new BannerApi();
export default bannerApi;