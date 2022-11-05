import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../context/AppProvider';
import { IUserAddress } from '../../../../interface/userAddress';
import AddressItem from './components/AddressItem';
import icon from '../../../../constants/icon';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAsyncUserAddress,
    removeAsyncUserAddress,
    updateAsyncAddress,
} from '../../../../redux/USER/userAddressSlice';
import { STATUS } from '../../../../redux/status';
import ModalLoad from '../../../../components/ModalLoad';
import UserAddressMoba from './components/UserAddressMoba';
import IStore from 'interface/IStore';

function Address(props: any) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { USER } = useSelector((state: IStore) => state.USER)
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { address, status, status_up, address_default } = ADDRESS;
    const [openMbAddress, setOpenMbAddress] = useState(false);
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
            <div className="title_section text-color-purple">
                <h1 className="title">{t("acc.order_address")}</h1>
                <span
                    onClick={gotoAddNewAddress}
                    className="subtitle cursor-pointer"
                >
                    {t("acc.add_other_address")}
                </span>
                <button onClick={() => setOpenMbAddress(true)} className="acc-add__btn">
                    <img src={icon.plus} alt="" />
                </button>
            </div>
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
            <UserAddressMoba
                open={openMbAddress}
                setOpen={setOpenMbAddress}
            />
        </>
    );
}

export default Address;