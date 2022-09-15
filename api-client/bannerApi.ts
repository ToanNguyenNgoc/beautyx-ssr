import axiosClient from './axios'

class BannerApi {
	getAll = () => {
		const url = `/banners`
		const params = {
			page: 1,
			limit: 15,
			platform: 'MOMO',
			sort: '-created_at',
		}
		return axiosClient.get(url, { params })
	}
}
const bannerApi = new BannerApi()
export default bannerApi
