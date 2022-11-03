import React, { useContext } from "react";
import { Product } from "../../../interface/product";
import { IOrganization } from "../../../interface/organization";
import onErrorImg from "../../../utils/errorImg";
import formatPrice, { formatSalePriceService } from "../../../utils/formatPrice";
import icon from "../../../constants/icon";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    onFavoriteProduct,
    onDeleteFavorite,
} from "../../../redux/org_products/productSlice";
import { AppContext } from "../../../context/AppProvider";
import DetailOrgVoucher from "../../../components/DetailVoucherOrg";
import useDeviceMobile from "../../../utils/useDeviceMobile";

interface IProps {
    product: Product;
    org: IOrganization;
}

function ProductDetailLeft(props: IProps) {
    const IS_MB = useDeviceMobile();
    const { product, org } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useContext(AppContext);
    const productSaleSpecial = formatSalePriceService(product.special_price, product.special_price_momo)

    const percent = Math.round(
        100 - (productSaleSpecial / product?.retail_price) * 100
    );
    const { USER } = useSelector((state: any) => state.USER);
    const onFavorite = () => {
        if (USER) {
            const values = {
                product: product,
                org_id: org?.id,
            };
            if (product.is_favorite) {
                dispatch(onDeleteFavorite(values));
            } else {
                dispatch(onFavoriteProduct(values));
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            product?.image_url
                                ? product?.image_url
                                : org?.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                {/* detail service mobile */}
                <div className="service-detail__mobile">
                    <div className="service-detail__mobile-top">
                        <p className="service-detail__mobile-name">
                            {product?.product_name}
                        </p>
                        <div
                            onClick={onFavorite}
                            className="service-detail__mobile-favorite"
                        >
                            <img
                                src={
                                    product?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>

                    {/* <div className="service-detail__mobile-mid">
                        <img src={icon.alarmClock} alt="" />
                        <p className="service-detail__mobile-duration">
                            {product.duration} phút
                        </p>
                    </div> */}

                    <div className="service-detail__mobile-bottom">
                        {productSaleSpecial > 0 && (
                            <div className="service-detail__mobile-percent">
                                {`${t("detail_item.off")}`} {percent}%
                            </div>
                        )}
                        <div className="service-detail__mobile-price">
                            {productSaleSpecial > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(productSaleSpecial)}đ
                                    </span>
                                    <span>
                                        {formatPrice(product?.retail_price)}
                                    </span>
                                </>
                            ) : (
                                <span>
                                    {formatPrice(product?.retail_price)}đ
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {
                    IS_MB &&
                    <DetailOrgVoucher
                        org={org}
                    />
                }
            </div>
        </>
    );
}

export default ProductDetailLeft;
