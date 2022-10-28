/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */

import { Drawer } from '@mui/material';
import { AUTH_LOCATION } from 'api/authLocation';
import API_ROUTE from 'api/_api';
import { Input, XButton, FormAddLocation } from 'components/Layout';
import icon from 'constants/icon';
import { IProvince, IDistrict } from 'interface';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSwr, useGetLocation, useSearchKeyword, useDeviceMobile } from 'utils';
import style from './style.module.css'

export interface EventLocation {
    coords: string,
    province?: IProvince,
    district?: IDistrict
}

interface FilterLocationProps {
    onChange?: (e: EventLocation) => void,
    province_code?: number | string,
    district_code?: number | string,
}

export function FilterLocation(props: FilterLocationProps) {
    const location = AUTH_LOCATION()
    const IS_MB = useDeviceMobile()
    const { onChange, province_code, district_code } = props
    const [open, setOpen] = useState({
        oProvince: false,
        oDistrict: false
    })
    const [openAddLo, setOpenAddLo] = useState(false);
    const [province, setProvince] = useState<IProvince | any>()
    const [district, setDistrict] = useState<IDistrict | any>()
    const [keyword, setKeyword] = useState('')
    const provincesSelect = useSelector((state: any) => state.HOME.provinces)
    const provinces = useSearchKeyword(keyword, provincesSelect)
    const { q_location } = useGetLocation(district?.name ?? province?.name ?? "")
    const handleChange = (currentCoords?: string) => {
        if (onChange && (q_location !== "" || currentCoords !== "")) {
            onChange({
                coords: currentCoords !== "" ? currentCoords : q_location,
                province: province,
                district: district
            })
        }

    }
    //handle event
    const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }
    const chooseCurrentCoords = () => {
        if (!location || location === "") return setOpenAddLo(true)
        setProvince("cur")
        setDistrict("cur")
    }
    const choosePro = (pro: IProvince) => {
        setProvince(pro)
        if (pro.province_code !== province?.province_code) setDistrict(null)
    }
    const chooseProAndOpenDis = (pro: IProvince) => {
        setProvince(pro)
        setOpen({ ...open, oDistrict: true })
    }
    const chooseDisAndClose = (dis: IDistrict) => {
        setDistrict(dis)
        setOpen({ ...open, oDistrict: false })
    }
    //[GET BY PROVINCE]
    let conditionDis = false
    if (province?.province_code) conditionDis = true
    if (province_code !== "cur" && province_code !== "") conditionDis = true
    const { responseArray } = useSwr(
        API_ROUTE.PROVINCES_CODE_DISTRICTS(province?.province_code ?? (province_code !== "cur" ? province_code : "")),
        conditionDis)
    useEffect(() => {
        if (province_code !== "cur") {
            const prevPro = provincesSelect?.find((item: IProvince) => item.province_code == province_code)
            setProvince(prevPro)
        }
        if (district_code !== "cur") {
            const prevDis = responseArray?.find((item: IDistrict) => item.district_code == district_code)
            setDistrict(prevDis)
        }
        if (province_code === "cur") {
            setProvince("cur")
        }
    }, [province_code, district_code])
    return (
        <div className={style.container}>
            <FormAddLocation open={openAddLo} setOpen={setOpenAddLo} />
            <span className={style.title}>Khu vực</span>
            <div className={style.location}>
                <span className={style.location_text}>
                    {
                        district?.name ? `${district.name},` : ""}{province?.name ??
                            ((province === "cur" || district === "cur") ? "Gần bạn" : "Chọn vị trí")
                    }
                </span>
                <XButton
                    onClick={() => setOpen({ ...open, oProvince: true })}
                    className={style.location_btn}
                    icon={icon.mapMarker}
                />
            </div>
            <Drawer
                onBackdropClick={() => handleChange(
                    province === "cur" ? location : ""
                )}
                open={open.oProvince}
                onClose={() => setOpen({ oDistrict: false, oProvince: false })}
                anchor={IS_MB ? "bottom":"left"}
            >
                <div className={style.province_cnt}>
                    <div className={style.province_cnt_head}>
                        <Input value={keyword} onChange={onChangeKeyword} placeholder='Tìm kiếm khu vực' />
                    </div>
                    <div className={style.province_list_cnt}>
                        <ul className={style.province_list}>
                            <li
                                onClick={chooseCurrentCoords}
                                className={style.province_item}
                            >
                                <div className={style.province_item_name}>
                                    <div className={style.radio_btn}>
                                        {
                                            province === "cur" &&
                                            <div className={style.radio_btn_check}></div>
                                        }
                                    </div>
                                    <span className={style.province_name}>
                                        Gần bạn
                                    </span>
                                </div>
                            </li>
                            {
                                provinces?.map((pro: IProvince) => (
                                    <li key={pro.province_code} className={style.province_item}>
                                        <div onClick={() => choosePro(pro)} className={style.province_item_name}>
                                            <div className={style.radio_btn}>
                                                {
                                                    province?.province_code === pro.province_code &&
                                                    <div className={style.radio_btn_check}></div>
                                                }
                                            </div>
                                            <span className={style.province_name}>
                                                {
                                                    district &&
                                                    province?.province_code === pro.province_code &&
                                                    `${district?.name},`
                                                }
                                                {pro.name}
                                            </span>
                                        </div>
                                        <XButton
                                            onClick={() => chooseProAndOpenDis(pro)}
                                            className={style.che_right_btn}
                                            icon={icon.chevronRight}
                                            iconSize={22}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Drawer>
            <Drawer
                open={open.oDistrict}
                onClose={() => setOpen({ ...open, oDistrict: false })}
                anchor={IS_MB ? "bottom":"left"}
            >
                <div className={style.province_cnt}>
                    <div className={style.province_list_cnt}>
                        <ul className={style.province_list}>
                            {
                                responseArray?.map((dis: IDistrict) => (
                                    <li key={dis.district_code} className={style.province_item}>
                                        <div
                                            onClick={() => chooseDisAndClose(dis)}
                                            className={style.province_item_name}
                                        >
                                            <div className={style.radio_btn}>
                                                {
                                                    district?.district_code === dis.district_code &&
                                                    <div className={style.radio_btn_check}></div>
                                                }
                                            </div>
                                            {dis.name}
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}