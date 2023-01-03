import { Checkbox } from '@mui/material';
import { XButton } from 'components/Layout';
import { PopupNotification } from 'components/Notification';
import icon from 'constants/icon';
import img from 'constants/img';
import { AppContext } from 'context/AppProvider';
import { IBranch, ICart, ICartGroupOrg, IOrganization } from 'interface';
import React, { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    ascItem,
    descItem,
    onClearApplyVoucher,
    onClearPrevCartItem,
    checkConfirm,
    removeItem
} from 'redux/cart';
import { clst } from 'utils';
import formatPrice from 'utils/formatPrice';
import style from '../cart.module.css'

interface CartItemProps {
    itemOrg: ICartGroupOrg,
    orgChoose?: IOrganization,
    cart_confirm: ICartGroupOrg[],
    branch_id: number | undefined | null,
    onChangeBranch: (id: number | null) => void
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
    const { t } = useContext(AppContext)
    const { itemOrg, orgChoose, cart_confirm, onChangeBranch, branch_id } = props
    const refBranch = useRef<HTMLDivElement>(null)
    const openBranch = () => refBranch.current?.classList.toggle(style.branch_show)
    const onClearBranch = () => onChangeBranch(null)
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
        onClearBranch()
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
                        <div className={style.branch_cnt}>
                            <XButton
                                title={!branch_id ? t('my_ser.choose_branch') : t('se.edit')}
                                className={style.org_branch_btn}
                                onClick={openBranch}
                            />
                            <div ref={refBranch} className={style.branch}>
                                <ul className={style.branch_list}>
                                    <li onClick={() => {
                                        onClearBranch();
                                        openBranch()
                                    }} className={style.branch_item}>
                                        <span className={style.branch_check}>
                                            {!branch_id && <span></span>}
                                        </span>
                                        <div className={style.branch_item_de}>
                                            <span className={style.branch_name}>
                                                <span>{t('pm.org')} :</span>
                                                {itemOrg?.org?.full_address}
                                            </span>
                                        </div>
                                    </li>
                                    {
                                        itemOrg.org?.branches?.map((item: IBranch) => (
                                            <li onClick={() => {
                                                onChangeBranch(item.id);
                                                openBranch()
                                            }} key={item.id} className={style.branch_item}>
                                                <span className={style.branch_check}>
                                                    {item.id === branch_id && <span></span>}
                                                </span>
                                                <div className={style.branch_item_de}>
                                                    <span className={style.branch_name}>
                                                        <span>{t('Mer_de.branch')}:</span>
                                                        {item.full_address}
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                <p className={style.group_org_detail_address}>
                    {
                        itemOrg.org?.branches?.find(i => i.id === branch_id)?.full_address ?? itemOrg.org?.full_address
                    }
                </p>
            </div>
            {
                itemOrg.cartItemsOrg?.map((item: ICart) => (
                    <CartItem
                        key={item.cart_id}
                        item={item}
                        itemOrg={itemOrg}
                        orgChoose={orgChoose}
                        onClearBranch={onClearBranch}
                    />
                ))
            }
        </div>
    );
}

const CartItem = (
    { item, itemOrg, orgChoose, onClearBranch }:
        { item: ICart, itemOrg: ICartGroupOrg, orgChoose?: IOrganization, onClearBranch: () => void }
) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onTriggerQuantity = (btn: 'asc' | 'desc') => {
        if (btn === 'asc') {
            dispatch(ascItem(item))
        }
        if (btn === 'desc' && item.quantity > 1) {
            dispatch(descItem(item))
        }
        dispatch(onClearApplyVoucher())
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
        if (item.org_id !== orgChoose?.id) {
            onClearBranch()
        }
    };

    let totalAmount = item.price * item.quantity
    if (item.discount?.discount_type === 'FINAL_PRICE' && item.price_discount) {
        totalAmount = item.price_discount * item.quantity
    }
    if (item.discount?.discount_type !== 'FINAL_PRICE' && item.price_discount) {
        totalAmount = item.price_discount + item.price * (item.quantity - 1)
    }

    return (
        <>
            <div className={style.cart_item}>
                {
                    item.discount &&
                    <div
                        style={item.org_id === orgChoose?.id ? {
                            opacity: '1'
                        } : {}}
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
                            onClick={() => setOpen(true)}
                        />
                    </div>
                </div>
            </div>
            <PopupNotification
                title='Thông báo'
                content={`Xóa "${item.name}" khỏi giỏ hàng ?`}
                open={open} setOpen={setOpen}
                children={<>
                    <XButton title='Hủy' onClick={() => setOpen(false)} />
                    <XButton title='Xác nhận' onClick={() => { dispatch(removeItem(item)); setOpen(false) }} />
                </>}
            />
        </>
    )
}