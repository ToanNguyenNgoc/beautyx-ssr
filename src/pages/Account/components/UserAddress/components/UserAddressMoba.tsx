import React from 'react';
import { Transition } from '../../../../../utils/transition';
import { Dialog } from '@mui/material';
import UserAddress from './UserAddress';
import HeadMobile from '../../../../../features/HeadMobile';
import { useDeviceMobile } from 'hooks';

function UserAddressMoba(props: any) {
    const { open, setOpen } = props;
    const fullScreen = useDeviceMobile();
    return (
        fullScreen === true ?
            <Dialog
                fullScreen
                TransitionComponent={Transition}
                open={open}
            >
                <div className="address-moba-cnt">
                    <HeadMobile
                        title='Thêm mới địa chỉ'
                        onBack={setOpen}
                    />
                    <UserAddress
                        setOpen={setOpen}
                    />
                </div>
            </Dialog>
            :
            <></>
    );
}

export default UserAddressMoba;