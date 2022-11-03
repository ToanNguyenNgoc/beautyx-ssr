/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import OrgComboItem from './OrgComboItem';
import InfiniteScroll from "react-infinite-scroll-component";
import { IOrganization } from 'interface';
import API_ROUTE from 'api/_api';
import { useDeviceMobile, useSwrInfinite } from 'utils';
import { LoadGrid } from "components/LoadingSketion";
import {EmptyRes} from "components/Layout";

interface IProps {
    org: IOrganization
}

const paramComboOrg = {
    "filter[is_momo_ecommerce_enable]": true,
}

export function OrgCombos(props: IProps) {
    const { org } = props;
    const IS_MB = useDeviceMobile()
    const { resData, totalItem, onLoadMore } = useSwrInfinite(
        org?.id,
        API_ROUTE.ORG_COMBOS(org?.id),
        paramComboOrg
    )

    const combos = resData ?? []

    const onViewMore = () => {
        if (combos.length >= 15 && combos.length < totalItem) onLoadMore()
    }
    return (
        <div style={{ width: "100%" }} className="org-services-cnt__right">
            <InfiniteScroll
                dataLength={combos.length}
                hasMore={true}
                next={onViewMore}
                loader={<></>}
            >
                <ul className="org-combos-cnt__right">
                    {
                        combos.map((item: any, index: number) => (
                            <li key={index}>
                                <OrgComboItem
                                    org={org}
                                    combo={item}
                                />
                            </li>
                        ))
                    }
                </ul>
            </InfiniteScroll>
            {totalItem === 0 && <EmptyRes title='Không có combo phù hợp!' />}
            {combos.length < totalItem && <LoadGrid grid={IS_MB ? 1 : 6} item_count={12} />}
        </div>
    );
}