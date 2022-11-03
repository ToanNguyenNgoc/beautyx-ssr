import { IOrganization } from 'interface/organization'
import React from 'react'
import { onErrorImg } from "utils"
import formatPrice, { formatSalePriceService } from "utils/formatPrice"
import { formatDistance } from 'utils/format'
import { Link } from 'react-router-dom'
import {
    formatRouterLinkProduct,
    formatRouterLinkService
} from "utils/formatRouterLink/formatRouter"
import style from "./style.module.css"
import icon from "constants/icon"
import scrollTop from 'utils/scrollTop'
import GoogleTagPush, { GoogleTagEvents } from 'utils/dataLayer'
import tracking from 'api/trackApi'
import { logEvent, analytics } from '../../../firebase'

interface SerProItemProps {
    item: any,
    org?: IOrganization,
    type: "SERVICE" | "PRODUCT",
    changeStyle?: boolean
}

export function SerProItem(props: SerProItemProps) {
    const { item, org, type, changeStyle } = props;
    const org_dis = {
        id: org?.id ?? item.org_id,
        name: org?.name ?? item.org_name,
        image_url: org?.image_url ?? item.org_image,
        full_address: org?.full_address ?? item.org_full_address
    }
    const name = item.service_name ?? item.product_name
    const id = item.product_id ?? item.service_id ?? item.id
    const price = item.retail_price ?? item.price
    const special_price = formatSalePriceService(item.special_price, item.special_price_momo)
    const address = (item.org_district_name && item.org_province_name) ?
        `${item.org_district_name},${item.org_province_name}` : org_dis.full_address
    const percent = 100 - Math.ceil(special_price / price * 100)
    //---
    let data_analytic: any = {
        service: name,
        merchant: org_dis.name
    }
    if (type === "PRODUCT") {
        data_analytic = {
            product: name,
            merchant: org_dis.name
        }
    }
    const onItemClick = async () => {
        scrollTop();
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        tracking.USER_ITEM_CLICK(org_dis.id, id);
        logEvent(analytics, type === "SERVICE" ? 'detail_service' : 'detail_product', data_analytic)
    }
    let LINK_DETAIL = formatRouterLinkService(id, org_dis.id, name)
    if (type === "PRODUCT") LINK_DETAIL = formatRouterLinkProduct(id, org_dis.id, name)

    return (
        <Link
            to={{ pathname: LINK_DETAIL }}
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
                        </div>:''
                    }
                    <img
                        style={changeStyle ? { borderRadius: "8px" } : {}}
                        className={style.item_img}
                        onError={(e) => onErrorImg(e)}
                        src={item.image_url ?? org_dis.image_url} alt=""
                    />
                    {
                        !changeStyle && <img
                            className={style.item_org_avatar}
                            src={org_dis.image_url} alt=""
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
                    >{name}</span>
                    <div className={
                        !changeStyle ? style.item_price : style.item_price_ch
                    }>
                        {
                            special_price > 0 ?
                                <>
                                    <span>{formatPrice(special_price)}</span>
                                    <span>{formatPrice(price)}</span>
                                </>
                                :
                                <span style={{ color: "var(--purple)" }} >{formatPrice(price)}</span>
                        }
                    </div>
                    {
                        item._geoDistance &&
                        <div className={style.item_distance}>
                            <span></span>
                            <h5>{formatDistance(item._geoDistance)}</h5>
                        </div>
                    }
                    <div className={style.item_address}>
                        <img src={icon.pinMapRed} alt="" />
                        <span>{address}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}