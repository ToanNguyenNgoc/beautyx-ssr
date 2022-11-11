import React from "react";
import style from "./style.module.css";
import { useDeviceMobile, useSwrInfinite } from "utils";
import HeadMobile from "features/HeadMobile";
import Head from "features/Head";
import Footer from "features/Footer";
import { Container } from "@mui/material";
import { XButton } from "components/Layout";
import { paramsDiscounts } from "params-query";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { IDiscountPar, IITEMS_DISCOUNT } from "interface";
import { DISCOUNT_TYPE } from "../../utils/formatRouterLink/fileType";
import formatPrice from "utils/formatPrice";
import { useHistory } from "react-router-dom";
import tracking from "api/trackApi";
import { analytics, logEvent } from "../../firebase";
import { formatRouterLinkDiscount } from "utils/formatRouterLink/formatRouter";
import dayjs from "dayjs";

export default function VoucherPage() {
    const IS_MB = useDeviceMobile();
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const history = useHistory();

    const newParams = {
        ...paramsDiscounts,
        page: 1,
        sort: PLAT_FORM === "TIKI" ? "-priority" : "",
    };
    const { resData, isValidating } = useSwrInfinite(
        true,
        "/discounts",
        newParams
    );
    const discounts = resData;
    console.log(discounts);
    const onDetail = (item: IITEMS_DISCOUNT, discount: IDiscountPar) => {
        tracking.DISCOOUNT_ITEM_CLICK(
            item.organization.id,
            "khuyến mãi hot",
            item.discount_id
        );
        logEvent(analytics, "detail_discount", {
            service: item.productable.product_name,
            merchant: item.organization.name,
        });
        history.push(formatRouterLinkDiscount(discount, item));
    };
    return (
        <div className={style.voucher_page}>
            {IS_MB ? <HeadMobile title="Voucher" /> : <Head />}
            <Container>
                <div className={style.container}>
                    <div className={style.voucher_list}>
                        {discounts
                            .filter(
                                (i: IDiscountPar) =>
                                    i.items.length > 0 &&
                                    (i.discount_type ===
                                        DISCOUNT_TYPE.PRODUCT.key ||
                                        i.discount_type ===
                                            DISCOUNT_TYPE.FINAL_PRICE.key)
                            )
                            .map((discount: IDiscountPar, index: number) => (
                                <div key={index}>
                                    {discount.items.map(
                                        (item: IITEMS_DISCOUNT, i: number) => (
                                            <div
                                                key={index}
                                                className={style.voucher_item}
                                            >
                                                <div
                                                    className={
                                                        style.voucher_item_left
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            style.voucher_item_img
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                item
                                                                    ?.productable
                                                                    ?.image
                                                                    ? item
                                                                          .productable
                                                                          ?.image_url
                                                                    : item
                                                                          .organization
                                                                          ?.image_url
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        style.voucher_item_right
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            style.voucher_item_info
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.voucher_info_name
                                                            }
                                                        >
                                                            <span>
                                                                {item
                                                                    ?.productable
                                                                    ?.service_name ||
                                                                    item
                                                                        ?.productable
                                                                        ?.product_name}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={
                                                                style.voucher_info_price
                                                            }
                                                        >
                                                            <p>
                                                                {formatPrice(
                                                                    item
                                                                        ?.productable
                                                                        ?.price ||
                                                                        item
                                                                            ?.productable
                                                                            ?.retail_price
                                                                )}
                                                                đ
                                                            </p>
                                                            <p>
                                                                Giảm còn:{" "}
                                                                <span>
                                                                    {discount?.discount_type ===
                                                                    DISCOUNT_TYPE
                                                                        .FINAL_PRICE
                                                                        .key
                                                                        ? `${formatPrice(
                                                                              discount?.discount_value
                                                                          )}đ`
                                                                        : `${formatPrice(
                                                                              item?.view_price
                                                                          )}đ`}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                style.voucher_item_expiry
                                                            }
                                                        >
                                                            <p>
                                                                HSD:{" "}
                                                                {discount?.valid_from &&
                                                                    dayjs(
                                                                        discount?.valid_from
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}{" "}
                                                                {"- "}
                                                                {discount?.valid_util &&
                                                                    dayjs(
                                                                        discount?.valid_util
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <XButton
                                                        onClick={() =>
                                                            onDetail(
                                                                item,
                                                                discount
                                                            )
                                                        }
                                                        title={"Chi tiết"}
                                                        className={`${style.voucher_item_btn}`}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
}
