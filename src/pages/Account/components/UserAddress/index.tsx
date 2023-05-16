import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext, AppContextType } from 'context/AppProvider';
import { HeadTitle } from 'pages/Account';
import { XButton } from 'components/Layout';
import { useDeviceMobile, useUserAddress } from 'hooks';
import icon from 'constants/icon';
import style from './address.module.css'

function Address() {
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const { t } = useContext(AppContext) as AppContextType
    const { addresses, deleteAddress, updateAddress } = useUserAddress()
    const onUpdateDefault = (id: number | string) => {
        updateAddress({ id: id, body: { is_default: true } })
    }
    return (
        <>
            <HeadTitle
                title={t('acc.order_address')}
                rightBtn={
                    <XButton
                        onClick={() => history.push('/tai-khoan/dia-chi')}
                        iconSize={14}
                        className={style.add_address_btn}
                        icon={icon.plusPurple}
                    />
                }
            />
            <div className={style.container}>
                <ul className={style.address_list}>
                    {
                        addresses.map(item => (
                            <li
                                key={item.id}
                                className={
                                    !item.is_default ?
                                        style.address_item : `${style.address_item} ${style.address_item_de}`
                                }
                                onClick={() => onUpdateDefault(item.id)}
                            >
                                <div className={style.address_item_left}>{item.address}</div>
                                <div className={style.address_item_right}>
                                    <XButton
                                        iconSize={12}
                                        icon={icon.editWhite}
                                    />
                                    {
                                        !item.is_default &&
                                        <XButton
                                            iconSize={12}
                                            icon={icon.trash}
                                        />
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default Address;