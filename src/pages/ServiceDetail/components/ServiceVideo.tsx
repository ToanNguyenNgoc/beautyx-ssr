import React from 'react';
import { Service } from '../../../interface/service'

interface IProps {
    service: Service
}

function ServiceVideo(props: IProps) {
    const { service } = props;
    return (
        <div>
            <video controls >
                <source src={service.video_url} type="video/mp4" />
            </video>
        </div>
    );
}

export default ServiceVideo;