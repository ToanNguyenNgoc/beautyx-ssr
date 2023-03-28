import dayjs from "dayjs"

export const handleValidToken = () => {
    let refresh = false
    const token_ex_at = sessionStorage.getItem('_WEB_TK_EX') ?? localStorage.getItem('_WEB_TK_EX')
    // const token_ex_at = '2022-12-10 20:42:23'
    const token_refresh = sessionStorage.getItem('_WEB_TK_RE') ?? localStorage.getItem('_WEB_TK_RE')
    const expDate = dayjs(token_ex_at).format('YYYYMMDD')
    const expTime = dayjs(token_ex_at).format('HHmmss')
    const expNum = parseInt(`${expDate}${expTime}`)
    const nowNum = parseInt(`${dayjs().format('YYYYMMDDHHmmss')}`)
    if (nowNum >= expNum && token_ex_at && token_refresh) {
        refresh = true
    }
    return refresh
}

export const AUTH_HEADER_WS = () => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            "Authorization": `Bearer ${session ? session : local}`,
            "Content-Type": ''
        },
    }
}

export const AUTH_HEADER = (contentType?: 'application/json' | 'multipart/form-data'|"") => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            "Authorization": `Bearer ${session ? session : local}`,
            "Content-Type": contentType ? contentType : 'application/json'
        },
    }
}
export const token = localStorage.getItem("_WEB_TK") ?? window.sessionStorage.getItem("_WEB_TK");
export const AUTH_HEADER_PARAM_GET = (params: any) => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        params,
        headers: {
            "Authorization": `Bearer ${session ? session : local}`,
        },
    }
}
export const AUTH_HEADER_PARAM_DELE = (values: any) => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            "Authorization": `Bearer ${session ? session : local}`,
        },
        data: values,
    }
}
export const AUTH_HEADER_PARAM_PUT = (values: any) => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            "Authorization": `Bearer ${session ? session : local}`,
        },
        data: values,
    }
}