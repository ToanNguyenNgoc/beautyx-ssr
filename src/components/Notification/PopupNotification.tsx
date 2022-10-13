import React, { ReactElement, useEffect } from 'react'
import { Dialog } from '@mui/material'
import style from "./notification.module.css"

interface PopupNotificationProps {
    children?: ReactElement
    title?: string
    content?: string
    open: boolean
    setOpen?: (open: boolean) => void
    className?: string
    imgStatus?: string
    autoClose?: boolean,
    fullScreen?: boolean
}

export function PopupNotification(props: PopupNotificationProps) {
    const { children, title, content, open, setOpen, autoClose, fullScreen } = props
    useEffect(() => {
        if (autoClose) {
            const time = setTimeout(() => { setOpen && setOpen(false) }, 2000)
            return () => { clearInterval(time) }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onClose = () => {
        if (setOpen) setOpen(false)
    }
    return (
        <Dialog
            fullScreen={fullScreen ?? false}
            open={open} onClose={onClose}
        >
            <div className={style.container}>
                <h2 className={style.popup_noti_title}>{title}</h2>
                <h4 className={style.pop_noti_desc}>{content}</h4>
                <div className={style.pop_noti_bot}>
                    {children}
                </div>
            </div>
        </Dialog>
    )
}