import React from 'react';
import { Dialog } from '@mui/material';
import ButtonCus from '../../../components/ButtonCus';

function PaymentConfirm(props: any) {
    const { open, setOpen, handleCancelPayment } = props;
    const onCancelPayment = () => {
        if (handleCancelPayment) {
            handleCancelPayment()
            setOpen(false)
        }
    }
    return (
        <Dialog
            open={open}
            onClick={() => setOpen(false)}
        >
            <div className="flex-column pay-st-cnt">
                <span className="pay-st-cnt__head">
                    Thông báo
                </span>
                <div className="pay-st-cnt__text">
                    Bạn có muốn hủy thanh toán đơn hàng không ?
                </div>
                <div className="flex-row pay-st-cnt__bot">
                    <ButtonCus
                        text="Hủy đơn hàng"
                        backColor="var(--purple)"
                        color="var(--bgWhite)"
                        padding="8px 18px"
                        borderRadius="18px"
                        border="solid 1px var(--purple)"
                        onClick={onCancelPayment}
                    />
                    <ButtonCus
                        text="Đóng"
                        border="solid 1px var(--purple)"
                        color="var(--purple)"
                        padding="8px 18px"
                        borderRadius="18px"
                        margin="0px 0px 0px 18px"
                        onClick={() => setOpen(false)}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default PaymentConfirm;