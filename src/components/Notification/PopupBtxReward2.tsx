import { Dialog } from '@mui/material';
import React from 'react';
import style from './notification.module.css'

interface PopupBtxRewardProps {
    open: boolean,
    onClose: () => void,
    btxPoint: number | string
}

export function PopupBtxReward2(props: PopupBtxRewardProps) {
    const { open, onClose, btxPoint } = props;
    return (
        <Dialog open={open} onClose={onClose} >
            <h2>{btxPoint}</h2>
            <div className={style.btx_container}>
                <div className={style.btx_box}></div>
            </div>
        </Dialog>
    );
}