import { useState } from "react";

interface Noti {
    load: boolean,
    message: string,
    openAlert: boolean,
    element?: React.ReactElement
}

export function useNoti() {
    const [noti, setNoti] = useState<Noti>({
        load: false,
        message: "",
        openAlert: false
    })
    const firstLoad = () => setNoti({ ...noti, load: true })
    const resultLoad = (text: string, element?: React.ReactElement) => {
        setNoti({
            load: false,
            message: text,
            openAlert: true,
            element: element
        })
    }
    const onCloseNoti = () => setNoti({ ...noti, openAlert: false })
    return { noti, firstLoad, resultLoad, onCloseNoti }
}