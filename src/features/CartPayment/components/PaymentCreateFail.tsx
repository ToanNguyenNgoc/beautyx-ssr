import React from 'react';
import { Dialog } from '@mui/material';
import { XButton } from 'components/Layout';

function PaymentCreateFail(props: any) {
    const {popupFail, setPopUpFail} = props;
    return (
        <Dialog
            open={popupFail}
            onClose={() => setPopUpFail(false)}
        >
            <div className="flex-column cnt-fail">
                <span>Thông báo</span>
                <div className="content">
                    Tạo đơn hàng thất bại
                </div>
                <XButton
                    title='Đóng'
                    loading={false}
                    onClick={() => setPopUpFail(false)}
                />
            </div>
        </Dialog>
    );
}

export default PaymentCreateFail;