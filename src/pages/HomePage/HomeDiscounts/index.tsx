import { Container } from "@mui/material";
import { IDiscountPar, IITEMS_DISCOUNT } from "interface";
import { useDeviceMobile } from "hooks";
import DiscountItem from "./DiscountItem";
import { Link } from "react-router-dom";
import scrollTop from "utils/scrollTop";
import { useContext } from "react";
import { AppContext } from "context/AppProvider";
import { LoadGrid } from "components/LoadingSketion"
import { DISCOUNT_TYPE } from "utils/formatRouterLink/fileType";
import { AUTH_LOCATION } from "api/authLocation";
import { paramsDiscounts } from "params-query"
import "./style.css";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { baseURL } from "config";
import { identity, pickBy } from "lodash";

function HomeDiscount() {
    const { t } = useContext(AppContext) as any;
    const IS_MB = useDeviceMobile()
    const PLAT_FORM = EXTRA_FLAT_FORM();
    const LOCATION = AUTH_LOCATION();
    const newParams = {
        ...paramsDiscounts,
        limit: 15,
        "filter[location]": PLAT_FORM === "TIKI" ? "" : LOCATION,
        "sort": PLAT_FORM === "TIKI" ? "-priority" : ""
    }
    const { data } = useInfiniteQuery({
        queryKey: ['DISCOUNTS'],
        queryFn: ({ pageParam = 1 }) => axios
            .get(`${baseURL}discounts`, { params: pickBy({ ...newParams, page: pageParam }, identity) })
            .then(res => res.data.context),
        getNextPageParam: (page: any) => console.log(page)
    })
    const discounts: IDiscountPar[] = data?.pages.map(i => i.data).flat() ?? []
    return (
        <div className="home-discounts">
            <Container>
                <div className="flex-row-sp home-discounts__title">
                    <h2>{t("home_2.hot_promotion")}</h2>
                    <Link onClick={() => scrollTop('auto')} to={{ pathname: '/giam-gia' }} >
                        {t("trending.watch_all")} {">"}
                    </Link>
                </div>
                <div className="home-discounts__list-wrap">
                    {(discounts.length === 0) && <LoadGrid item_count={5} grid={5} />}
                    <ul className="home-discounts__list">
                        {discounts
                            ?.filter((i: IDiscountPar) =>
                            (i.items.length > 0 && (
                                i.discount_type === DISCOUNT_TYPE.PRODUCT.key ||
                                i.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key
                            ))
                            )
                            ?.slice(0, !IS_MB ? 5 : 10)
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
                            ))
                        }
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default HomeDiscount;
