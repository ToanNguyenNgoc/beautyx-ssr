import React, { useState } from 'react';
import Input from '../Input';
import ButtonLoading from '../ButtonLoading';
import style from "./filter-cate.module.css"

interface FilterPriceProps {
    onChangePrice?: (e: any) => void
    min_price?: any,
    max_price?: any
}

export function FilterPrice(props: FilterPriceProps) {
    const { onChangePrice, min_price, max_price } = props;
    const [value, setValue] = useState({
        min_price: min_price ?? "",
        max_price: max_price ?? ""
    })
    const onChangeMin = (e: any) => {
        const min = e.target.value
        if (min > 0 || min === "") setValue({ ...value, min_price: min })
    }
    const onChangeMax = (e: any) => {
        const max = e.target.value
        if (max > 0 || max === "") setValue({ ...value, max_price: max })
    }
    const onApplyPrice = () => {
        if (value.max_price > value.min_price || (value.min_price === "" && value.max_price === "")) {
            if (onChangePrice) onChangePrice(value)
        }
    }
    return (
        <div className={style.container}>
            <span className={style.filter_title}>Giá</span>
            <div className={style.body}>
                <span className={style.body_title}>Chọn khoảng giá</span>
                <div className={style.price_cnt}>
                    <div className={style.price_item}>
                        <Input type="number" value={value.min_price} onChange={onChangeMin} placeholder='Từ' />
                    </div>
                    <div className={style.price_item}>
                        <Input type="number" value={value.max_price} onChange={onChangeMax} placeholder='đến' />
                    </div>
                </div>
                {
                    value.min_price >= value.max_price && value.min_price !== "" && value.max_price !== "" &&
                    <div className={style.price_invalid}>
                        Vui lòng điền khoảng giá phù hợp
                    </div>
                }
                <ButtonLoading
                    className={style.price_btn}
                    title='Áp dụng'
                    onClick={onApplyPrice}
                />
            </div>
        </div>
    );
}