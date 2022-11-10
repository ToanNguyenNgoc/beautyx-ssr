/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Container } from "@mui/material";
import "./mySer.css";
import { useDispatch, useSelector } from "react-redux";
import { Masonry } from "@mui/lab";
import { AppContext } from "context/AppProvider";
import { STATUS } from "redux/status";
import { fetchAsyncOrderServices } from "redux/order/orderSlice";
import { IServiceUser } from "interface/servicesUser";
import TreatmentCardItem from "./ServiceNotBook/TreatmentCardItem";
import { XButton } from "components/Layout";
import { useDeviceMobile } from "utils";
import { OrderSkelton } from 'features/Orders/components/TabOrderPaid'

function ServicesUser() {
    const dispatch = useDispatch();
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const { services, status, totalItem, page } = useSelector((state: any) => state.ORDER.ORDER_SERVICES);

    const callServicesUser = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrderServices({
                page: 1
            }))
        }
    };
    useEffect(() => {
        callServicesUser();
    }, []);
    const onViewMore = () => {
        dispatch(
            fetchAsyncOrderServices({
                page: page + 1,
            })
        );
    };
    let loading = false;
    if (status === STATUS.LOADING) {
        loading = true;
    }
    return (
        <>
            {page === 0 && status !== STATUS.SUCCESS && <OrderSkelton />}
            <Container>
                <div className="flex-row-sp my-ser">
                    <div className="my-ser__right">
                        <div className="my-ser-book__cnt">
                            <div className="my-ser-book">
                                <Masonry
                                    columns={IS_MB ? 1 : 2}
                                    spacing={IS_MB ? 1 : 3}
                                >
                                    {services.map(
                                        (item: IServiceUser, index: number) => (
                                            <TreatmentCardItem
                                                key={index}
                                                card_items={item}
                                            />
                                        )
                                    )}
                                </Masonry>
                                {services.length >= 15 &&
                                    services.length < totalItem && (
                                        <div className="my-ser-bot">
                                            <XButton
                                                title={`${t(
                                                    "trending.watch_all"
                                                )}`}
                                                onClick={onViewMore}
                                                loading={loading}
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
