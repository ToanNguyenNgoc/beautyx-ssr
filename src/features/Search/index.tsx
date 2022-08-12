import React, { useCallback, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@mui/material";
import {
    onToggleSearchCnt,
    fetchOrgsBySearch,
    onSetKeyword,
    addHistory,
    fetchProductsBySearch,
    fetchServicesBySearch,
} from "../../redux/search/searchSlice";
import icon from "../../constants/icon";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from "lodash";
import "./style.css";
import { useHistory } from "react-router-dom";
import SectionOrgs from "./SectionOrgs";
import SectionServices from "./SectionServices";
import SectionProducts from "./SectionProducts";
import SectionEmpty from "./SectionEmpty";
import useFullScreen from "../../utils/useDeviceMobile";
import SectionNull from "./SectionNull";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
// ==== api tracking ====
import tracking from "../../api/trackApi";
import {
    onSetEmptyOrgs,
    onSetEmptyProducts,
    onSetEmptyServices,
} from "../../redux/search/searchResultSlice";
import { URL } from "url";
// end

function Search() {
    const IS_MB = useFullScreen();
    const { t } = useContext(AppContext);
    const { open, keyword, ORGS, SERVICES, PRODUCTS } = useSelector(
        (state: any) => state.SEARCH
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const onClose = () => {
        dispatch(onToggleSearchCnt(false));
    };

    const callByFilter = (keyword: string) => {
        if (keyword.length > 0) {
            dispatch(
                fetchOrgsBySearch({
                    keyword: keyword,
                    page: 1,
                })
            );
            dispatch(
                fetchProductsBySearch({
                    keyword: keyword,
                    page: 1,
                })
            );
            dispatch(
                fetchServicesBySearch({
                    keyword: keyword,
                    page: 1,
                })
            );
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDropDown = useCallback(
        debounce((nextValue) => {
            callByFilter(nextValue);
            tracking.SEARCH_ON_CHANGE(nextValue);
        }, 1000),
        []
    );
    const handleOnChangeInput = (e: any) => {
        var keyword = e.target.value;
        debounceDropDown(keyword);
        dispatch(onSetKeyword(keyword));
    };
    const onGotoFilterResult = () => {
        dispatch(onSetEmptyOrgs());
        dispatch(onSetEmptyServices());
        dispatch(onSetEmptyProducts());
        history.push({
            pathname: "/ket-qua-tim-kiem/",
            search: `?keyword=${encodeURIComponent(keyword)}?tab=1`,
            state: {
                orgsTotal: ORGS.totalItem,
                servicesTotal: SERVICES.totalItem,
                productsTotal: PRODUCTS.totalItem,
            },
        });
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onGotoFilterResult();
            dispatch(onToggleSearchCnt(false));
            const values = {
                TYPE: "KEYWORD",
                item: keyword,
            };
            dispatch(addHistory(values));
        }
    };

    const handleSearch = () => {
        onGotoFilterResult();
        dispatch(onToggleSearchCnt(false));
        const values = {
            TYPE: "KEYWORD",
            item: keyword,
        };
        dispatch(addHistory(values));
    };
    const listSection = [
        {
            element: (
                <SectionOrgs
                    keyword={keyword}
                    onGotoFilterResult={onGotoFilterResult}
                    ORGS={ORGS}
                />
            ),
            total: ORGS.totalItem,
        },
        {
            element: (
                <SectionProducts
                    keyword={keyword}
                    onGotoFilterResult={onGotoFilterResult}
                    PRODUCTS={PRODUCTS}
                />
            ),
            total: PRODUCTS.totalItem,
        },
        {
            element: (
                <SectionServices
                    keyword={keyword}
                    onGotoFilterResult={onGotoFilterResult}
                    SERVICES={SERVICES}
                />
            ),
            total: SERVICES.totalItem,
        },
    ];
    const listSectionDisplay = listSection.sort((a, b) => b.total - a.total);
    return (
        <Dialog open={open} onClose={onClose} fullScreen={IS_MB ? true : false}>
            <div className="search-cnt">
                <div className="search-cnt__head">
                    {IS_MB && (
                        <img
                            onClick={() => dispatch(onToggleSearchCnt(false))}
                            src={icon.chevronLeft}
                            alt=""
                        />
                    )}
                    <div className="search-cnt__head-input">
                        <img
                            src={icon.searchPurple}
                            alt=""
                            className="search-cnt__head-icon"
                        />
                        <input
                            value={keyword}
                            onChange={handleOnChangeInput}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder={t("se.search_title")}
                        />
                        {keyword.length > 0 && (
                            <img
                                onClick={() => dispatch(onSetKeyword(""))}
                                src={icon.x}
                                alt=""
                                className="search-cnt__head-icon-x"
                            />
                        )}
                    </div>
                </div>
                {keyword.length > 0 ? (
                    <>
                        <div className="search-cnt__body">
                            <p
                                className="search-cnt__keyword cursor-pointer"
                                onClick={() => handleSearch()}
                            >
                                {t("se.view_the_results_for")}{" "}
                                <span>{keyword}</span>
                            </p>
                            {listSectionDisplay.map((item, index) => (
                                <div key={index}>{item.element}</div>
                            ))}
                        </div>
                        <SectionNull
                            keyword={keyword}
                            ORGS={ORGS}
                            SERVICES={SERVICES}
                            PRODUCTS={PRODUCTS}
                        />
                    </>
                ) : (
                    <div className="search-cnt__body">
                        <SectionEmpty />
                    </div>
                )}
            </div>
        </Dialog>
    );
}
export default Search;

