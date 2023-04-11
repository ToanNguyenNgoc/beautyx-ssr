import React from 'react';
import { ISpecialItem } from "interface/service"
import { Link } from 'react-router-dom'
import formatPrice from 'utils/formatPrice';
import style from "./special.module.css"
import slugify from 'utils/formatUrlString';

export function SpecialItem({ item }: { item: ISpecialItem }) {
    let link = ``
    if (item.type === "SERVICE") link = `/dich-vu/${item.id}_${item.organization_id}_${slugify(item.name)}`
    if (item.type === "DISCOUNT") {
        link = `/chi-tiet-giam-gia/service_${item.organization_id}_${item.id}_${item.item_id}_${slugify(item.name)}`
    }
    return (
        <Link to={{ pathname: link }} >
            <div className={style.container}>
                <div className={style.item_img_cnt}>
                    <img src={item.image_url} className={style.item_img} alt="" />
                </div>
                <div className={style.item_detail}>
                    <span className={style.item_name}>
                        {item.name}
                    </span>
                    <div className={style.item_price}>
                        {
                            item.special_price > 0 &&
                            <span>{formatPrice(item.special_price)}đ</span>
                        }
                        <span>{formatPrice(item.price)}đ</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}