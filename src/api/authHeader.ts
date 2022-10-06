
export const AUTH_HEADER = () => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            Authorization: `Bearer ${session ? session : local}`,
        },
    }
}
export const AUTH_HEADER_PARAM_GET = (params: any) => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        params,
        headers: {
            Authorization: `Bearer ${session ? session : local}`,
        },
    }
}
export const AUTH_HEADER_PARAM_DELE = (values: any) => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            Authorization: `Bearer ${session ? session : local}`,
        },
        data: values,
    }
}
export const AUTH_HEADER_PARAM_PUT = (values: any) => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            Authorization: `Bearer ${session ? session : local}`,
        },
        data: values,
    }
}