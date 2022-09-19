import React from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import { Container } from '@mui/material';
import '../../HomeDiscounts/style.css'
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../interface/discount';
import DiscountItem from '../../HomeDiscounts/DiscountItem';
import ButtonLoading from '../../../components/ButtonLoading';
import './style.css';
import Footer from '../../Footer';
import HeadMobile from '../../HeadMobile';
import useFullScreen from '../../../utils/useDeviceMobile';
import useSwrInfinite from '../../../utils/useSwrInfinite';
import LoadGrid from '../../../components/LoadingSketion/LoadGrid';
import { AUTH_LOCATION } from "../../../api/authLocation"

function HomeDiscountList() {
    const LOCATION = AUTH_LOCATION()
    const paramsDiscounts = {
        "append": "user_available_purchase_count",
        "filter[platform]": "MOMO",
        "filter[location]": LOCATION,
        "limit": "30",
        "sort": "-priority|-created_at|discount_value"
    }
    const IS_MB = useFullScreen();
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite("/discounts", paramsDiscounts)
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
                    {isValidating && <LoadGrid />}
                    <div className="discount-list-cnt__bot">
                        {
                            discounts.length < totalItem &&
                            <ButtonLoading
                                title='Xem thêm ưu đãi'
                                loading={false}
                                onClick={onViewMore}
                            />
                        }
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default HomeDiscountList;