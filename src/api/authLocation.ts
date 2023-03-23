export const getPosition = (options?: PositionOptions) => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}
export const AUTH_LOCATION = () => {
    const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)
    let LOCATION;
    LOCATION = `${location_user?.lat},${location_user?.long}`;
    if (location_user) return LOCATION
}


export const CusEcho = (options?: PositionOptions) => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}