import React from 'react';
import './style.css'
import { Skeleton } from '@mui/material'
import useDeviceMobile from '../../utils/useDeviceMobile';


const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const LoadingOrgs = () => {
    return (
        <ul className="result-orgs-loading-cnt">
            {
                arr.map((i: number, index: number) => (
                    <li key={index} className="result-orgs-loading-cnt__item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}
interface IPropsSer {
    width?: string
}
export const LoadingServices = (props: IPropsSer) => {
    const { width } = props;
    const IS_MB = useDeviceMobile();
    return (
        <ul className="result-orgs-loading-cnt">
            {
                arr.map((i: number, index: number) => (
                    <li style={(!IS_MB && width) ? { width: width } : {}} key={index} className="result-orgs-loading-cnt__item service-item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}
export const LoadingServicesRow = () => {
    return (
        <ul className="result-orgs-loading-cnt-row">
            {
                arr.map((i: number, index: number) => (
                    <li key={index} className="result-orgs-loading-cnt__item service-item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}