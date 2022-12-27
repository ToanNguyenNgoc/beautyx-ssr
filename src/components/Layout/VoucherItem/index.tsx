import icon from 'constants/icon';
import img from 'constants/img';
import { IDiscountPar, IOrganization } from 'interface';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { onApplyVoucherSubTotal, onCancelApplyVoucher } from 'redux/cart';
import { clst, onErrorImg } from 'utils';
import { discountReducerItem } from 'utils/cart/cartReducer';
import {
    EX_CHECK_DATE,
    EX_CHECK_INCLUDE_ITEMS,
    EX_CHECK_INCLUDE_ORG,
    EX_CHECK_SUB_TOTAL,
    EX_CHECK_VALID_TIME
} from 'utils/cart/checkConditionVoucher';
import formatPrice from 'utils/formatPrice';
import { EX_DISCOUNT_TYPE } from 'utils/formatRouterLink/fileType';
import { XButton } from '../XButton';
import style from './voucher.module.css'

interface VoucherItemProps {
    org: IOrganization,
    voucher: IDiscountPar,
    showApplyBtn: boolean,
    services_id: number[],
    products_id: number[],
    totalAmount?: number,
    outDiscounts?: IDiscountPar[],
    VOUCHER_APPLY?: IDiscountPar[]
}

export function VoucherItem(
    {
        org,
        voucher,
        showApplyBtn,
        services_id,
        products_id,
        totalAmount,
        outDiscounts,
        VOUCHER_APPLY
    }: VoucherItemProps
) {
    const active = VOUCHER_APPLY?.map((i: IDiscountPar) => i.id).includes(voucher.id)
    const orgOnVoucher = voucher?.organizations?.find(org => org.id === org?.id) ?? org
    const { servicesName, productsName, names } = discountReducerItem(
        voucher.items?.filter(i => i.organization_id === org?.id)
    )
    const dispatch = useDispatch()
    //fc: condition
    const { timeCondition, displayFrom, displayTo } = EX_CHECK_VALID_TIME(voucher)
    const subTotalCondition = EX_CHECK_SUB_TOTAL(totalAmount ?? 0, voucher)
    const dateCondition = EX_CHECK_DATE(voucher)
    const { itemConditionService } = EX_CHECK_INCLUDE_ITEMS(voucher, products_id, services_id);
    const orgCondition = EX_CHECK_INCLUDE_ORG(voucher, org.id)

    let applyCondition = false
    if (
        subTotalCondition &&
        dateCondition &&
        itemConditionService &&
        timeCondition &&
        orgCondition
    ) {
        applyCondition = true
    }
    const handleApplyVoucher = () => {
        if (outDiscounts && outDiscounts.length > 0) {

        }
        if (active) return dispatch(onCancelApplyVoucher(voucher.id))
        if (applyCondition) return dispatch(onApplyVoucherSubTotal(voucher))
    }

    return (
        <>
            <div className={active ? clst([style.container, style.act]):style.container}>
                <div className={style.left}>
                    <div className={style.org_img}>
                        <img src={orgOnVoucher?.image_url ?? img.imgDefault} onError={(e) => onErrorImg(e)} alt="" />
                    </div>
                    <p className={style.org_name}>{orgOnVoucher?.name}</p>
                </div>
                <div 
                    style={active ?{borderLeft:'solid 1px var(--text-orange)'}:{}}
                    className={style.right}
                >
                    <p className={style.title}>
                        {EX_DISCOUNT_TYPE(voucher)}
                    </p>
                    {
                        voucher.minimum_order_value &&
                        <p className={style.minimum_order_label}>
                            Cho đơn hàng từ {formatPrice(voucher.minimum_order_value)}đ
                        </p>
                    }
                    {
                        (servicesName?.length === 0 && productsName?.length === 0) ?
                            <p className={style.item_name}>
                                Áp dụng cho tất cả các sản phẩm/ dịch vụ
                            </p>
                            :
                            <p className={style.item_name}>
                                Áp dụng cho : {names?.join(', ')}
                            </p>
                    }
                    {
                        voucher.valid_time &&
                        <p className={style.time_slot_label}>
                            Khung giờ: {displayFrom}-{displayTo}
                        </p>
                    }
                    {
                        (voucher.valid_from || voucher.valid_util) ?
                            <p className={style.date_slot_label}>
                                Áp dụng: {voucher.valid_from && moment(voucher.valid_from).format("DD/MM/YYYY")} -
                                {voucher.valid_util && moment(voucher.valid_util).format("DD/MM/YYYY")}
                            </p>
                            :
                            <p className={style.date_slot_label}></p>
                    }
                    <div className={style.bottom}>
                        {
                            applyCondition ?
                            <XButton
                            className={style.bottom_btn}
                            title={active ? 'Đã áp dụng' : 'Áp dụng'}
                            onClick={handleApplyVoucher}
                        />
                        :
                        <img className={style.bottom_icon_no} src={icon.noApply} alt="" />
                        }
                    </div>
                </div>
            </div>
            {/* <div
                style={
                    active === true
                        ? {
                            backgroundColor: "#ffe3d2",
                            border: "1px solid var(--red-cl)",
                        }
                        : {}
                }
                className="cart-vouchers-list__item"
            >
                <div
                    style={
                        active === true
                            ? { borderRight: "dashed 1px var(--red-cl)" }
                            : {}
                    }
                    className="cart-vouchers-list__item-left"
                >
                    <div className="item-left__img">
                        <img
                            onError={(e) => onErrorImg(e)}
                            src={orgOnVoucher?.image_url ? orgOnVoucher?.image_url : img.imgDefault}
                            alt=""
                        />
                    </div>
                    <div className="item-left__name">
                        <span>{orgOnVoucher?.name}</span>
                    </div>
                </div>
                <div className="cart-vouchers-list__item-right">
                    <div className="item-right__top">
                        <span className="item-right__name">
                            {EX_DISCOUNT_TYPE(voucher)}
                        </span>
                        {
                            voucher?.minimum_order_value &&
                            <span className="item-right__desc">
                                Cho đơn hàng từ {formatPrice(voucher.minimum_order_value)}đ
                            </span>
                        }
                        {
                            (servicesName.length === 0 && productsName.length === 0) ?
                                <span className="item-right__desc">
                                    Áp dụng tất cả sản phẩm, dịch vụ
                                </span>
                                :
                                <span className="item-right__desc">
                                    Áp dụng cho các dịch vụ, sản phẩm : <span
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {names.join(", ")}
                                    </span>
                                </span>
                        }
                        {
                            voucher.valid_time &&
                            <span className="item-right__desc">
                                Khoảng thời gian : {displayFrom}-{displayTo}
                            </span>
                        }
                    </div>
                    <div className="item-right__bottom">
                        {
                            (voucher.valid_from || voucher.valid_util) ?
                                <span className="item-right__expired">
                                    Áp dụng: {voucher.valid_from && moment(voucher.valid_from).format("DD/MM/YYYY")} -
                                    {voucher.valid_util && moment(voucher.valid_util).format("DD/MM/YYYY")}
                                </span>
                                :
                                <span className="item-right__expired"></span>
                        }
                        {
                            showApplyBtn &&
                            <>
                                {
                                    applyCondition === true ?
                                        <div
                                            onClick={() => handleApplyVoucher()}
                                            className="item-right__btn"
                                        >
                                            <span>{
                                                active
                                                    ?
                                                    "Đã sử dụng" : "Sử dụng"
                                            }</span>
                                        </div>
                                        :
                                        <img src={icon.noApply} alt="" />
                                }
                            </>
                        }
                    </div>
                </div>
            </div> */}
            {/* <PopupNotification
                    open={noti} setOpen={setNoti}
                    title="Thông báo"
                    content="Bạn chỉ có thể sử dụng một mã thanh toán với dịch vụ này"
                    children={
                        <XButton
                            title="Đã hiểu"
                            onClick={() => setNoti(false)}
                        />
                    }
                /> */}
        </>
    );
}