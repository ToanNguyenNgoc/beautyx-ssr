import { AUTH_LOCATION } from 'api/authLocation';
import API_ROUTE from 'api/_api';
import { SerProItem } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import { useDeviceMobile, useSwrInfinite } from 'hooks';
import { IServicePromo, ITag } from 'interface';
import { paramsServices } from 'params-query';
import React from 'react';
import style from './cate-tree.module.css'

function SectionService({ tagChild }: { tagChild?: ITag }) {
    const LOCATION = AUTH_LOCATION()
    const IS_MB = useDeviceMobile()
    const { resData, isValidating } = useSwrInfinite(
        tagChild,
        API_ROUTE.SERVICES,
        {
            ...paramsServices, 'filter[keyword]': tagChild?.name,
            'limit': '15', 'filter[location]': LOCATION
        }
    )
    return (
        <div className={style.services_cnt}>
            <ul className={style.service_list}>
                {
                    resData?.map((service: IServicePromo, index: number) => (
                        <li key={index} className={style.service_list_item}>
                            <SerProItem changeStyle={IS_MB} item={service} type='SERVICE' />
                        </li>
                    ))
                }
            </ul>
            {(isValidating && resData?.length === 0)
                && <LoadGrid grid={IS_MB ? 1 : 5} item_count={15} />}
        </div>
    );
}

export default SectionService;