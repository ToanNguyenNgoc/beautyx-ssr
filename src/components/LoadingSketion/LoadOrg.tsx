import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { Container } from '@mui/material';
import "./style.css"


function LoadOrg() {
    return (
        <div className='load-org'>
            <div className="load-org-head">
                <Skeleton width="100%" height="100%" />
            </div>
            <Container>
                <div className="load-org-cnt">
                    <div className="load-org-cnt__banner">
                        <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="load-org-cnt__in">
                        <div className="load-org-cnt__in-avt">
                            <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="load-org-cnt__in-de">
                            <div className="load-org-cnt__in-de-name">
                                <Skeleton width="100%" height="100%" />
                            </div>
                            <div className="load-org-cnt__in-de-name">
                                <Skeleton width="100%" height="100%" />
                            </div>
                            <div className="load-org-cnt__in-de-name">
                                <Skeleton width="100%" height="100%" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row-sp load-org-cnt__time">
                        <div className="load-org-cnt__time-left">
                            <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="load-org-cnt__time-right">
                            <Skeleton width="100%" height="100%" />
                        </div>
                    </div>
                    <div className="load-org-cnt__tab-wrap">
                        <div className="flex-row load-org-cnt__tab">
                            {
                                [1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="load-org-cnt__tab-item">
                                        <Skeleton width="100%" height="100%" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <ul className="load-org-services">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                                <li key={i} className="load-org-services__item">
                                    <Skeleton width="100%" height="100%" />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default LoadOrg;
export const LoadingMapOrg = () => {
    return (
        <div className="load-org-cnt">
            <div className="load-org-cnt__left">
                <ul className="list">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,].map(i => (
                            <li key={i} className="list-item">
                                <div className="flex-row-sp list-item__cnt">
                                    <div className="list-item__cnt-img">
                                        <Skeleton width="100%" height="100%" />
                                    </div>
                                    <div className="list-item__cnt-de">
                                        <span>
                                            <Skeleton width="100%" height="100%" />
                                        </span>
                                        <span>
                                            <Skeleton width="100%" height="100%" />
                                        </span>
                                        <span>
                                            <Skeleton width="100%" height="100%" />
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}