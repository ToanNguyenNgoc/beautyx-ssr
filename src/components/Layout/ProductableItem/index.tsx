import icon from 'constants/icon';
import { Productable } from 'interface';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance, onErrorImg } from 'utils';
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import style from './productable.module.css'

interface ProductableItemProps {
    productable: Productable
    changeStyle?: boolean
}

export function ProductableItem(props: ProductableItemProps) {
    const { productable, changeStyle } = props;
    const org = productable.content?.organization[0]
    const special_price = formatSalePriceService(
        productable.content?.discount_price,
        productable.content?.discount_ecommerce_price
    )
    const percent = 100 - Math.ceil(special_price / productable.content?.price * 100)
    const onItemClick = () => {

    }
    return (
        <Link
            to={{ pathname: '/' }}
            onClick={onItemClick}
        >
            <div
                className={!changeStyle ? style.container : style.container_change}
            >
                <div className={!changeStyle ? style.img_container : style.img_container_change}>
                    {special_price > 0 &&
                        percent && percent > 1 ?
                        <div className={style.item_percent}>
                            Giảm {percent}%
                        </div> : ''
                    }
                    <img
                        style={changeStyle ? { borderRadius: "8px" } : {}}
                        className={style.item_img}
                        onError={(e) => onErrorImg(e)}
                        src={productable.content?.media[0]?.original_url ?? org?.image_url} alt=""
                    />
                    {
                        !changeStyle && <img
                            className={style.item_org_avatar}
                            src={org?.image_url} alt=""
                            onError={(e) => onErrorImg(e)}
                        />
                    }
                </div>
                <div
                    className={!changeStyle ? style.detail_container : style.detail_container_change}
                >
                    <span className={
                        !changeStyle ? style.item_name : `${style.item_name} ${style.item_name_ch}`
                    }
                    >{productable.content?.name}</span>
                    <div className={
                        !changeStyle ? style.item_price : style.item_price_ch
                    }>
                        {
                            special_price > 0 ?
                                <>
                                    <span>{formatPrice(special_price)}</span>
                                    <span>{formatPrice(productable.content?.price)}</span>
                                </>
                                :
                                <span style={{ color: "var(--purple)" }} >
                                    {formatPrice(productable.content?.price)}
                                </span>
                        }
                    </div>
                    {
                        productable.content?.distance &&
                        <div className={style.item_distance}>
                            <span></span>
                            <h5>{formatDistance(productable.content?.distance)}</h5>
                        </div>
                    }
                    <div className={style.item_address}>
                        <img src={icon.pinMapRed} alt="" />
                        <span>
                            {org?.full_address}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}