import React from 'react';
import { Drawer } from '@mui/material';
import useDeviceMobile from '../../../utils/useDeviceMobile';
import PaymentMethod from './PaymentMethod';

function CartPaymentMethod(props: any) {
    const { open, setOpen, pmtMethod, setPmtMethod } = props;
    const IS_MB = useDeviceMobile();
    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor={IS_MB ? "bottom" : "right"}
            >
                <div className='re-cart-pmt-drawer' >
                    <PaymentMethod
                        e={pmtMethod}
                        onPaymentMethodChange={setPmtMethod}
                        setOpen={setOpen}
                    />
                </div>
            </Drawer>
        </>
    );
}

export default CartPaymentMethod;