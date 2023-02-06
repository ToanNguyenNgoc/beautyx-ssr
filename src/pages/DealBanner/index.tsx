/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { deals } from "pages/HomePage/data";
import style from "./deal-banner.module.css";
import { useParams, useHistory } from "react-router-dom";
import {
    useDeviceMobile,
    useElementOnScreen,
    useFetchInfinite,
    useSwrInfinite,
} from "hooks";
import { slugify } from "utils";
import { Container } from "@mui/system";
import { paramsProductable, paramsServices } from "params-query";
import { ParamService, ParamsProductable } from "params-query/param.interface";
import API_ROUTE, { API_ROUTE_V } from "api/_api";
import { IServicePromo, Productable } from "interface";
import { ProductableItem, SerProItem, XButton } from "components/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadGrid } from "components/LoadingSketion";
import icon from "constants/icon";
import { AUTH_LOCATION } from "api/authLocation";

function DealBanner() {
    const { _id } = useParams();
    const history = useHistory();
    const IS_MB = useDeviceMobile();
    const LOCATION = AUTH_LOCATION();
    const deal = deals.find((i) => _id === slugify(i.title));
    useEffect(() => {
        if (!deal) history.replace("/error");
    }, []);
    // const param: ParamService = {
    //     ...paramsServices,
    //     'limit': 18,
    //     'filter[special_price]': deal?.special_price ?? '',
    //     'filter[keyword]': deal?.keyword ?? '',
    //     'filter[is_momo_ecommerce_enable]': true,
    //     'filter[discount_percent]': deal?.percent ?? '',
    //     'filter[min_price]': deal?.min_price ?? '',
    //     'filter[max_price]': deal?.max_price ?? '',
    //     'filter[location]': LOCATION
    // }
    // const { resData, totalItem, onLoadMore } = useSwrInfinite(
    //     deal,
    //     API_ROUTE.SERVICES,
    //     param
    // )
    // const onMore = () => { if (resData.length < totalItem) onLoadMore() }
    const param: ParamsProductable = {
        ...paramsProductable,
        type: "1",
        limit: 18,
        keyword: deal?.keyword ?? "",
        discount_max_price_ecommerce: deal?.max_price ?? "",
        discount_min_price_ecommerce: deal?.min_price ?? "",
        on_ecommerce: true,
        location: LOCATION,
        sort: "distance",
    };
    const { resDataV2, totalItemV2, onLoadMore } = useFetchInfinite(
        deal,
        API_ROUTE_V.PRODUCTABLE("v3"),
        param
    );
    const onMore = () => {
        if (resDataV2.length < totalItemV2) onLoadMore();
    };
    const refHead = useRef<HTMLDivElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisible = useElementOnScreen(options, bannerRef);
    window.addEventListener("scroll", () => {
        if (isVisible) {
            refHead.current?.classList.remove(style.head_show);
        } else {
            refHead.current?.classList.add(style.head_show);
        }
    });
    return (
        <>
            {IS_MB && (
                <div ref={refHead} className={style.head}>
                    <XButton
                        onClick={() => history.goBack()}
                        icon={icon.chevronLeftWhite}
                        iconSize={28}
                    />
                </div>
            )}
            <Container>
                <div className={style.container}>
                    <div ref={bannerRef} className={style.deal_banner_cnt}>
                        <img
                            src={deal?.banner}
                            className={style.deal_banner}
                            alt=""
                        />
                    </div>
                    {/* <InfiniteScroll
                        dataLength={resData.length}
                        hasMore={true}
                        loader={<></>}
                        next={onMore}
                    >
                        <ul className={style.list_container}>
                            {resData?.map(
                                (item: IServicePromo, index: number) => (
                                    <SerProItem
                                        key={index}
                                        item={item}
                                        type="SERVICE"
                                    />
                                )
                            )}
                        </ul>
                        {resData.length < totalItem && (
                            <LoadGrid item_count={12} grid={IS_MB ? 2 : 6} />
                        )}
                    </InfiniteScroll> */}
                    <InfiniteScroll
                        dataLength={resDataV2.length}
                        hasMore={true}
                        loader={<></>}
                        next={onMore}
                    >
                        <ul className={style.list_container}>
                            {resDataV2?.map(
                                (item: Productable, index: number) => (
                                    <ProductableItem
                                        key={index}
                                        productable={item}
                                    />
                                )
                            )}
                        </ul>
                        {resDataV2.length < totalItemV2 && (
                            <LoadGrid item_count={12} grid={IS_MB ? 2 : 6} />
                        )}
                    </InfiniteScroll>
                </div>
            </Container>
        </>
    );
}

export default DealBanner;
