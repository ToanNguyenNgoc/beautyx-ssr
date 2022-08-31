import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import { AppContext } from "../../context/AppProvider";
import { onSetEmptyOrgs, onSetEmptyProducts, onSetEmptyServices } from "../../redux/search/searchResultSlice";
import {
    removeKeyWord,
    onToggleSearchCnt,
} from "../../redux/search/searchSlice";
export const listRecomment = [
    {
        id: 1,
        title: "Hồ Chí Minh",
    },
    {
        id: 2,
        title: "Gội đầu",
    },
    {
        id: 3,
        title: "Tắm trắng toàn thân",
    },
    {
        id: 4,
        title: "Skin care",
    },
    {
        id: 5,
        title: "Massage",
    },
];
function SectionEmpty() {
    const dispatch = useDispatch();
    const { t } = useContext(AppContext);
    const history = useHistory();
    const { HISTORY } = useSelector((state: any) => state.SEARCH);
    const filterOrg = HISTORY.filter((item: any) => item.TYPE === "ORG").map(
        (i: any) => {
            return i.item;
        }
    );
    const filterKeyWord = HISTORY.filter(
        (item: any) => item.TYPE === "KEYWORD"
    ).map((i: any) => i.item);
    const handleRemoveKeyWord = (item: any) => {
        dispatch(removeKeyWord(item));
    };
    const onGotoFilterResult = (keyword: string) => {
        dispatch(onToggleSearchCnt(false));
        dispatch(onSetEmptyOrgs())
        dispatch(onSetEmptyServices())
        dispatch(onSetEmptyProducts())
        history.push({
            pathname: "/ket-qua-tim-kiem/",
            search: `?keyword=${encodeURIComponent(keyword)}`,
        });
    };

    return (
        <>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>{t("se.recent_search")}</span>
                    <span>{t("trending.watch_all") + " >"}</span>
                </div>
                <div className="search-empty-item__list">
                    <ul className="list">
                        {filterOrg.map((item: any, index: number) => (
                            <li key={index}>
                                <Link
                                    to={{
                                        pathname: `/cua-hang/${item.subdomain}`,
                                    }}
                                    onClick={() =>
                                        dispatch(onToggleSearchCnt(false))
                                    }
                                    className="flex-column search-empty-item__list-item"
                                >
                                    <img src={item.image_url} alt="" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="keyword-list">
                        {filterKeyWord.map((item: any, index: number) => (
                            <li
                                onClick={() => onGotoFilterResult(item)}
                                className="keyword-item"
                                key={index}
                            >
                                <div className="flexX-gap-8 cursor-pointer">
                                    <img
                                        style={{ width: "20px" }}
                                        src={icon.tumerGray}
                                        alt=""
                                    />
                                    <p className="keyword-item__title">
                                        {item}
                                    </p>
                                </div>
                                <img
                                    className="cursor-pointer"
                                    style={{ width: "24px" }}
                                    onClick={(e) => {
                                        handleRemoveKeyWord(item);
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    src={icon.x}
                                    alt=""
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>{t("se.search_recommend")}</span>
                </div>
                <ul className="keyword-list mt-24">
                    {listRecomment.map((item: any, index: number) => (
                        <li
                            onClick={() => onGotoFilterResult(item.title)}
                            style={{ margin: "2px 0" }}
                            key={index}
                            className="keyword-item"
                        >
                            <div className="flexX-gap-8 cursor-pointer">
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
    );
}

export default SectionEmpty;
