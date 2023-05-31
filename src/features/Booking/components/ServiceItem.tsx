import { AppContext } from 'context/AppProvider';
import { IOrganization, Service } from 'interface';
import React, { useContext } from 'react';
import { onErrorImg } from 'utils';
import style from '../booking.module.css'

interface IProps {
    service: {
        service: Service,
        quantity?: number
    },
    org: IOrganization
}

function ServiceBookItem(props: IProps) {
    const {t} = useContext(AppContext) as any
    const { service, org } = props;
    return (
        <div className={style.service_item}>
            <div className={style.right_org_img}>
                <img src={service?.service?.image_url ?? org?.image_url}
                    onError={(e) => onErrorImg(e)} alt=""
                />
            </div>
            <div className={style.service_right}>
                <p className={style.service_name}>
                    {service?.service?.service_name}
                </p>
                <p className={style.service_quantity}>
                    {t('pr.quantity')}:{service?.quantity}
                </p>
            </div>
        </div>
    );
}

export default ServiceBookItem;