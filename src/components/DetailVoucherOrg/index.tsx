/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetParamUrl } from 'utils';
// import { VoucherOrgItem } from '../../features/Carts/components/CartGroupItem';
import { IDiscountPar } from '../../interface/discount';
import IStore from '../../interface/IStore';
import { IOrganization } from '../../interface/organization';
import { fetchAsyncOrgDiscounts } from '../../redux/org_discounts/orgDiscountsSlice';
import { IS_VOUCHER } from '../../utils/cart/checkConditionVoucher';
// import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { EX_VOUCHER_TITLE_DISCOUNT } from '../../utils/formatRouterLink/fileType';
import './style.css'


function DetailOrgVoucher({ org }: { org: IOrganization }) {
    const paramsArr = useGetParamUrl();
    const params = {
        org: paramsArr[1] ? paramsArr[1] : 1,
        id: paramsArr[0] ?? 1

    }
    const dispatch = useDispatch();
    // const params: any = extraParamsUrl();
    const { org_id, DISCOUNTS } = useSelector((state: IStore) => state.ORG_DISCOUNTS)
    const { discounts } = DISCOUNTS
    const callOrgDiscounts = () => {
        dispatch(fetchAsyncOrgDiscounts({
            org_id: params.org
        }))
    }
    const vouchers = IS_VOUCHER(discounts)
    useEffect(() => {
        callOrgDiscounts()
    }, [])
    return (
        vouchers.length > 0 ?
            <div className="detail-voucher">
                <span className="detail-voucher__title">Mã giảm giá</span>
                <div className="detail-voucher__cnt">
                    <ul className="detail-voucher__cnt-list">
                        {
                            vouchers.map((item: IDiscountPar, index: number) => (
                                <li key={index} className="detail-voucher__cnt-list-item">
                                    <span className="voucher-mini-item">
                                        {EX_VOUCHER_TITLE_DISCOUNT(item)}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="detail-voucher__cnt-show">
                    <span className="detail-voucher__cnt-show-title">
                        Tiết kiệm hơn khi sử dụng mã giảm giá
                    </span>
                    <div className="detail-voucher__cnt-show-list-cnt">
                        <ul className="detail-voucher__cnt-show-list">
                            {
                                vouchers.map((voucher: IDiscountPar, index: number) => (
                                    <li key={index} className="voucher-show-item">
                                        {/* <VoucherOrgItem
                                            voucher={voucher}
                                            org={org}
                                            showApplyBtn={false}
                                        /> */}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            :
            <></>
    );
}

export default DetailOrgVoucher;