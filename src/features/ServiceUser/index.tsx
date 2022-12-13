/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Container } from "@mui/material";
import "./mySer.css";
import { useSelector } from "react-redux";
import { Masonry } from "@mui/lab";
import { AppContext } from "context/AppProvider";
import { IServiceUser } from "interface/servicesUser";
import TreatmentCardItem from "./ServiceNotBook/TreatmentCardItem";
import { XButton } from "components/Layout";
import { useDeviceMobile, useSwrInfinite } from "hooks";
import { OrderSkelton } from "pages/Account/components/Orders/components/TabOrderPaid";
import { ParamOrder } from "params-query/param.interface";
import { paramOrder } from "params-query";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import IStore from "interface/IStore";
import API_ROUTE from "api/_api";

function ServicesUser() {
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const { USER } = useSelector((state: IStore) => state.USER)
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const params: ParamOrder = {
        ...paramOrder,
        "filter[status]": 'PAID',
        'include': 'items|organization|appointments',
        "filter[withServicesSold]": true,
        "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX|BEAUTYX MOBILE' : PLAT_FORM,
        "limit": 8
    }
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(
        USER,
        `${API_ROUTE.ORDERS}`,
        params
    )
    return (
        <>
            {(resData?.length === 0 && isValidating) && <OrderSkelton />}
            <Container>
                <div className="flex-row-sp my-ser">
                    <div className="my-ser__right">
                        <div className="my-ser-book__cnt">
                            <div className="my-ser-book">
                                <Masonry
                                    columns={IS_MB ? 1 : 2}
                                    spacing={IS_MB ? 1 : 3}
                                >
                                    {resData?.map(
                                        (item: IServiceUser, index: number) => (
                                            <TreatmentCardItem
                                                key={index}
                                                card_items={item}
                                            />
                                        )
                                    )}
                                </Masonry>
                                {resData?.length >= 6 &&
                                    resData?.length < totalItem && (
                                        <div className="my-ser-bot">
                                            <XButton
                                                title={`${t(
                                                    "trending.watch_all"
                                                )}`}
                                                onClick={onLoadMore}
                                                loading={isValidating}
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ServicesUser;
