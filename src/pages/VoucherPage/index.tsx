import React from "react";
import style from "./style.module.css";
import { useDeviceMobile, useSwrInfinite } from "hooks";
import HeadMobile from "features/HeadMobile";
import Head from "components/Head";
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
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { BackTopButton } from "components/Layout";

interface DiscountItemsType extends IITEMS_DISCOUNT {
    discount: IDiscountPar
}

export default function VoucherPage() {
    const IS_MB = useDeviceMobile();
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const newParams = {
        ...paramsDiscounts,
        limit: 30,
        sort: PLAT_FORM === "TIKI" ? "-priority" : "",
    };
    const { resData, totalItem, onLoadMore } = useSwrInfinite(
        true,
        "/discounts",
        newParams
    );
    const discounts = resData ?? [];
    const onViewMore = () => {
        if (resData.length < totalItem) {
            onLoadMore()
        }
    }
    const discountItems: DiscountItemsType[] = discounts.map((i: IDiscountPar) => {
        const items = i.items.map((child: IITEMS_DISCOUNT) => {
            return {
                ...child,
                discount: i
            }
        })
        return items.flat()
    }).flat()

    return (
        <div>
            {IS_MB ? <HeadMobile title="Voucher" /> : <Head />}
            <Container>
                <div className={style.voucher_page}>
                    <InfiniteScroll
                        dataLength={discounts.length}
                        hasMore={true}
                        loader={<></>}
                        next={onViewMore}
                    >
                        <div className={style.voucher_list}>
                            {
                                discountItems.map((item: DiscountItemsType, index: number) => (
                                    <ItemDiscount
                                        item={item}
                                        key={index}
                                    />
                                ))
                            }
                        </div>
                        {resData.length < totalItem && <LoadSkelton />}
                    </InfiniteScroll>
                </div>
            </Container>
            <BackTopButton />
        </div>
    );
}

const ItemDiscount = ({ item }: { item: DiscountItemsType }) => {
    const history = useHistory();
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
        <div className={style.voucher_item_cnt}>
            <div
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
                                    {item.discount?.discount_type ===
                                        DISCOUNT_TYPE
                                            .FINAL_PRICE
                                            .key
                                        ? `${formatPrice(
                                            item.discount?.discount_value
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
                                {item.discount?.valid_from &&
                                    dayjs(
                                        item.discount?.valid_from
                                    ).format(
                                        "DD/MM/YYYY"
                                    )}{" "}
                                {"- "}
                                {item.discount?.valid_util &&
                                    dayjs(
                                        item.discount?.valid_util
                                    ).format(
                                        "DD/MM/YYYY"
                                    )}
                            </p>
                        </div>
                    </div>
                    <XButton
                        onClick={()=>onDetail(item, item.discount)}
                        title={"Chi tiết"}
                        className={`${style.voucher_item_btn}`}
                    />
                </div>
            </div>
        </div>
    )
}
const LoadSkelton = () => {
    const counts = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className={style.voucher_list}>
            {counts.map((i) => (
                <div key={i} className={style.load_item_cnt}>
                    <div className={style.load_item_left}>
                        <Skeleton width={"100%"} height={"100%"} />
                    </div>
                    <div className={style.load_item_right}>
                        <div className={style.load_item_right_item}>
                            <Skeleton width={"100%"} height={"100%"} />
                        </div>
                        <div className={style.load_item_right_item}>
                            <Skeleton width={"100%"} height={"100%"} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
