import React from 'react';
import './style.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { Container } from '@mui/material';

function LoadDetail() {
    return (
        <div className='load-org'>
            <div className="load-org-head">
                <Skeleton width="100%" height="100%" />
            </div>
            <Container>
                <div className="load-detail-cnt">
                    <div className="load-detail__head">
                        <div className="left">
                            <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="right">
                            <div className="org-name">
                                <Skeleton width="100%" height="100%" />
                            </div>
                            <div className="detail-name">
                                <Skeleton width="100%" height="100%" />
                            </div>
                            <div className="detail-rate">
                                <Skeleton width="100%" height="100%" />
                            </div>
                            <div className="detail-card-cnt">
                                <Skeleton width="100%" height="100%" />
                            </div>
                            <div className="flex-row-sp detail-bottom">
                                <div className="quantity">
                                    <Skeleton width="100%" height="100%" />
                                </div>
                                <div className="buy">
                                    <Skeleton width="100%" height="100%" />
                                </div>
                            </div>
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
                    <div className="load-detail__desc">
                        <Skeleton width="100%" height="100%" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default LoadDetail;