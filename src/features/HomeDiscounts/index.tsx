import React from "react";
import { Container } from "@mui/material";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import { useDeviceMobile, useSwr } from "hooks";
import DiscountItem from "./DiscountItem";
import { useHistory } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { LoadGrid } from "../../components/LoadingSketion"
import { DISCOUNT_TYPE } from "../../utils/formatRouterLink/fileType";
import { AUTH_LOCATION } from "../../api/authLocation";
import { paramsDiscounts } from "../../params-query"
import "./style.css";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";

function HomeDiscount() {
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile()
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const LOCATION = AUTH_LOCATION();
    const newParams = {
        ...paramsDiscounts,
        page: 1,
        limit: IS_MB ? 10 : 5,
        "filter[location]": PLAT_FORM === "TIKI" ? "" : LOCATION,
        "sort": PLAT_FORM === "TIKI" ? "-priority" : ""
    }
    const { responseArray, isValidating } = useSwr('/discounts', true, newParams)
    const discounts = responseArray
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
                    {(isValidating && responseArray.length === 0) && <LoadGrid item_count={5} grid={5} />}
                    <ul className="home-discounts__list">
                        {discounts
                            ?.filter((i: IDiscountPar) =>
                            (i.items.length > 0 && (
                                i.discount_type === DISCOUNT_TYPE.PRODUCT.key ||
                                i.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key
                            ))
                            )
                            ?.slice(0, 12)
                            ?.map((discount: IDiscountPar, index: number) => (
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
                        {/* <div className="watch-more-card" onClick={onViewMore}>
                            <li>
                                <div>{'>'}</div>
                                <span>Xem thêm</span>
                            </li>
                        </div> */}
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default HomeDiscount;
