import React from 'react';
import { ISpecialItem } from "interface/service"
import { Link } from 'react-router-dom'
import formatPrice from 'utils/formatPrice';
import style from "./special.module.css"
import slugify from 'utils/formatUrlString';

export function SpecialItem({ item }: { item: ISpecialItem }) {
    let link = ``
    if (item.type === "SERVICE") link = `/dich-vu/${slugify(item.name)}?id=${item.id}&org=${item.organization_id}`
    if (item.type === "DISCOUNT") {
        link = `/chi-tiet-giam-gia/${slugify(item.name)}?type=service&org_id=${item.organization_id}&dis_id=${item.id}&item_id=${item.item_id}`
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