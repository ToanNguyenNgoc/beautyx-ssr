/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import icon from 'constants/icon';
import { AppContext } from 'context/AppProvider';
import style from './user-payment.module.css'
import { XButton } from 'components/Layout';
import { useUserAddress } from 'hooks';

interface IProps {
    disableEdit?: boolean;
    disableAddress?: boolean
    title?: string,
}

function UserPaymentInfo(props: IProps) {
    const { t } = useContext(AppContext) as any;
    const { disableEdit, title, disableAddress } = props;
    const {addressDefault} = useUserAddress()
    const history = useHistory();
    const USER = useSelector((state: any) => state.USER.USER);
    return (
        <div className={style.container}>
            <span className={style.title}>
                {title ?? t("pm.payment_info")}
            </span>
            <div className={style.container_user}>
                <div className={style.user_row}>
                    <div className={style.user_row_label}>{t("pm.buyer")}</div>
                    <div className={style.user_row_detail}>
                        <span className={style.user_row_detail_text}>{USER?.fullname}</span>
                        {
                            !disableEdit &&
                            <XButton
                                onClick={() => history.push("/tai-khoan/thong-tin-ca-nhan")}
                                className={style.user_edit_btn}
                                icon={icon.editWhite}
                                iconSize={14}
                            />
                        }
                    </div>
                </div>
                <div className={style.user_row}>
                    <div className={style.user_row_label}>{t("pm.phone")}</div>
                    <div className={style.user_row_detail}>
                        <span className={style.user_row_detail_text}>{USER?.telephone}</span>
                    </div>
                </div>
                {
                    !disableAddress &&
                    <div className={style.user_row}>
                        <div className={style.user_row_label}>{t("pm.address")}</div>
                        <div className={style.user_row_detail}>
                            <span className={style.user_row_detail_text}>
                                {addressDefault?.address}
                            </span>
                            {
                                !disableEdit &&
                                <XButton
                                    className={style.user_edit_btn}
                                    icon={icon.editWhite}
                                    iconSize={14}
                                    onClick={() => history.push('/tai-khoan/dia-chi-giao-hang')}
                                />
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserPaymentInfo;

