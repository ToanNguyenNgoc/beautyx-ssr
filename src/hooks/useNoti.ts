import React, { useState } from "react";

interface INoti {
    load: boolean,
    message: string,
    openAlert: boolean,
    child: any
}

export function useNoti() {
    const [noti, setNoti] = useState<INoti>({
        load: false,
        message: "",
        openAlert: false,
        child: null
    })
    const firstLoad = () => setNoti({ ...noti, load: true })
    const resultLoad = (text: string, openAlert?: boolean, child?: React.ReactNode) => {
        setNoti({
            load: false,
            message: text,
            openAlert: openAlert ?? true,
            child: child ?? ''
        })
    }
    const onCloseNoti = () => setNoti({ ...noti, openAlert: false })
    return { noti, firstLoad, resultLoad, onCloseNoti }
}