import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { onChangeFilterService, onResetFilter } from "redux/filter-result";
import { AppContext } from "../../../context/AppProvider";
import HomeTitle from "../Components/HomeTitle";
import HomePromo from "../HomePromo";
import "./homeHotDeal.css";
export default function HomeHotDeal() {
    const { t } = useContext(AppContext)
    const dispatch = useDispatch()
    const onViewMore = () => {
        dispatch(onResetFilter())
        dispatch(onChangeFilterService({
            "filter[special_price]": true,
            "filter[is_momo_ecommerce_enable]": true,
            "sort": "-discount_percent"
        }))
    }
    return (
        <div className="home-hot__deal">
            <HomeTitle
                onClick={onViewMore}
                title={t("home_2.top_deal")}
                url={`/ket-qua-tim-kiem/dich-vu?keyword=`}
                seemore={t("trending.watch_all") + " > "}
            />
            <HomePromo />
        </div>
    );
}
