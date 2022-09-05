export const getPosition = (options?: PositionOptions) => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}


// export const GET_LOCATION_BEAUTY = () => {
//     let load;
//     navigator.geolocation.getCurrentPosition(function (position) {
//         load = position
//         const user_location = {
//             lat: position.coords.latitude,
//             long: position.coords.longitude
//         }
//         sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location))
//     });
//     return load
// }
export const AUTH_LOCATION = () => {
    const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)
    let LOCATION;
    LOCATION = `${location_user?.lat},${location_user?.long}`;
    if (location_user) return LOCATION
}