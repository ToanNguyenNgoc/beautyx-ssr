/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useGetPaymentMethodQuery } from 'redux-toolkit-query/hook-home';
import { IPaymentMethod } from 'interface'
import style from './pm.module.css'
import icon from 'constants/icon';
import { Drawer } from '@mui/material';
import { useDeviceMobile } from 'hooks';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';

interface PaymentMethodType {
    onSetPaymentMethod?: (method_id: IPaymentMethod) => void
}

function PaymentMethod(props: PaymentMethodType) {
    const { onSetPaymentMethod } = props
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const IS_MB = useDeviceMobile()
    const { data } = useGetPaymentMethodQuery()
    const methods: IPaymentMethod[] = data ?? []
    const [open, setOpen] = useState(false)

    const [methodKey, setMethodKey] = useState(PLAT_FORM === 'BEAUTYX' ? 'MOMO' : PLAT_FORM)
    const method = methods.find(i => i.name_key === methodKey)
    useEffect(() => {
        let mount = true
        if (mount && method && onSetPaymentMethod) {
            onSetPaymentMethod(method)
        }
        return () => { mount = false }
    }, [method])

    const onChooseMethod = (item: IPaymentMethod) => {
        // setMethodKey(item.name_key)
    }

    return (
        <>
            <p className={style.title}>Phương thức thanh toán</p>
            <div className={style.container}>
                <div
                    onClick={() => setOpen(true)}
                    className={style.choose_method}
                >
                    <span>{methodKey}</span>
                    <img src={icon.chevronRightBlack} alt="" />
                </div>
                <Drawer open={open} onClose={() => setOpen(false)} anchor={IS_MB ? "bottom" : "right"} >
                    <div className={style.drawer_cnt}>
                        <p className={style.title}>Phương thức thanh toán</p>
                        <div className={style.drawer}>
                            <ul className={style.list_method}>
                                {
                                    methods.map(item => (
                                        <li
                                            style={item.name_key === methodKey ? {
                                                backgroundColor: 'var(--pink-momo)',
                                                color: 'var(--bg-white)'
                                            } : {}}
                                            onClick={() => onChooseMethod(item)} key={item.id} className={style.method_item}
                                        >
                                            <span>{item.name_key}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    );
}

export default PaymentMethod;