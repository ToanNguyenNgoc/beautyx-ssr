export function extraParamsUrl() {
    const string = decodeURIComponent(window.location.search);
    if (string) {
        const queryString = string.split("?");
        const result =
            queryString.length > 2
                ? "?" +
                queryString[1] +
                "&" +
                queryString[queryString.length - 1]
                : "?" + queryString[1];
        const urlSearchParams = new URLSearchParams(result);
        return Object.fromEntries(urlSearchParams.entries());
    }
}
export const extractImageUrls = (htmlTemplate: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlTemplate, 'text/html');
    const imgElements = doc.getElementsByTagName('img')
    const imageUrls = Array.from(imgElements).map((img) => img.src);
    return imageUrls;
};