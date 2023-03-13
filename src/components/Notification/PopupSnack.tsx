import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface PopupSnackProps {
    open: boolean,
    onClose?: () => void,
    title?: string,
    color?: 'success' | 'info' | 'warning' | 'error'
}

export function PopupSnack(props: PopupSnackProps) {
    const { open, onClose, title, color } = props;
    const onCloseSnack = () => onClose && onClose()
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={open}
            autoHideDuration={4000}
            onClose={onCloseSnack}
        >
            <Alert onClose={onCloseSnack} severity={color ?? 'success'} sx={{ width: '100%' }}>
                {title ?? ''}
            </Alert>
        </Snackbar>
    );
}