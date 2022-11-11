import React, { useEffect, useState } from "react";
import { SerProItem, XButton } from "components/Layout";
import { IServicePromo } from "interface/servicePromo";
import { dealHot } from "constants/img";
import { useLocation } from "react-router-dom";
import servicePromoApi from "api/servicePromoApi";
import HeadTitle from "features/HeadTitle";
import Head from "features/Head";
import { Container } from "@mui/material";
import { blockService } from "utils/blockCardItem";
import "../home-result.css";

interface IBanner {
    id: number;
    title: string;
    min_price: number | null;
    max_price?: number | null;
    percent?: number;
    img: string;
}
interface IData {
    services: IServicePromo[];
    page: number;
    totalItem: number;
    loadPage: boolean;
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
    const id_banner = location.search.slice(1, location.search.length);
    const bannerDeals = deals.find(
        (item: IBanner) => item.id === parseInt(id_banner)
    );
    const [dataSort, setDataSort] = useState("-discount_percent");
    const [data, setData] = useState<IData>({
        services: [],
        page: 1,
        totalItem: 1,
        loadPage: false,
    });
    const handleGetServices = async () => {
        try {
            const res = await servicePromoApi.getServicesPromo({
                page: data.page,
                min_price: bannerDeals?.min_price,
                max_price: bannerDeals?.max_price,
                percent: bannerDeals?.percent,
                location: dataSort,
                sort: dataSort,
            });
            setData({
                ...data,
                services: [...data.services, ...res.data.data.hits],
                totalItem: res.data.total,
                loadPage: false,
            });
        } catch (error) {
            console.log(error);
            setData({ ...data, loadPage: false });
        }
    };
    useEffect(() => {
        handleGetServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSort, data.page]);
    const onViewMore = () => {
        setData({
            ...data,
            page: data.page + 1,
            loadPage: true,
        });
    };
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
                            {data.services
                                .filter(
                                    (e) =>
                                        !blockService(e.price, e.special_price)
                                )
                                .map((item: IServicePromo, index: number) => (
                                    <li key={index}>
                                        <SerProItem
                                            item={item}
                                            type="SERVICE"
                                        />
                                    </li>
                                ))}
                        </ul>
                        <div className="deal-banner__bot">
                            {data.services.length < data.totalItem && (
                                <XButton
                                    title="Xem thêm"
                                    onClick={onViewMore}
                                    loading={data.loadPage}
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
