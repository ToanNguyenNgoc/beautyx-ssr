import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext, AppContextType } from 'context/AppProvider';
import { HeadTitle } from 'pages/Account';
import { XButton } from 'components/Layout';
import { useDeviceMobile, useUserAddress } from 'hooks';
import icon from 'constants/icon';

function Address() {
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const { t } = useContext(AppContext) as AppContextType
    const { addresses, postAddress, deleteAddress, updateAddress, load } = useUserAddress()
    const onAddNew = () => {
        postAddress({
            body: {
                address: 'Ho Chi Minh',
                is_default: true
            }
        })
    }
    return (
        <>
            <HeadTitle
                rightBtn={
                    <XButton
                        onClick={() => history.push('/tai-khoan/dia-chi')}
                        iconSize={14}
                        className='add_address_btn'
                        title={IS_MB ? '' : t('acc.add new')}
                        icon={icon.plusPurple}
                    />
                }
                title={t('acc.order_address')}
            />
            <ul>
                {
                    addresses.map(item => (
                        <li key={item.id}>
                            {item.address}
                            <XButton
                                title={`${item.is_default}`}
                                onClick={() => updateAddress({ id: item.id, body: { is_default: true } })}
                            />
                        </li>
                    ))
                }
            </ul>
            <XButton
                loading={load.create}
                onClick={onAddNew}
                title='Thêm mới'
            />
        </>
    );
}

export default Address;