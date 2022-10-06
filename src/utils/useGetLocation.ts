import useFetch from "./useFetch"

function useGetLocation(req: string) {
    let q_location
    const keyMapBox = process.env.REACT_APP_MAPBOX_TOKEN
    const API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?access_token=${keyMapBox}&language=vi&country=vn`
    const { response } = useFetch(API_URL)
    if (response) {
        const LatLng = response.features?.length > 0 ? response.features[0]?.center?.reverse().join(",") : ""
        q_location = LatLng
    }
    return { q_location }
}
export default useGetLocation