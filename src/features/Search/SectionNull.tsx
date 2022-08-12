import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import imgNull from "../../assets/image/user_guide/searchNull.png";
import icon from "../../constants/icon";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import { listRecomment } from "./SectionEmpty";
import { STATUS } from "../../redux/status";
import { AppContext } from "../../context/AppProvider";

// ==== api tracking ====
import tracking from "../../api/trackApi";
// end
function SectionNull(props: any) {
    const { t } = useContext(AppContext);
    const { ORGS, SERVICES, PRODUCTS, keyword } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const quantity = SERVICES.totalItem + PRODUCTS.totalItem + ORGS.totalItem;
    const onGotoFilterResult = (title: any) => {
        dispatch(onToggleSearchCnt(false));
        history.push({
            pathname: "/ket-qua-tim-kiem/",
            search: `?keyword=${encodeURIComponent(title)}`,
        });
    };
    let showNull = false;
    if (
        ORGS.status === STATUS.SUCCESS &&
        SERVICES.status === STATUS.SUCCESS &&
        PRODUCTS.status === STATUS.SUCCESS
    ) {
        tracking.SEARCH_RESULT_LOAD(quantity, keyword);
    } else if (
        ORGS.status === STATUS.SUCCESS &&
        SERVICES.status === STATUS.SUCCESS &&
        PRODUCTS.status === STATUS.SUCCESS &&
        SERVICES.services.length === 0 &&
        PRODUCTS.products.length === 0 &&
        ORGS.orgs.length === 0
    ) {
        showNull = true;
    }
    return showNull ? (
        <>
            <div className="search-null">
                <img src={imgNull} alt="" />
                <div className="title">
                    {t("se.no_results_found_for")} <span>{keyword}</span>
                </div>
            </div>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>{t("se.try")}</span>
                </div>
                <ul className="keyword-list mt-24">
                    {listRecomment.map((item: any, index: number) => (
                        <li
                            onClick={() => onGotoFilterResult(item.title)}
                            style={{ margin: "2px 0" }}
                            key={index}
                            className="keyword-item"
                        >
                            <div className="flexX-gap-8 cursor-pointer ">
                                <img
                                    style={{ width: "18px" }}
                                    src={icon.searchGray}
                                    alt=""
                                />
                                <p
                                    style={{ color: "var(--text-black)" }}
                                    className="keyword-item__title"
                                >
                                    {item.title}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    ) : (
        <></>
    );
}

export default SectionNull;
