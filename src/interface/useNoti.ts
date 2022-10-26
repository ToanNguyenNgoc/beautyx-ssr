import { useState } from "react";

export function useNoti() {
    const [noti, setNoti] = useState({
        load: false,
        message: "",
        openAlert: false
    })
    const firstLoad = () => setNoti({ ...noti, load: true })
    const resultLoad = (text: string) => {
        setNoti({
            load: false,
            message: text,
            openAlert: true
        })
    }
    const onCloseNoti = () => setNoti({ ...noti, openAlert: false })
    return { noti, firstLoad, resultLoad, onCloseNoti }
}