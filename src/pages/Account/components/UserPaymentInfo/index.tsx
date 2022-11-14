/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import icon from '../../../../constants/icon';
import { AppContext } from '../../../../context/AppProvider';
import { STATUS } from '../../../../redux/status';
import { fetchAsyncUserAddress } from '../../../../redux/USER/userAddressSlice';
import DialogChangeInfo from '../DialogChangeInfo';

import "./style.css";
import useDeviceMobile from '../../../../utils/useDeviceMobile';

interface IProps {
    onSetAddressDefault?: (address?: any) => void;
    disableEdit?: boolean;
}

function UserPaymentInfo(props: IProps) {
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const { onSetAddressDefault, disableEdit } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const USER = useSelector((state: any) => state.USER.USER);
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { status, address_default } = ADDRESS;
    const [openInfo, setOpenInfo] = useState(false);
    //const [useAddress, setUserAddress] = useState<IUserAddress>();
    const callUserAddress = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncUserAddress())
        }
        if (onSetAddressDefault) {
            onSetAddressDefault(address_default)
        }
    };
    useEffect(() => {
        callUserAddress();
    }, [status]);
    const gotoEditInformation = () => {
        if (IS_MB) {
            setOpenInfo(true);
        } else {
            history.push("/tai-khoan/thong-tin-ca-nhan");
        }
    };
    return (
        <div className="user-address-form">
            <span className="user-address-form__title">
                {t("pm.payment_info")}
            </span>
            <div className="flex-row-sp user-pm-de-cnt">
                <table>
                    <tbody>
                        <tr>
                            <td className="user-pm-de-cnt__tb-left">
                                {t("pm.buyer")}
                            </td>
                            <td
                                style={{ color: "var(--black)" }}
                                className="user-pm-de-cnt__tb-left"
                            >
                                {USER?.fullname}
                            </td>
                            {disableEdit ? (
                                <></>
                            ) : (
                                <td>
                                    <button onClick={gotoEditInformation}>
                                        <img src={icon.edit} alt="" />
                                    </button>
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td className="user-pm-de-cnt__tb-left">
                                {t("pm.phone")}
                            </td>
                            <td
                                style={{ color: "var(--black)" }}
                                className="user-pm-de-cnt__tb-left"
                            >
                                {USER?.telephone}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="user-pm-de-cnt__tb-left">
                                {t("pm.address")}
                            </td>
                            <td
                                style={{ color: "var(--black)" }}
                                className='user-pm-de-cnt__tb-left'>
                                {address_default ? address_default?.address
                                    :
                                    "Chưa có địa chỉ giao hàng"
                                }
                            </td>
                            {/* {
                                disableEdit ?
                                    <></>
                                    :
                                    <td>
                                        <button
                                            onClick={() => history.push('/tai-khoan/thong-tin-ca-nhan?address=true')}
                                        >
                                            <img className='img-icon' src={address_default ? icon.edit : icon.plus} alt="" />
                                        </button>
                                    </td>
                            } */}
                        </tr>
                    </tbody>
                </table>
            </div>
            {USER && <DialogChangeInfo open={openInfo} setOpen={setOpenInfo} />}
        </div>
    );
}

export default UserPaymentInfo;
