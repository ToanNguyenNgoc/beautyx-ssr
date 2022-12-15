import React, { useEffect } from 'react';
import '../user_address.css';
//import SectionTitle from '../../../SectionTitle';
import UserAddressForm from './UserAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../../../redux/status'
import { fetchAsyncUserAddress } from '../../../../../redux/user/userAddressSlice';


function UserAddress(props: any) {
    const { setOpen } = props;
    const dispatch = useDispatch();
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { status } = ADDRESS;
    const callUserAddress = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncUserAddress())
        }
    }
    useEffect(() => {
        callUserAddress()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    return (
        <UserAddressForm
            setOpen={setOpen}
        />
    );
}

export default UserAddress;