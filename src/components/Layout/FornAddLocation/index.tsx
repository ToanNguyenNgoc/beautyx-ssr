/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useCallback, useState } from 'react';
import style from './form-add.module.css'
import { PopupNotification } from 'components/Notification'
import { Input, XButton } from 'components/Layout'
import { useFetch } from 'utils';
import API_3RD from 'api/3rd-api';
import { debounce } from 'lodash';

interface FormAddLocationProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

export function FormAddLocation(props: FormAddLocationProps) {
    const { open, setOpen } = props;
    const [keyword, setKeyword] = useState({ key: "", de: "" })
    const [location, setLocation] = useState<any>()
    const onDebounce = useCallback(
        debounce((text) => setKeyword({ key:text, de: text }), 1000), []
    )
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword({ ...keyword, key: e.target.value })
        onDebounce(e.target.value)
    }
    const { response } = useFetch(keyword.de !== "", API_3RD.API_MAP_BOX_KEY_WORD(keyword.de))
    const onSaveLocation = () => {
        if (location) {
            sessionStorage.setItem('USER_LOCATION', JSON.stringify({
                lat: location.center[1],
                long: location.center[0]
            }))
            setOpen(false)
        }
    }
    return (
        <PopupNotification
            open={open} setOpen={setOpen}
            title='Thông báo'
            content='Không lấy được vị trí hiện tại. Thêm mới vị trí'
            children={
                <div className={style.form_cnt} >
                    <div className={style.input_cnt}>
                        <Input
                            onChange={onChange}
                            value={keyword.key}
                            placeholder="Nhập vị trí..."
                        />
                    </div>
                    <ul className={style.list_location}>
                        {
                            response?.features?.map((item: any, index: number) => (
                                <li 
                                onClick={() => {
                                    setLocation(item)
                                    setKeyword({...keyword, key:item.place_name})
                                }}
                                    key={index} className={style.list_location_item}
                                >
                                    {item.place_name}
                                </li>
                            ))
                        }
                    </ul>
                    <div className={style.btn_cnt}>
                        <XButton
                            onClick={onSaveLocation}
                            title='Lưu vị trí'
                        />
                    </div>
                </div>
            }
        />
    );
}