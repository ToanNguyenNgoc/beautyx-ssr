import React, { useContext } from 'react';
import API_3RD from '../../../api/3rd-api';
import useFetch from '../../../utils/useFetch';
import { SerProCommonWatched } from '../../../interface/servicePromo';
import style from "./home-watched.module.css"
import { AppContext } from '../../../context/AppProvider';
import onErrorImg from '../../../utils/errorImg';
import formatPrice from '../../../utils/formatPrice';
import { formatSalePriceService } from '../../../utils/formatPrice';
import slugify from '../../../utils/formatUrlString';
import icon from '../../../constants/icon';
import { Link } from 'react-router-dom';

function HomeWatched() {
    const { response } = useFetch(`${API_3RD.API_NODE}/history`)
    return (
        response?.length > 0 ?
            <div className={style.container}>
                <span className={style.title}>
                    Dịch vụ / Sản phẩm đã xem
                </span>
                <div className={style.body}>
                    <ul className={style.list_item}>
                        {
                            response.map((item: SerProCommonWatched, index: number) => (
                                <li className={style.item_cnt}>
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

const CardItemCommon = ({ detail }: { detail: SerProCommonWatched }) => {
    const { t } = useContext(AppContext);
    const special_price = formatSalePriceService(detail.special_price, detail.special_price_momo)
    const discount_percent = 100 - Math.round(special_price / detail.price * 100)
    let LINK = `/dich-vu/${slugify(detail.name)}?id=${detail.id}&org=${detail.org_id}`
    if (detail.type === "PRODUCT") LINK = `/san-pham/${slugify(detail.name)}?id=${detail.id}&org=${detail.org_id}`
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