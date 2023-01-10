/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Container } from "@mui/material";
import "./mySer.css";
import { Masonry } from "@mui/lab";
import { AppContext } from "context/AppProvider";
import { IServiceUser } from "interface/servicesUser";
import TreatmentCardItem from "./ServiceNotBook/TreatmentCardItem";
import { XButton } from "components/Layout";
import { useDeviceMobile, useOrderService } from "hooks";
import { OrderSkelton } from "pages/Account/components/Orders/components/TabOrderPaid";

function ServicesUser() {
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const { resData, totalItem, onLoadMore, isValidating, checkTimeExpired } = useOrderService()
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
                                                checkTimeExpired={checkTimeExpired}
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
