/* eslint-disable no-useless-concat */
import { Checkbox, Dialog } from "@mui/material";
import React, { useState } from "react";
import icon from "../../../constants/icon";
import {
    checkConfirm,
    onApplyVoucherSubTotal,
    onCancelApplyVoucher,
    onClearApplyVoucher,
    onClearPrevCartItem,
} from "../../../redux/cartSlice";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../interface/discount";
import { IOrganization } from "../../../interface/organization";
import {useDeviceMobile} from "hooks";
import {
    EX_CHECK_DATE,
    EX_CHECK_INCLUDE_ITEMS,
    EX_CHECK_SUB_TOTAL,
    IS_VOUCHER,
    EX_CHECK_VALID_TIME,
    EX_CHECK_INCLUDE_ORG
} from "../../../utils/cart/checkConditionVoucher";
import { DISCOUNT_TYPE, EX_DISCOUNT_TYPE } from "../../../utils/formatRouterLink/fileType";
import onErrorImg from "../../../utils/errorImg";
import img from "../../../constants/img";
import formatPrice from "../../../utils/formatPrice";
import moment from "moment";
import { cartReducer, discountReducerItem } from "../../../utils/cart/cartReducer";
import { Transition, TransitionUp } from "../../../utils/transition";
import { XButton } from "components/Layout";
import { PopupNotification } from "components/Notification";

function CartGroupItem(props: any) {
    const { item, org, cartList, setOpenBranch, openBranch } = props;
    const itemOrgId = item.org_id;
    const [open, setOpen] = useState(false);
    const { VOUCHER_CART } = useSelector((state: any) => state.carts);
    const vouchers = IS_VOUCHER(VOUCHER_CART.vouchers)
    const cartListOrg = cartList.filter((i: any) => i.org_id === org?.id);
    const cartListCheck = cartList.filter((i: any) => i.isConfirm === true);
    let isCheck = false;
    if (
        org?.id === item.org_id &&
        cartListCheck.length === cartListOrg.length
    ) {
        isCheck = true;
    }

    const dispatch = useDispatch();

    const onChooseCartItemOrg = () => {
        dispatch(onClearPrevCartItem());
        dispatch(onClearApplyVoucher());
        if (isCheck === false) {
            for (var itemCart of item.items) {
                const action = checkConfirm({ ...itemCart, isConfirm: true });
                dispatch(action);
            }
        }
    };
    const servicesCartListCheckByOrg = cartListCheck?.filter(
        (i: any) => i.is_type === 2
    );

    return (
        <>
            <div className="flex-row re-cart-item-group__head">
                <div onClick={onChooseCartItemOrg} className="flex-row left">
                    <Checkbox
                        size="small"
                        sx={{
                            color: "#7161BA",
                            "&.Mui-checked": {
                                color: "#7161BA",
                            },
                            marginLeft: "-10px",
                        }}
                        checked={isCheck ? true : false}
                    />
                    <img src={icon.Storefront} alt="" />
                    <span>{item.org_name}</span>
                </div>
                {org?.id === item.org_id &&
                    org?.branches?.length > 0 &&
                    servicesCartListCheckByOrg.length > 0 && (
                        <XButton
                            title="Chọn chi nhánh"
                            onClick={() =>
                                setOpenBranch({ ...openBranch, open: true })
                            }
                            loading={false}
                        />
                    )}
            </div>
            <div className="flex-row re-cart-item-group__add">
                {/* <div className="re-cart-item-group__add-dot"></div> */}
                {org?.id === item.org_id &&
                    org?.branches?.length > 0 &&
                    servicesCartListCheckByOrg.length &&
                    openBranch.branch
                    ? `Chi nhánh : ${openBranch.branch?.name} - ${openBranch?.branch?.full_address}`
                    : `${item?.items[0]?.org?.full_address}`}
            </div>
            {vouchers.length > 0 &&
                VOUCHER_CART.org_id === itemOrgId && (
                    <div className="cart-item-voucher">
                        <span
                            onClick={() => setOpen(true)}
                            className="flex-row title"
                        >
                            Mã khuyến mại
                            <img src={icon.cardDiscountOrange} alt="" />
                        </span>
                        <PopUpVoucherOrg
                            org={org}
                            open={open}
                            setOpen={setOpen}
                            vouchers={vouchers}
                        />
                    </div>
                )}
            <ul className="re-cart-item-group__body">
                {item.items.map((cart: any, i: number) => (
                    <li key={i}>
                        <CartItem
                            cartItem={cart}
                            org={org}
                            setOpenBranch={setOpenBranch}
                            openBranch={openBranch}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CartGroupItem;

interface IPopUpVoucherOrg {
    org: IOrganization;
    open: boolean;
    setOpen: (open: boolean) => void;
    vouchers: IDiscountPar[];
}

export const PopUpVoucherOrg = (props: IPopUpVoucherOrg) => {
    const IS_MB = useDeviceMobile();
    const { open, setOpen, org, vouchers } = props
    const { cartAmount, cartList } = useSelector((state: any) => state.carts)
    const { services_id, products_id } = cartReducer(cartList)
    return (
        <Dialog
            TransitionComponent={IS_MB ? Transition : TransitionUp}
            fullScreen={IS_MB ? true : false}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="cart-item-pop-voucher">
                <div className="flex-row-sp">
                    <span className="title">{org?.name} khuyến mại</span>
                    <img
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                        src={icon.closeCircle}
                        alt=""
                    />
                </div>
                <div className="cart-vouchers-list">
                    <span className="cart-vouchers-list__title">
                        Danh sách mã ưu đãi
                    </span>
                    <ul className="list">
                        {vouchers.map((item: IDiscountPar, index: number) => (
                            <li key={index} className="item">
                                <VoucherOrgItem
                                    services_id={services_id.map(i => i.id)}
                                    products_id={products_id.map(i => i.id)}
                                    cartAmount={cartAmount}
                                    showApplyBtn={true} org={org}
                                    voucher={item}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Dialog>
    );
};
interface IVoucherOrgItem {
    org: IOrganization,
    voucher: IDiscountPar,
    showApplyBtn: boolean,
    services_id: number[],
    products_id: number[],
    cartAmount: number,
    outDiscounts?: IDiscountPar[]
}
export const VoucherOrgItem = (props: IVoucherOrgItem) => {
    const { org, showApplyBtn, services_id, products_id, cartAmount } = props;
    const voucher: IDiscountPar = {
        ...props.voucher,
    };
    const { timeCondition, displayFrom, displayTo } = EX_CHECK_VALID_TIME(voucher)
    const [noti, setNoti] = useState(false);

    const { productsInDis, servicesInDis } = discountReducerItem(
        voucher?.items?.filter((i: IITEMS_DISCOUNT) => i.organization_id === org?.id)
    )
    const productName = productsInDis.map((i: IITEMS_DISCOUNT) => i.productable?.product_name);
    const serviceName = servicesInDis.map((i: IITEMS_DISCOUNT) => i.productable?.service_name);
    const displayName = serviceName.concat(productName).filter(Boolean)
    const dispatch = useDispatch();
    const { VOUCHER_APPLY } = useSelector(
        (state: any) => state.carts
    );
    const active = VOUCHER_APPLY.map((i: IDiscountPar) => i.id).includes(voucher.id)
    const subTotalCondition = EX_CHECK_SUB_TOTAL(cartAmount, voucher);
    const dateCondition = EX_CHECK_DATE(voucher);
    const itemsCondition = EX_CHECK_INCLUDE_ITEMS(voucher, products_id, services_id);
    const orgCondition = EX_CHECK_INCLUDE_ORG(voucher, org.id)

    let applyCondition = false;
    if (
        voucher.discount_type === DISCOUNT_TYPE.SUB_TOTAL.key &&
        subTotalCondition &&
        dateCondition &&
        itemsCondition &&
        timeCondition &&
        orgCondition
    ) {
        applyCondition = true;
    }
    if (
        voucher.discount_type === DISCOUNT_TYPE.PRODUCT.key &&
        subTotalCondition &&
        dateCondition &&
        itemsCondition &&
        timeCondition &&
        orgCondition
    ) {
        applyCondition = true
    }
    if (
        voucher.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key &&
        subTotalCondition &&
        dateCondition &&
        itemsCondition &&
        timeCondition &&
        orgCondition
    ) {
        applyCondition = true;
    }
    const outDiscounts = props.outDiscounts?.filter(Boolean)
    const handleApplyVoucher = () => {
        if (outDiscounts && outDiscounts.length > 0) return setNoti(true)
        if (active) {
            dispatch(onCancelApplyVoucher(voucher.id))
        } else {
            if (applyCondition && cartAmount > 0) {
                dispatch(onApplyVoucherSubTotal(voucher));
            }
        }
    };
    const orgOnVoucher = voucher?.organizations[0] ?? org
    return (
        <div
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
                        (productsInDis.length === 0 && servicesInDis.length === 0) ?
                            <span className="item-right__desc">
                                Áp dụng tất cả sản phẩm, dịch vụ
                            </span>
                            :
                            <span className="item-right__desc">
                                Áp dụng cho các dịch vụ, sản phẩm : <span
                                    style={{ fontWeight: "bold" }}
                                >
                                    {displayName.join(", ")}
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
            <PopupNotification
                open={noti} setOpen={setNoti}
                title="Thông báo"
                content="Bạn chỉ có thể sử dụng một mã thanh toán với dịch vụ này"
                children={
                    <XButton
                        title="Đã hiểu"
                        onClick={() => setNoti(false)}
                    />
                }
            />
        </div>
    );
};
