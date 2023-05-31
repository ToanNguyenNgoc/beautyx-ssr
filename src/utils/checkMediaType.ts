/* eslint-disable no-useless-escape */
export const checkMediaType = (url: string) => {
    let MEDIA_TYPE: string = "IMAGE"
    if (typeof url !== 'string') {
        return false;
    }
    const newLocal = /^http[^\?]*.(mp4|3gp)(\?(.*))?$/gmi;
    if (url.match(newLocal) !== null) {
        MEDIA_TYPE = "VIDEO";
    }
    return MEDIA_TYPE;
}