export const AUTH_LOCATION = () => {
    const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)
    let LOCATION;
    LOCATION = `${location_user?.lat},${location_user?.long}`;
    if (location_user) return LOCATION
}