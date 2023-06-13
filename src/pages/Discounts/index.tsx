import React from 'react';
import { Container } from '@mui/material';
import { useDeviceMobile, useSwrInfinite } from 'hooks';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';
import HeadTitle from 'features/HeadTitle';
import HeadMobile from 'features/HeadMobile';
import DiscountItem from 'pages/HomePage/HomeDiscounts/DiscountItem';
import { LoadGrid } from 'components/LoadingSketion';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from './discounts.module.css'
import { CACHE_TIME } from 'common';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { AUTH_LOCATION } from 'api/authLocation';
import { paramsDiscounts } from 'params-query';
import API_ROUTE from 'api/_api';

function Discounts() {
    const IS_MB = useDeviceMobile();
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const LOCATION = AUTH_LOCATION();
    const newParams = {
        ...paramsDiscounts,
        limit: 18,
        "filter[location]": PLAT_FORM === "TIKI" ? "" : LOCATION,
        "sort": PLAT_FORM === "TIKI" ? "-priority" : ""
    }
    const { resData, onLoadMore, totalItem } = useSwrInfinite({
        API_URL: API_ROUTE.DISCOUNTS,
        enable: true,
        params: newParams,
        dedupingInterval: CACHE_TIME
    })
    const discounts: IDiscountPar[] = resData ?? []
    const onViewMore = () => {
        if (discounts?.length < totalItem) {
            onLoadMore()
        }
    }
    return (
        <>
            <HeadTitle
                title="Giá tốt, Ưu đãi khủng"
            />
            {IS_MB && <HeadMobile title='Khuyến mãi HOT' />}
            <Container>
                <div className={style.container}>
                    <InfiniteScroll
                        dataLength={discounts.length}
                        hasMore={true}
                        loader={<></>}
                        next={onViewMore}
                    >
                        <ul className={style.discount_list}>
                            {
                                discounts.map((discount: IDiscountPar, index: number) => (
                                    <li
                                        key={index}
                                        className="item-cnt"
                                    >
                                        {
                                            discount.items.map((item: IITEMS_DISCOUNT, i: number) => (
                                                <DiscountItem
                                                    key={i}
                                                    discountItem={item}
                                                    discountPar={discount}
                                                />
                                            ))
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                        {discounts.length < totalItem && <LoadGrid item_count={IS_MB ? 6 : 12} />}
                    </InfiniteScroll>
                </div>
            </Container>
        </>
    );
}

export default Discounts;