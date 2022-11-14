import React from "react";
import { SerProItem, XButton } from "components/Layout";
import { IServicePromo } from "interface/servicePromo";
import { dealHot } from "constants/img";
import { useLocation } from "react-router-dom";
import { LoadGrid } from "components/LoadingSketion";
import HeadTitle from "features/HeadTitle";
import Head from "features/Head";
import { Container } from "@mui/material";
import { blockService } from "utils/blockCardItem";
import "../home-result.css";
import { useDeviceMobile, useSwrInfinite } from "utils";
import { paramsServices } from 'params-query'
import { ParamService } from 'params-query/param.interface'
import API_ROUTE from "api/_api";
import { AUTH_LOCATION } from "api/authLocation";

interface IBanner {
    id: number;
    title: string;
    min_price: number | null;
    max_price?: number | null;
    percent?: number;
    img: string;
}

export const deals = [
    {
        id: 1,
        title: "Deal hot từ 50-100k",
        min_price: 50000,
        max_price: 100000,
        img: dealHot.dealhot,
        backgroundColor: "rgb(176, 219, 253)",
        bannerWidth: "calc(16.66% * 4 - 10px)",
    },
    {
        id: 2,
        title: "Deal chăm sóc da làm đẹp Giảm 50%",
        min_price: null,
        img: dealHot.dealhot1,
        percent: 50,
        backgroundColor: "#fff4e1",
        bannerWidth: "calc(16.66% * 2 - 10px)",
    },
    {
        id: 3,
        title: "Dịch vụ xâm lấn Giảm 30%",
        min_price: null,
        img: dealHot.dealhot2,
        percent: 30,
        backgroundColor: "rgb(209, 202, 240)",
        bannerWidth: "calc(16.66% * 2 - 10px)",
    },
];

function HomeDealBanner() {
    const location = useLocation();
    const LOCATION = AUTH_LOCATION()
    const IS_MB = useDeviceMobile()
    const id_banner = location.search.slice(1, location.search.length);
    const bannerDeals = deals.find(
        (item: IBanner) => item.id === parseInt(id_banner)
    );
    const params: ParamService = {
        ...paramsServices,
        "filter[min_price]": bannerDeals?.min_price ?? '',
        "filter[max_price]": bannerDeals?.max_price ?? '',
        "filter[discount_percent]": bannerDeals?.percent ?? '',
        "filter[is_momo_ecommerce_enable]": true,
        "filter[location]": LOCATION
    }
    const { resData, totalItem, isValidating, onLoadMore } = useSwrInfinite(bannerDeals, API_ROUTE.SERVICES, params)
    const onViewMore = () => {
        onLoadMore()
    };
    const services: IServicePromo[] = resData ?? []
    return (
        <>
            <HeadTitle title={bannerDeals?.title} />
            <Head />
            <div
                className="deal-banner"
                style={{
                    backgroundColor: bannerDeals?.backgroundColor,
                }}
            >
                <Container
                    sx={{
                        maxWidth: "1200px",
                        zIndex: 1,
                        position: "relative",
                    }}
                >
                    <div className="deal-banner__wr">
                        <ul className="deal-banner__list">
                            <img
                                src={bannerDeals?.img}
                                style={{ width: bannerDeals?.bannerWidth }}
                                alt=""
                                className="deal-banner__img"
                            />
                            {services
                                ?.filter(
                                    (e: IServicePromo) =>
                                        !blockService(e.price, e.special_price)
                                )
                                ?.map((item: IServicePromo, index: number) => (
                                    <li key={index}>
                                        <SerProItem
                                            item={item}
                                            type="SERVICE"
                                        />
                                    </li>
                                ))}
                        </ul>
                        {services.length === 0 && <LoadGrid item_count={12} grid={IS_MB ? 2 : 6} />}
                        <div className="deal-banner__bot">
                            {services.length < totalItem && (
                                <XButton
                                    title="Xem thêm"
                                    onClick={onViewMore}
                                    loading={isValidating}
                                />
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default HomeDealBanner;
