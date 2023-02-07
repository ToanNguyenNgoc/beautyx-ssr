import { AUTH_LOCATION } from 'api/authLocation';
import { API_ROUTE_V } from 'api/_api';
import { ProductableItem } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import { useDeviceMobile, useFetchInfinite } from 'hooks';
import { ITag, Productable } from 'interface';
import { paramsProductable } from 'params-query';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { navigateSearchResult } from 'utils/formatRouterLink/formatRouter';
import style from './cate-tree.module.css'

function SectionService({ tagChild }: { tagChild?: ITag }) {
    const LOCATION = AUTH_LOCATION()
    const history = useHistory()
    const IS_MB = useDeviceMobile()
    const { resDataV2, isValidating } = useFetchInfinite(
        tagChild,
        API_ROUTE_V.PRODUCTABLE('v3'),
        {
            ...paramsProductable,
            keyword: tagChild?.name,
            type: 1,
            location: LOCATION,
            sort: 'location'
        }
    )
    return (
        <div className={style.services_cnt}>
            <p className={style.product_child_child_labe}>
                Dịch vụ
                <span
                    onClick={() => history.push(navigateSearchResult('SERVICE', tagChild?.name ?? ''))}
                >Xem thêm</span>
            </p>
            <ul className={style.service_list}>
                {
                    resDataV2?.map((productable: Productable, index: number) => (
                        <li key={index} className={style.service_list_item}>
                            <ProductableItem productable={productable} changeStyle />
                        </li>
                    ))
                }
            </ul>
            {(isValidating && resDataV2?.length === 0)
                && <LoadGrid grid={IS_MB ? 1 : 5} item_count={15} />}
        </div>
    );
}

export default SectionService;