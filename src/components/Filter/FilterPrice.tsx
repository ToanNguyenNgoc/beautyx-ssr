import { Input } from 'components/Layout';
import React, { useState } from 'react';
import { XButton } from 'components/Layout'
import style from "./style.module.css"

interface FilterPriceProps {
    onChangePrice?: (e: any) => void
    min_price?: any,
    max_price?: any
}
interface PriceList {
    id: number, min_price: string, max_price: string, title: string
}
export const pricesList: PriceList[] = [
    { id: 1, min_price: "0", max_price: "1000000", title: "Dưới 1 triệu" },
    { id: 2, min_price: "1000000", max_price: "4000000", title: "Từ 1 - 4 triệu" },
    { id: 3, min_price: "4000000", max_price: "8000000", title: "Từ 4 - 8 triệu" },
    { id: 4, min_price: "8000000", max_price: "12000000", title: "Từ 8 - 12 triệu" },
    { id: 5, min_price: "12000000", max_price: "20000000", title: "Từ 12 - 20 triệu" },
    { id: 6, min_price: "20000000", max_price: "", title: "Trên 20 triệu" }
]

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
        if (parseInt(value.max_price) > parseInt(value.min_price) || (value.min_price === "" && value.max_price === "")) {
            if (onChangePrice) onChangePrice(value)
        }
    }
    const onChoosePrice = (item:PriceList)=>{
        setValue({
            max_price:item.max_price,
            min_price:item.min_price
        })
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
                    parseInt(value.min_price) >= parseInt(value.max_price) && value.min_price !== "" && value.max_price !== "" &&
                    <div className={style.price_invalid}>
                        Vui lòng điền khoảng giá phù hợp
                    </div>
                }
                <ul className={style.price_list_cnt}>
                    {
                        pricesList.map((item:PriceList)=>(
                            <li 
                                style={
                                    (value.min_price === item.min_price && value.max_price === item.max_price)?
                                    {
                                        backgroundColor:'var(--purple)',
                                        color:'var(--bg-white)'
                                    }:{}
                                }
                                onClick={()=>onChoosePrice(item)}
                                key={item.id} className={style.price_list_item}
                            >
                                {item.title}
                            </li>
                        ))
                    }
                </ul>
                <XButton
                    className={style.price_btn}
                    title='Áp dụng'
                    onClick={onApplyPrice}
                />
            </div>
        </div>
    );
}