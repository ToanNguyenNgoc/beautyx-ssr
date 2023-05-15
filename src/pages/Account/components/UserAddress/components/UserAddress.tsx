import React, { useEffect } from 'react';
import '../user_address.css';
//import SectionTitle from '../../../SectionTitle';
import UserAddressForm from './UserAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../../../redux/status'


function UserAddress(props: any) {
    const { setOpen } = props;
    const dispatch = useDispatch();
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { status } = ADDRESS;
    return (
        <UserAddressForm
            setOpen={setOpen}
        />
    );
}

export default UserAddress;