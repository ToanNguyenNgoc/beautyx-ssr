import { Checkbox } from '@mui/material';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import img from 'constants/img';
import { ICart, ICartGroupOrg, IOrganization } from 'interface';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ascItem, descItem, onClearApplyVoucher, onClearPrevCartItem, checkConfirm } from 'redux/cart';
import { clst } from 'utils';
import formatPrice from 'utils/formatPrice';
import style from '../cart.module.css'

interface CartItemProps {
    itemOrg: ICartGroupOrg,
    orgChoose?: IOrganization,
    cart_confirm: ICartGroupOrg[]
}
const checkedSt = {
    color: "#7161BA",
    "&.Mui-checked": {
        color: "#7161BA",
    },
    marginLeft: '-16px'
}
const checkedStItem = {
    ...checkedSt,
    marginLeft: '-14px'
}

export function CartOrgItem(props: CartItemProps) {
    const { itemOrg, orgChoose, cart_confirm } = props
    let isCheck = false;
    if (
        orgChoose?.id === itemOrg.org_id &&
        cart_confirm.length === itemOrg?.cartItemsOrg?.length
    ) {
        isCheck = true;
    }
    const dispatch = useDispatch()
    const onChooseCartItemOrg = () => {
        dispatch(onClearPrevCartItem());
        dispatch(onClearApplyVoucher());
        if (isCheck === false) {
            for (var itemCart of itemOrg.cartItemsOrg) {
                dispatch(checkConfirm({ ...itemCart, isConfirm: true }));
            }
        }
    };

    return (
        <div key={itemOrg.org_id} className={style.group_org_item}>
            <div className={style.group_org_detail}>
                <div className={style.group_org_detail_name}>
                    <div className={style.org_detail_left}>
                        <Checkbox
                            size='small'
                            sx={checkedSt}
                            onClick={onChooseCartItemOrg}
                            checked={isCheck}
                        />
                        <div className={style.org_img}>
                            <img src={itemOrg.org?.image_url ?? img.imgDefault} alt="" />
                        </div>
                        <span className={style.org_name}>{itemOrg.org?.name}</span>
                    </div>
                    {
                        itemOrg.org?.branches?.length > 0 && orgChoose?.id === itemOrg.org_id &&
                        <XButton
                            title='Chọn chi nhánh'
                            className={style.org_branch_btn}
                        />
                    }
                </div>
                <p className={style.group_org_detail_address}>
                    {itemOrg.org?.full_address}
                </p>
            </div>
            {
                itemOrg.cartItemsOrg?.map((item: ICart) => (
                    <CartItem
                        key={item.cart_id}
                        item={item}
                        itemOrg={itemOrg}
                        orgChoose={orgChoose}
                    />
                ))
            }
        </div>
    );
}

const CartItem = (
    { item, itemOrg, orgChoose }:
        { item: ICart, itemOrg: ICartGroupOrg, orgChoose?: IOrganization }
) => {
    const dispatch = useDispatch()
    const onTriggerQuantity = (btn: 'asc' | 'desc') => {
        if (btn === 'asc') {
            dispatch(ascItem(item))
        }
        if (btn === 'desc' && item.quantity > 1) {
            dispatch(descItem(item))
        }
    }
    const handleConfirm = () => {
        dispatch(onClearApplyVoucher())
        if (!orgChoose || orgChoose?.id === item.org_id) {
            const action = checkConfirm({
                ...item,
                isConfirm: !item.isConfirm,
            });
            dispatch(action);
        } else {
            dispatch(onClearPrevCartItem());
            const action = checkConfirm({
                ...item,
                isConfirm: !item.isConfirm,
            });
            dispatch(action);
        }
        //clear branch choose
        // if (item.org_id !== org?.id) {
        //     setOpenBranch({
        //         ...openBranch,
        //         branch: null,
        //         org: item.org,
        //     });
        // }
    };

    let totalAmount = item.price * item.quantity
    if (item.discount?.discount_type === 'FINAL_PRICE' && item.price_discount) {
        totalAmount = item.price_discount * item.quantity
    }
    if (item.discount?.discount_type !== 'FINAL_PRICE' && item.price_discount) {
        totalAmount = item.price_discount + item.price * (item.quantity - 1)
    }

    return (
        <div className={style.cart_item}>
            {
                item.discount &&
                <div 
                    style={item.org_id === orgChoose?.id ? {
                        opacity:'1'
                    }:{}}
                    className={style.discount_badge}
                >
                    <span>{item.discount?.coupon_code}</span>
                    <img src={icon.cardDiscountWhite} alt="" />
                </div>
            }
            <div className={style.cart_item_left}>
                <div className={style.cart_item_left_check}>
                    <Checkbox
                        checked={item.isConfirm}
                        onClick={handleConfirm}
                        sx={checkedStItem} size='small'
                    />
                    <div className={style.item_img}>
                        <img
                            src={item?.cart_item?.image_url ??
                                itemOrg?.org?.image_url ?? img.imgDefault}
                            alt=""
                        />
                    </div>
                </div>
                <span className={style.item_name}>{item.name}</span>
            </div>
            <div className={style.cart_item_right}>
                <div className={style.cart_item_right_price}>
                    {item.price_discount ? formatPrice(item.price_discount) : formatPrice(item.price)}
                </div>
                <div className={style.cart_item_right_quantity}>
                    <XButton
                        onClick={() => onTriggerQuantity('desc')}
                        title='-'
                    />
                    <span className={style.item_quantity}>{item.quantity}</span>
                    <XButton
                        onClick={() => onTriggerQuantity('asc')}
                        title='+'
                    />
                </div>
                <div className={style.cart_item_right_price_total}>
                    {formatPrice(totalAmount)}
                    <XButton
                        icon={icon.trash}
                        className={clst([style.left_head_ctl_item_btn, style.remove_item_btn])}
                    />
                </div>
            </div>
        </div>
    )
}