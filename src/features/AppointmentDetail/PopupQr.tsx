import React from 'react';
import { Dialog } from '@mui/material'

interface IProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    qr: string
}

function PopupQr(props: IProps) {
    const { open, setOpen, qr } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div
                style={{ width: "86vw", borderRadius: "8px" }}
            >
                <img style={{ borderRadius: "8px" }} src={qr} alt="" />
            </div>
        </Dialog>
    );
}

export default PopupQr;