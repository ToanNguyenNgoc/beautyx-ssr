import React from 'react';
import { Container } from '@mui/material';
import { useDeviceMobile } from 'hooks';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';
import HeadTitle from 'features/HeadTitle';
import HeadMobile from 'features/HeadMobile';
import DiscountItem from 'pages/HomePage/HomeDiscounts/DiscountItem';
import { LoadGrid } from 'components/LoadingSketion';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from './discounts.module.css'
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { AUTH_LOCATION } from 'api/authLocation';
import { paramsDiscounts } from 'params-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { identity, pickBy } from 'lodash';
import { STALE_TIME, baseURL } from 'config';

function Discounts() {
    const IS_MB = useDeviceMobile();
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const LOCATION = AUTH_LOCATION();
    const newParams = {
        ...paramsDiscounts,
        limit: 15,
        "filter[location]": PLAT_FORM === "TIKI" ? "" : LOCATION,
        "sort": PLAT_FORM === "TIKI" ? "-priority" : ""
    }
    const { data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['DISCOUNTS'],
        queryFn: ({ pageParam = 1 }) => axios
            .get(`${baseURL}discounts`, { params: pickBy({ ...newParams, page: pageParam }, identity) })
            .then(res => res.data.context),
        getNextPageParam: (page: any) => page.current_page + 1,
        staleTime: STALE_TIME
    })
    const discounts: IDiscountPar[] = data?.pages.map(i => i.data).flat() ?? []
    const totalItem = data?.pages[0]?.total ?? 1
    const onViewMore = () => {
        if (discounts?.length < totalItem) {
            console.log('call')
            fetchNextPage()
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
                        {discounts.length < totalItem && <LoadGrid grid={IS_MB ? 2 : 5} item_count={IS_MB ? 6 : 10} />}
                    </InfiniteScroll>
                </div>
            </Container>
        </>
    );
}

export default Discounts;