import React from 'react';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../../interface/discount';
import DiscountItem from './DiscountItem';
import './discount.css'
import Head from '../../../../features/Head';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncDiscountsUser } from '../../../../redux/USER/userSlice';

function UserDiscounts(props: any) {
    const { setOpen } = props;
    const dispatch = useDispatch();
    const { DISCOUNTS_USER } = useSelector((state: any) => state.USER);
    const { discounts, page, totalItem } = DISCOUNTS_USER;
    const onViewMore = () => {
        dispatch(fetchAsyncDiscountsUser({
            page: page + 1
        }))
    }
    return (
        <>
            <div className="discount-head">
                <Head/>
            </div>
            <div
                className='order'
            >
                <div className="flex-column dis-cnt">
                    <ul
                        className='dis-cnt__list'
                    >
                        {
                            discounts.map((discount: IDiscountPar, index: number) => (
                                <li
                                    className='dis-cnt__list-item'
                                    key={index}
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
                    {
                        discounts.length < totalItem &&
                        <button
                            onClick={onViewMore}
                            className='dis-cnt__list-btn'
                        >
                            Xem thêm mã ưu đãi
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default UserDiscounts;