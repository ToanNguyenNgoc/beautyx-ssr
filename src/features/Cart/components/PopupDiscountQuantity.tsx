import React from 'react';
import { Dialog } from '@mui/material';
import { XButton } from 'components/Layout';
import formatPrice from 'utils/formatPrice';

function PopupDiscountQuantity(props: any) {
    const { open, setOpen, price_display } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="flex-column cart-discount-notification">
                <span>
                    Giá bán này giới hạn mua tối đa chỉ 1 dịch vụ,<br />
                    từ dịch vụ thứ 2 giá bán sẽ thay đổi thành {formatPrice(price_display)}đ.
                </span>
                <XButton
                    title='Đã hiểu'
                    onClick={() => setOpen(false)}
                    loading={false}
                />
            </div>
        </Dialog>
    );
}

export default PopupDiscountQuantity;