import { Dialog } from '@mui/material';
import TrendsDetail from 'pages/TrendsDetail';
import React from 'react';

interface TrendDetailDiaProps {
    open: boolean, setOpen: (open: boolean) => void,
    _id: string
}

function TrendDetailDia(props: TrendDetailDiaProps) {
    const { open, setOpen, _id } = props;
    const onClose = () => setOpen(false)
    return (
        <Dialog
            fullScreen
            open={open}
        >
            {open && <TrendsDetail id={_id} onClose={onClose} />}
        </Dialog>
    );
}

export default TrendDetailDia;