import React from 'react';
import { CircularProgress } from '@mui/material';
import './style.css';

interface IProps {
    loading: boolean,
    title?: string,
    onClick?: () => void,
    type?: any,
    className?: string,
    style?: any
}

function ButtonLoading(props: IProps) {
    const { loading, title, onClick, type, className, style } = props;
    //const loading = true
    return (
        <button
            style={style ? style : {}}
            disabled={loading === true}
            className={`btn-loading ${className ? className : ""}`}
            onClick={onClick}
            type={type}
        >
            {
                loading === true &&
                <div className="loading-cnt">
                    <CircularProgress size="25px" color="primary" />
                </div>
            }
            {title}
        </button>
    );
}

export default ButtonLoading;