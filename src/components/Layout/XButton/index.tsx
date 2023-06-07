import React, { ReactNode } from 'react';
import { CircularProgress } from '@mui/material';
import './style.css';

interface IProps {
    children?: ReactNode,
    loading?: boolean,
    title?: string,
    onClick?: (e?: any) => void,
    type?: "button" | "submit",
    className?: string,
    style?: any
    icon?: string,
    iconSize?: number,
    disable?: boolean
}

export function XButton(props: IProps) {
    const {
        loading,
        title,
        onClick,
        type = "button",
        className,
        style,
        icon,
<<<<<<< HEAD
        iconSize,
        children
=======
        iconSize = 18,
>>>>>>> Dev_Toan
    } = props;
    return (
        <button
            style={style ? style : {}}
            disabled={loading === true}
            className={`btn-loading ${className ? className : ""}`}
            onClick={onClick}
            type={type}
        >
            {
                icon &&
                <img
                    style={(!title || title === '') ? {
                        marginRight: '0px'
                    } : {}}
                    src={icon} alt=""
                    height={iconSize}
                    width={iconSize}
                />
            }
            {
                loading === true &&
                <div className="loading-cnt">
                    <CircularProgress size="25px" color="primary" />
                </div>
            }
            {title}
            {children}
        </button>
    );
}