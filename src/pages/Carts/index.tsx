/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Container, Dialog } from "@mui/material";
import CartGroupItem from "./components/CartGroupItem";
import CartBottom from "./components/CartBottom";
import CartPaymentMethod from "./components/CartPaymentMethod";
import { useDeviceMobile } from "hooks";
import { EmptyRes } from "components/Layout";
import { onErrorImg, Transition, unique } from "utils";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import {  clearByCheck, getTotal } from "redux/cart";
import HeadTitle from "features/HeadTitle";
import { extraPaymentMethodId } from "features/PaymentMethod/extraPaymentMethodId";
import HeadMobile from "features/HeadMobile";
import UserPaymentInfo from "pages/Account/components/UserPaymentInfo";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import PaymentMethodCpn from "features/PaymentMethod";
import icon from "constants/icon";
import { IBranch, IOrganization } from "interface";

const initialMomoForBeautyx = {
    created_at: "2022-01-07T10:00:07.000000Z",
    id: 1,
    is_changeable: false,
    name_key: "MOMO",
    updated_at: "2022-01-07T10:00:07.000000Z"
}

function Carts() {
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const dispatch = useDispatch();
    const { cartAmountDiscount, cartAmount, VOUCHER_APPLY } = useSelector(
        (state: any) => state.carts
    );
    // console.log(VOUCHER_APPLY)
    const { USER } = useSelector((state: any) => state.USER);
    const cartListAll = useSelector((state: any) => state.carts.cartList)
    const cartList = cartListAll.filter((i: any) => i?.user_id === USER?.id)


    const org = cartList.filter((item: any) => item.isConfirm === true)[0]?.org
    const cartConfirm = cartList.filter((item: any) => item.isConfirm === true);

    const handleClearByCheck = () => {
        if (cartConfirm.length > 0) {
            // tracking.CART_DELETE_ALL_CLICK();
            dispatch(clearByCheck());
        }
    };

    useEffect(() => {
        dispatch(getTotal(USER?.id));
    }, [dispatch, cartList, USER, VOUCHER_APPLY]);

    const [open, setOpen] = useState(false);
    const [pmtMethod, setPmtMethod] = useState<any>(initialMomoForBeautyx);
    const [address, setAddress] = useState<any>();
    const [openBranch, setOpenBranch] = useState({
        open: false,
        branch: null,
        org: org,
    });

    const DATA_CART = { cartList, cartAmountDiscount, cartAmount };
    const orgs_id = cartList.map((item: any) => item.org_id);
    const IS_MB = useDeviceMobile();
    const orgs = unique(orgs_id);
    const cartListGroupOrg = orgs.map((item) => {
        const cartItemByOrg = cartList.filter((i: any) => item === i.org_id);
        return {
            org_id: item,
            org_name: cartItemByOrg[0]?.org_name,
            items: cartItemByOrg,
        };
    });

    const branch: any = openBranch.branch;

    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const payment_method_id = extraPaymentMethodId(
        payments_method,
        setPmtMethod
    );
    const DATA_PMT = { pmtMethod, address, payment_method_id, org, branch };
    // console.log(cartListGroupOrg,cartList,cartListAll);
    return (
        <>
            <HeadTitle title="Giỏ hàng" />
            {IS_MB && (
                <HeadMobile
                    title="Giỏ hàng"
                    element={
                        <CartHeadRight
                            length={cartConfirm.length}
                            handleClearByCheck={handleClearByCheck}
                        />
                    }
                />
            )}
            {cartList?.length === 0 || !cartList ? (
                <EmptyRes title='Không có Dịch vụ/Sản phẩm trong giỏ hàng !' isRecommend={true} />
            ) : (
                <>
                    <Container>
                        <div className="re-cart-cnt">
                            <div className="re-cart-cnt__head">
                                <UserPaymentInfo
                                    onSetAddressDefault={setAddress}
                                />
                            </div>
                            {FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX && (
                                <div
                                    onClick={() => setOpen(true)}
                                    className="re-cart-cnt__pmt"
                                >
                                    <span>Phương thức thanh toán</span>
                                    <br />
                                    <span
                                        style={{
                                            backgroundColor: "var(--pink-momo)",
                                            marginLeft: "12px",
                                            padding: "0px 8px",
                                            borderRadius: "6px",
                                            color: "var(--white)"
                                        }}
                                    >
                                        {pmtMethod
                                            ? pmtMethod?.name_key
                                            : "Vui lòng chọn phương thức thanh toán"}
                                    </span>
                                </div>
                            )}
                            <div className="re-cart-cnt__body">
                                <ul className="re-cart-cnt__body-list">
                                    {cartListGroupOrg.map(
                                        (item: any, index: number) => (
                                            <li
                                                key={index}
                                                className="re-cart-cnt__body__item"
                                            >
                                                <CartGroupItem
                                                    item={item}
                                                    org={org}
                                                    cartList={cartList}
                                                    openBranch={openBranch}
                                                    setOpenBranch={
                                                        setOpenBranch
                                                    }
                                                />
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </Container>
                    <CartPaymentMethod
                        open={open}
                        setOpen={setOpen}
                        pmtMethod={pmtMethod}
                        setPmtMethod={setPmtMethod}
                    />
                    <div style={{ display: "none" }}>
                        <PaymentMethodCpn
                            e={pmtMethod}
                            onPaymentMethodChange={setPmtMethod}
                        />
                    </div>
                    <CartBottom DATA_CART={DATA_CART} DATA_PMT={DATA_PMT} />
                    <BranchListOrgPay
                        org={org}
                        open={openBranch}
                        setOpen={setOpenBranch}
                    />
                </>
            )}
        </>
    );
}

export default Carts;

const CartHeadRight = (props: any) => {
    const { length, handleClearByCheck } = props;
    return (
        <div
            onClick={handleClearByCheck}
            className="flex-row re-cart-head-right"
        >
            <span>Xóa({length})</span>
            <img src={icon.TrashOrange} alt="" />
        </div>
    );
};
const BranchListOrgPay = (props: any) => {
    const { open, setOpen } = props;
    const org: IOrganization = props.org;
    return (
        <Dialog
            open={open.open}
            TransitionComponent={Transition}
            onClose={() => setOpen({ ...open, open: false })}
        >
            <div className="re-cart-branches">
                <ul className="list">
                    <li
                        onClick={() =>
                            setOpen({ ...open, branch: null, open: false })
                        }
                        className="flex-row re-cart__branch-item"
                    >
                        {!open.branch && (
                            <span className="re-cart__branch-item-ck">
                                Đã chọn
                            </span>
                        )}
                        <img
                            onError={(e) => onErrorImg(e)}
                            src={org?.image_url}
                            alt=""
                            className="branch-img"
                        />
                        <div className="detail">
                            <span className="branch-name">{org?.name}</span>
                            <span className="branch-address">
                                {org?.full_address}
                            </span>
                            <span className="branch-phone">
                                {org?.telephone?.join(", ")}
                            </span>
                        </div>
                    </li>
                    {org?.branches?.map((item: IBranch, index: number) => (
                        <li
                            onClick={() =>
                                setOpen({ ...open, branch: item, open: false })
                            }
                            key={index}
                            className="flex-row re-cart__branch-item"
                        >
                            {open.branch?.id === item?.id && (
                                <span className="re-cart__branch-item-ck">
                                    Đã chọn
                                </span>
                            )}
                            <img
                                onError={(e) => onErrorImg(e)}
                                src={
                                    item?.image
                                        ? item?.image_url
                                        : org?.image_url
                                }
                                alt=""
                                className="branch-img"
                            />
                            <div className="detail">
                                <span className="branch-name">
                                    {item?.name}
                                </span>
                                <span className="branch-address">
                                    {item?.full_address}
                                </span>
                                <span className="branch-phone">
                                    {item?.telephone}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Dialog>
    );
};
