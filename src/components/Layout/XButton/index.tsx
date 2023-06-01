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
        type,
        className,
        style,
        icon,
        iconSize,
        children
    } = props;
    return (
        <button
            style={style ? style : {}}
            disabled={loading === true}
            className={`btn-loading ${className ? className : ""}`}
            onClick={onClick}
            type={type ?? "button"}
        >
            {
                icon &&
                <img
                    style={(!title || title === '') ? {
                        marginRight: '0px'
                    } : {}}
                    src={icon} alt=""
                    height={iconSize ?? 18}
                    width={iconSize ?? 18}
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