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
        //console.log(result,Object.fromEntries(urlSearchParams.entries()))
        return Object.fromEntries(urlSearchParams.entries());
    }
}