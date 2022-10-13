const keyMapBox = process.env.REACT_APP_MAPBOX_TOKEN

const API_3RD = {
    // API_NODE: "https://f0f1-42-117-89-185.ap.ngrok.io/v1"
    API_NODE: "https://api-node-myspa.vercel.app/v1",
    API_MAP_BOX: (lat: string | number, lng: string | number) => {
        return `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${keyMapBox}&language=vi&country=vn`
    }
}
export default API_3RD