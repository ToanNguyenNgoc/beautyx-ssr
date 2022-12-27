/* eslint-disable no-useless-concat */
import { Checkbox } from "@mui/material";
import React from "react";
import icon from "constants/icon";
import {
    checkConfirm,
    onClearApplyVoucher,
    onClearPrevCartItem,
} from "redux/cart";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { XButton } from "components/Layout";

function CartGroupItem(props: any) {
    const { item, org, cartList, setOpenBranch, openBranch } = props;
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
        (i: any) => i.is_type === 'SERVICE'
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