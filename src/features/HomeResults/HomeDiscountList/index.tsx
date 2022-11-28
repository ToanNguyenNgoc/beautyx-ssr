import React from 'react';
import { Container } from '@mui/material';
import '../../HomeDiscounts/style.css'
import './style.css';
// import { AUTH_LOCATION } from 'api/authLocation';
import { useDeviceMobile, useSwrInfinite } from 'hooks';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';
import HeadTitle from 'features/HeadTitle';
import HeadMobile from 'features/HeadMobile';
import Head from 'features/Head';
import DiscountItem from 'features/HomeDiscounts/DiscountItem';
import { LoadGrid } from 'components/LoadingSketion';
import InfiniteScroll from 'react-infinite-scroll-component';

function HomeDiscountList() {
    // const LOCATION = AUTH_LOCATION()
    const paramsDiscounts = {
        "append": "user_available_purchase_count",
        "filter[platform]": "MOMO",
        // "filter[location]": LOCATION ?? "",
        "limit": "18",
        "sort": "-priority|-created_at|discount_value"
    }
    const IS_MB = useDeviceMobile();
    const { resData, totalItem, onLoadMore } = useSwrInfinite(true, "/discounts", paramsDiscounts)
    const discounts: IDiscountPar[] = resData
    const onViewMore = () => {
        onLoadMore()
    }
    return (
        <>
            <HeadTitle
                title="Giá tốt, Ưu đãi khủng"
            />
            {IS_MB ? <HeadMobile title='Khuyến mãi HOT' /> : <Head />}
            <Container>
                <div className="discount-list-cnt">
                    <InfiniteScroll
                        dataLength={discounts.length}
                        hasMore={true}
                        loader={<></>}
                        next={onViewMore}
                    >
                        <ul className="discounts__list">
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
                    {/* <div className="discount-list-cnt__bot">
                        {
                            discounts.length < totalItem &&
                            <XButton
                                title='Xem thêm ưu đãi'
                                loading={false}
                                onClick={onViewMore}
                            />
                        }
                    </div> */}
                </div>
            </Container>
        </>
    );
}

export default HomeDiscountList;