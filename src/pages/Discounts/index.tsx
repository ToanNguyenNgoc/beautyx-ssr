import React from 'react';
import { Container } from '@mui/material';
import { useDeviceMobile, useSwrInfinite } from 'hooks';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';
import HeadTitle from 'features/HeadTitle';
import HeadMobile from 'features/HeadMobile';
import DiscountItem from 'pages/HomePage/HomeDiscounts/DiscountItem';
import { LoadGrid } from 'components/LoadingSketion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ParamDiscounts } from 'params-query/param.interface';
import style from './discounts.module.css'
import { CACHE_TIME } from 'common';

function Discounts() {
    const paramsDiscounts: ParamDiscounts = {
        "append": "user_available_purchase_count",
        "filter[platform]": "MOMO",
        "limit": 18,
        "sort": "-priority|-created_at|discount_value"
    }
    const IS_MB = useDeviceMobile();
    const { resData, totalItem, onLoadMore } = useSwrInfinite({
        enable: true, API_URL: "/discounts", params: paramsDiscounts, dedupingInterval: CACHE_TIME
    })
    const discounts: IDiscountPar[] = resData
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