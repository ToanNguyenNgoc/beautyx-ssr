import authentication from "api/authApi";
import dayjs from "dayjs";

const handleValidToken = async () => {
    const token_ex_at = sessionStorage.getItem('_WEB_TK_EX') ?? localStorage.getItem('_WEB_TK_EX')
    const token_refresh = sessionStorage.getItem('_WEB_TK_RE') ?? localStorage.getItem('_WEB_TK_RE')
    const expDate = dayjs(token_ex_at).format('YYYYMMDD')
    const expTime = dayjs(token_ex_at).format('HHmmss')
    const expNum = parseInt(`${expDate}${expTime}`)
    const nowNum = parseInt(`${dayjs().format('YYYYMMDDHHmmss')}`)
    // if(nowNum >= expNum && token_ex_at && token_refresh){
    //   const res = await authentication.refreshToken(token_refresh)
    //   console.log(res)
    // }
    if (token_refresh) {
        const res = await authentication.refreshToken(token_refresh)
        console.log(res)
    }
}

export const AUTH_HEADER = () => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    return {
        headers: {
            Authorization: `Bearer ${session ? session : local}`,
        },
    }
}

export const AUTH_HEADER_2 = async () => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    handleValidToken()
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