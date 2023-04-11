import { Drawer } from '@mui/material';
import img from 'constants/img';
import React, { useEffect } from 'react';
import style from './notification.module.css'

interface PopupMessageProps {
    open: boolean,
    onClose?: () => void,
    autoHide?: boolean,
    child?: React.ReactElement,
    content: string,
    iconLabel?: string,
    iconSize?: number
}

export function PopupMessage(props: PopupMessageProps) {
    const { open, onClose, child, content, iconLabel, autoHide, iconSize } = props;
    const onCloseMessage = () => onClose && onClose()
    useEffect(() => {
        if (autoHide) {
            const timer = setTimeout(() => {
                onCloseMessage();
            }, 2500);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])
    return (
        <Drawer
            open={open}
            anchor="top"
            onClose={onCloseMessage}
        >
            <div className={style.wrapper}>
                <div className={style.message_container}>
                    <div className={style.message_left}>
                        <img
                            style={iconSize ? {
                                width: iconSize,
                                height: iconSize
                            } : {}}
                            className={style.message_left_icon}
                            src={iconLabel ?? img.beautyx} alt=""
                        />
                    </div>
                    <div className={style.message_right}>
                        <span className={style.message_right_content}>
                            {content}
                        </span>
                        {
                            child &&
                            <div className={style.message_right_bot}>
                                {child}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Drawer>
    );
}