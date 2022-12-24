
import { Container } from '@mui/system';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import HeadMobile from 'features/HeadMobile';
import HeadTitle from 'features/HeadTitle';
import { useCartReducer, useDeviceMobile } from 'hooks';
import { ICart, ICartGroupOrg } from 'interface';
import IStore from 'interface/IStore';
import UserPaymentInfo from 'pages/Account/components/UserPaymentInfo';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { unique } from 'utils';
import style from './cart.module.css'
import { CartCalc, CartOrgItem } from './components';

interface ItemType { id: number, quantity: number }

interface PostOrderType {
    products?: ItemType[],
    services?: ItemType[],
    prepay_cards?: ItemType[],
    treatment_combo?: ItemType[],
    payment_method_id?: number,
    coupon_code?: string[],
    branch_id?: number | null,
    description?: string,
    user_address_id?: number | null
}

function Cart() {
    const IS_MB = useDeviceMobile()
    const { cartList } = useSelector((state: IStore) => state.carts)
    const orgs_id = unique(cartList?.map((i: ICart) => i.org_id))
    const cartGroupOrg: ICartGroupOrg[] = orgs_id?.map(org_id => {
        const cartItemsOrg = cartList?.filter((i: ICart) => i.org_id === org_id)
        return {
            org_id: org_id,
            org: cartItemsOrg[0]?.org,
            cartItemsOrg: cartItemsOrg
        }
    })
    const { cart_confirm, products_id, services_id, combos_id } = useCartReducer()
    const orgChoose = cart_confirm[0]?.org

    const [order, setOrder] = useState<PostOrderType>({
        user_address_id: null,
        branch_id: null
    })
    const handlePostOrder = () => {
        const params: PostOrderType = {
            ...order,
            services: services_id,
            products: products_id,
            treatment_combo: combos_id
        }
        console.log(params)
    }


    return (
        <>
            <HeadTitle title='Giỏ hàng' />
            {IS_MB && <HeadMobile title='Giỏ hàng' />}
            <Container>
                <div className={style.container}>
                    <div className={style.left}>
                        <div className={style.left_head}>
                            <div className={style.left_head_label}>Dịch vụ/Sản phẩm</div>
                            <div className={style.left_head_ctl}>
                                <span className={style.left_head_ctl_item}>Đơn giá</span>
                                <span className={style.left_head_ctl_item}>Số lượng</span>
                                <span className={style.left_head_ctl_item}>
                                    Thành tiền
                                    <XButton
                                        icon={icon.trash}
                                        className={style.left_head_ctl_item_btn}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className={style.left_table}>
                            {
                                cartGroupOrg?.map(itemOrg => (
                                    <CartOrgItem
                                        orgChoose={orgChoose}
                                        key={itemOrg.org_id}
                                        itemOrg={itemOrg}
                                        cart_confirm={cart_confirm}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.right_section}>
                            <UserPaymentInfo
                                onSetAddressDefault={(address) =>
                                    setOrder({ ...order, user_address_id: address?.id })}
                            />
                        </div>
                        <CartCalc
                            handlePostOrder={handlePostOrder}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Cart;