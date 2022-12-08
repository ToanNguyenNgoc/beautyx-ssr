import React, { useContext } from 'react';
import { useFetch } from 'hooks';
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import { Link } from 'react-router-dom';
import { SerProCommonWatched } from 'interface/servicePromo';
import { slugify, onErrorImg, clst } from 'utils';
import API_3RD from 'api/3rd-api';
import { AppContext } from 'context/AppProvider';
import style from "./home-watched.module.css";
import icon from 'constants/icon';
import { useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { formatRouterLinkProduct, formatRouterLinkService } from 'utils/formatRouterLink/formatRouter';

interface HomeWatchedProps {
    styleProp?: any,
    classNameTile?: string
}


function HomeWatched(props: HomeWatchedProps) {
    const { USER } = useSelector((state: IStore) => state.USER)
    const { styleProp, classNameTile } = props
    const { response } = useFetch(USER, `${API_3RD.API_NODE}/history`)
    return (
        response?.context?.data?.length > 0 ?
            <div
                style={styleProp ? styleProp : {}}
                className={style.container}
            >
                <span className={clst([style.title, classNameTile ?? ''])}>
                    Dịch vụ / Sản phẩm đã xem
                </span>
                <div className={style.body}>
                    <ul className={style.list_item}>
                        {
                            response?.context?.data?.map((item: SerProCommonWatched, index: number) => (
                                <li key={index} className={style.item_cnt}>
                                    <CardItemCommon detail={item} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            :
            <></>
    );
}

export default HomeWatched;

export const CardItemCommon = ({ detail }: { detail: SerProCommonWatched }) => {
    const { t } = useContext(AppContext);
    const special_price = formatSalePriceService(detail.special_price, detail.special_price_momo)
    const discount_percent = 100 - Math.round(special_price / detail.price * 100)
    let LINK = formatRouterLinkService(detail.id, detail.org_id, detail.name)
    if (detail.type === "PRODUCT") LINK = formatRouterLinkProduct(detail.id, detail.org_id, detail.name)
    if (detail.type === "DISCOUNT") {
        LINK = `/chi-tiet-giam-gia/service_${detail.org_id}_${detail.id}_${detail.productable_id}_${slugify(detail.name)}`
    }
    return (
        <Link
            to={{ pathname: LINK }}
            className={style.card_item_common}
        >
            <div className={style.ser_img_cnt}>
                {detail.org_image !== "" && <img src={detail.org_image} className={style.ser_img_org_logo} onError={(e) => onErrorImg(e, true)} alt="" />}
                <img
                    className={style.img_service}
                    src={
                        detail?.image_url
                            ? `${detail.image_url}`
                            : `${detail?.org_image}`
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className={style.ser_promo}>
                    {
                        special_price > 0 &&
                        <div className={style.ser_promo_percent}>
                            {t("detail_item.off")}{" "}
                            {Math.round(discount_percent)}%
                        </div>
                    }
                </div>
            </div>
            <div className={style.ser_pro_item_cnt}>
                <span className={style.ser_name}>{detail?.name}</span>
                <div className={style.ser_price}>
                    {special_price > 0 ?
                        (
                            <>
                                <span>{formatPrice(special_price)}đ</span>
                                <span>{formatPrice(detail?.price)}đ</span>
                            </>
                        )
                        :
                        (
                            <span style={{ color: "var(--purple)" }}>
                                {formatPrice(detail?.price)}đ
                            </span>
                        )}
                </div>
                <div className={style.ser_org_address}>
                    <img src={icon.mapPinRed} alt="" />
                    <p>
                        {detail?.org_full_address},
                    </p>
                </div>
            </div>
        </Link>
    )
}