import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import DiscountItem from "./DiscountItem";
import "./style.css";
import { useHistory } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { STATUS } from "../../redux/status";

import { LoadingServicesRow } from '../../components/LoadingSketion';
import { DISCOUNT_TYPE } from "../../utils/formatRouterLink/fileType";

function HomeDiscount() {
    const { t } = useContext(AppContext);
    const { DISCOUNTS } = useSelector((state: any) => state.HOME);
    const { discounts } = DISCOUNTS;
    const history = useHistory();
    const onViewMore = () => {
        history.push("/giam-gia");
        scrollTop();
    };
    return (
        <div className="home-discounts">
            <Container>
                <div className="flex-row-sp home-discounts__title">
                    <h2>{t("home_2.hot_promotion")}</h2>
                    <span onClick={onViewMore}>
                        {t("trending.watch_all")} {">"}
                    </span>
                </div>
                <div className="home-discounts__list-wrap">
                    {
                        DISCOUNTS.status_discount === STATUS.LOADING
                            ?
                            <LoadingServicesRow />
                            :
                            <ul className="home-discounts__list">
                                {discounts
                                    .filter((i: IDiscountPar) =>
                                    (i.items.length > 0 && (
                                        i.discount_type === DISCOUNT_TYPE.PRODUCT.key ||
                                        i.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key
                                    ))
                                    )
                                    .slice(0, 12)
                                    .map((discount: IDiscountPar, index: number) => (
                                        <div key={index}>
                                            {discount.items.map(
                                                (item: IITEMS_DISCOUNT, i: number) => (
                                                    <li key={i}>
                                                        <DiscountItem
                                                            discountItem={item}
                                                            discountPar={discount}
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </div>
                                    ))}
                                {/* {
                                    exDiscountFinal.map((discount: any, index: number) => (
                                        <div key={index}>
                                            {discount.items.map(
                                                (item: IITEMS_DISCOUNT, i: number) => (
                                                    <li key={i}>
                                                        <DiscountItem
                                                            discountItem={item}
                                                            discountPar={discount}
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </div>
                                    ))
                                } */}
                                <div className="watch-more-card" onClick={onViewMore}>
                                    <li>
                                        <div>{'>'}</div>
                                        <span>Xem thêm</span>
                                    </li>
                                </div>
                            </ul>
                    }
                </div>
            </Container>
        </div>
    );
}

export default HomeDiscount;
