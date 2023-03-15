import provincesApi from 'api/provinceApi';
import { XButton } from 'components/Layout';
import { AppContext } from 'context/AppProvider';
import { IDistrict, IWard } from 'interface/district';
import { IProvince } from 'interface/provinces';
import { HeadTitle } from 'pages/Account';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { STATUS } from 'redux/status';
import { postAsyncAddress } from 'redux/user/userAddressSlice';

interface IDataAdd {
    districts: IDistrict[],
    wards: IWard[]
}
interface IAddress {
    province: {
        code: null | number,
        name: null | string
    },
    district: {
        code: null | number,
        name: null | string
    },
    ward: {
        code: null | number,
        name: null | string,
    },
    short_address: string
}
const $ = document.querySelector.bind(document);
const onToggleProvince = () => {
    $('.us_address-cnt .from-label__list-province')?.classList.toggle('lis-province-ac')
    $('.us_address-cnt .from-label__list-district')?.classList.remove('lis-province-ac')
    $('.us_address-cnt .from-label__list-ward')?.classList.remove('lis-ward-ac')
}
const onToggleDistrict = () => {
    $('.us_address-cnt .from-label__list-district')?.classList.toggle('lis-province-ac')
    $('.us_address-cnt .from-label__list-province')?.classList.remove('lis-province-ac')
    $('.us_address-cnt .from-label__list-ward')?.classList.remove('lis-ward-ac')
}
const onToggleWard = () => {
    $('.us_address-cnt .from-label__list-ward')?.classList.toggle('lis-ward-ac')
    $('.us_address-cnt .from-label__list-province')?.classList.remove('lis-province-ac')
    $('.us_address-cnt .from-label__list-district')?.classList.remove('lis-province-ac')
}
function UserAddressForm(props: any) {
    const { t } = useContext(AppContext) as any;
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { provinces } = useSelector((state: any) => state.HOME);
    const { status_up } = ADDRESS;
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState<IAddress>({
        province: { code: null, name: null },
        district: { code: null, name: null },
        ward: { code: null, name: null },
        short_address: ''
    })
    const [dataAdd, setDataAdd] = useState<IDataAdd>({
        districts: [],
        wards: []
    })

    //
    async function getListDistrict(province_code: number | null, district_code: number | null) {
        try {
            const resDistricts = await provincesApi.getDistricts(province_code);
            const resWards = await provincesApi.getWards(district_code);
            setDataAdd({
                ...dataAdd,
                districts: resDistricts.data.context.data,
                wards: resWards?.data.context.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (address.province.code) {
            getListDistrict(address.province.code, address.district.code)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address.province.code, address.district.code])
    //
    const toggleDistrict = () => {
        if (address.province.code) {
            onToggleDistrict()
        }
    }
    const onChooseProvince = (province: IProvince) => {
        if (province.province_code !== address.province.code) {
            setAddress({
                ...address,
                district: { code: null, name: null },
                ward: { code: null, name: null },
                province: { code: province.province_code, name: province.name }
            })
        } else {
            setAddress({
                ...address,
                province: {
                    code: province.province_code,
                    name: province.name
                }
            })
        }
    }
    const onChooseDistrict = (district: IDistrict) => {
        if (district.district_code !== address.district.code) {
            setAddress({
                ...address,
                district: {
                    code: district.district_code,
                    name: district.name
                },
                ward: { code: null, name: null },
            })
        } else if (address.province.code) {
            setAddress({
                ...address,
                district: {
                    code: district.district_code,
                    name: district.name
                }
            })
        }
    }
    const onChooseWard = (ward: IWard) => {
        if (address.district.code) {
            setAddress({
                ...address,
                ward: {
                    code: ward.ward_code,
                    name: ward.name
                }
            })
        }
    }

    const handleSubmitForm = async () => {
        if (
            address.district.code &&
            address.province.code &&
            address.ward.code &&
            address.short_address.length > 0
        ) {
            const values = {
                address: `${address.short_address},${address.ward.name},${address.district.name},${address.province.name}`,
                is_default: true
            }
            await dispatch(postAsyncAddress(values))
            //const action = removeDefaultItem(address_default);
            //dispatch(action)
            // if (fullScreen === false) return history.goBack();
            // if (setOpen && fullScreen === true) return setOpen(false)
            history.goBack()
        }
    }
    return (
        <>
            <HeadTitle title={t('acc.add new')} />
            <div
                className='us_address-cnt'
            >
                <div className="form">
                    <div
                        onClick={onToggleProvince}
                        className="from-label"
                    >
                        <span className="text-bold from-label_title">
                            {t("acc.province")}
                        </span>
                        <div className="from-label_ip">
                            {
                                address.province.name ?
                                    <span
                                        style={{ color: 'var(--black)', fontWeight: 'bold' }}
                                    >
                                        {address.province.name}
                                    </span>
                                    :
                                    <span>
                                        Vui lòng chọn tỉnh/thành phố
                                    </span>
                            }
                        </div>
                        <div className="from-label__list-province">
                            <ul>
                                {
                                    provinces.map((item: IProvince, index: number) => (
                                        <li
                                            className='province-item'
                                            style={item.province_code === address.province.code ?
                                                { color: 'var(--purple)' } : { color: 'var(--black)' }}
                                            onClick={() => onChooseProvince(item)}
                                            key={index}
                                        >
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div
                        onClick={toggleDistrict}
                        className="from-label"
                    >
                        <span className="text-bold from-label_title">
                            Quận / Huyện
                        </span>
                        <div className="from-label_ip">
                            {
                                address.district.name ?
                                    <span
                                        style={{ color: 'var(--black)', fontWeight: 'bold' }}
                                    >
                                        {address.district.name}
                                    </span>
                                    :
                                    <span>
                                        Vui lòng chọn quận / huyện
                                    </span>
                            }
                        </div>
                        <div className="from-label__list-district">
                            <ul>
                                {
                                    dataAdd.districts.map((item: IDistrict, index: number) => (
                                        <li
                                            className='province-item'
                                            style={item.province_code === address.province.code ?
                                                { color: 'var(--purple)' } : { color: 'var(--black)' }}
                                            onClick={() => onChooseDistrict(item)}
                                            key={index}
                                        >
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div
                        onClick={onToggleWard}
                        className="from-label"
                    >
                        <span className="text-bold from-label_title">
                            Xã / Phường
                        </span>
                        <div className="from-label_ip">
                            {
                                address.ward.name ?
                                    <span
                                        style={{ color: 'var(--black)', fontWeight: 'bold' }}
                                    >
                                        {address.ward.name}
                                    </span>
                                    :
                                    <span>
                                        Vui lòng chọn Xã / Phường
                                    </span>
                            }
                        </div>
                        <div className="from-label__list-ward">
                            <ul>
                                {
                                    dataAdd.wards?.map((item: IWard, index: number) => (
                                        <li
                                            className='province-item'
                                            style={item.province_code === address.province.code ?
                                                { color: 'var(--purple)' } : { color: 'var(--black)' }}
                                            onClick={() => onChooseWard(item)}
                                            key={index}
                                        >
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="from-label">
                        <span className="text-bold from-label_title">
                            Địa chỉ nhận hàng
                        </span>
                        <div className="from-label_ip">
                            <input
                                onChange={(e) => setAddress({ ...address, short_address: e.target.value })}
                                type="text"
                                placeholder='Vui lòng nhập địa chỉ của bạn'
                            />
                        </div>
                    </div>
                    <div className="form-btn">
                        <XButton
                            loading={status_up === STATUS.LOADING ? true : false}
                            onClick={handleSubmitForm}
                            title="Thêm mới địa chỉ"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserAddressForm;