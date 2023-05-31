import { Input } from 'components/Layout';
import React, { useContext, useState } from 'react';
import { XButton } from 'components/Layout'
import style from "./style.module.css"
import { AppContext } from 'context/AppProvider';

interface FilterPriceProps {
    onChangePrice?: (e: any) => void,
    onCloseDrawer?: () => void
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
    { id: 6, min_price: "20000000", max_price: "10000000000", title: "Trên 20 triệu" }
]

export function FilterPrice(props: FilterPriceProps) {
    const {t} = useContext(AppContext) as any
    const { onChangePrice, min_price, max_price, onCloseDrawer } = props;
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
        if (
            parseInt(value.max_price) > parseInt(value.min_price) || (value.min_price === "" && value.max_price === "")) {
            if (onChangePrice) onChangePrice(value)
        }
        if (onCloseDrawer) onCloseDrawer()
    }
    const onChoosePrice = (item: PriceList) => {
        setValue({
            max_price: item.max_price,
            min_price: item.min_price
        })
    }
    return (
        <div className={style.container}>
            <span className={style.filter_title}>{t('home_2.price')}</span>
            <div className={style.body}>
                <span className={style.body_title}>{t('home_2.Choose a price range')}</span>
                <div className={style.price_cnt}>
                    <div className={style.price_item}>
                        <Input type="number" value={value.min_price} onChange={onChangeMin} placeholder={t('se.from')} />
                    </div>
                    <div className={style.price_item}>
                        <Input type="number" value={value.max_price} onChange={onChangeMax} placeholder={t('se.to')} />
                    </div>
                </div>
                {
                    parseInt(value.min_price) >= parseInt(value.max_price) && value.min_price !== "" && value.max_price !== "" &&
                    <div className={style.price_invalid}>
                        {t('se.Please enter the appropriate price range')}
                    </div>
                }
                {/* <ul className={style.price_list_cnt}>
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
                </ul> */}
                <XButton
                    className={style.price_btn}
                    title={t('se.Apply')}
                    onClick={onApplyPrice}
                />
            </div>
        </div>
    );
}