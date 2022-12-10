import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from 'context/AppProvider';
import { IUserAddress } from 'interface/userAddress';
import AddressItem from './components/AddressItem';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAsyncUserAddress,
    removeAsyncUserAddress,
    updateAsyncAddress,
} from 'redux/USER/userAddressSlice';
import { STATUS } from 'redux/status';
import ModalLoad from 'components/ModalLoad';
import IStore from 'interface/IStore';
import { HeadTitle } from 'pages/Account';
import { XButton } from 'components/Layout';
import { useDeviceMobile } from 'hooks';
import icon from 'constants/icon';

function Address() {
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const dispatch = useDispatch();
    const { USER } = useSelector((state: IStore) => state.USER)
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { address, status, status_up, address_default } = ADDRESS;
    const callUserAddress = () => {
        if (USER && status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncUserAddress())
        }
    }
    const { t } = useContext(AppContext)
    useEffect(() => {
        callUserAddress()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, USER])
    const handleRemoveAddress = (address: IUserAddress) => {
        dispatch(removeAsyncUserAddress(address.id))
    }
    const handleUpdateAddress = (address: any) => {
        dispatch(updateAsyncAddress(address))
    }

    const gotoAddNewAddress = () => {
        history.push({
            pathname: '/tai-khoan/dia-chi',
        })
    }
    return (
        <>
            {
                status_up === STATUS.LOADING && <ModalLoad />
            }
            <HeadTitle
                rightBtn={
                    <XButton
                        onClick={gotoAddNewAddress}
                        iconSize={14}
                        className='add_address_btn'
                        title={IS_MB ? '' : t('acc.add new')}
                        icon={icon.plusPurple}
                    />
                }
                title={t('acc.order_address')}
            />
            {
                address?.map((item: IUserAddress, index: number) => (
                    <AddressItem
                        key={index}
                        index={index}
                        item={item}
                        handleRemoveAddress={handleRemoveAddress}
                        handleUpdateAddress={handleUpdateAddress}
                        address_default={address_default}
                    />
                ))
            }
        </>
    );
}

export default Address;