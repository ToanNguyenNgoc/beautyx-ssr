/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, KeyboardEvent, useState, useContext } from "react"
import { useDeviceMobile, useFetch } from "hooks"
import { onErrorImg } from 'utils'
import { paramOrgs, paramsProducts, paramsServices } from "params-query"
import style from "./search.module.css"
import { Link, useHistory } from "react-router-dom"
import { useOrgs, useProducts, useServices } from "./hook"
import { IProductPromo } from "interface/productPromo"
import { SerProItem, XButton } from "components/Layout"
import { IServicePromo } from "interface/servicePromo"
import { IOrganization } from "interface/organization"
import icon from "constants/icon"
import { debounce } from "lodash"
import tracking from "api/trackApi"
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter"
import { useDispatch, useSelector } from "react-redux"
import API_3RD from "api/3rd-api"
import { onResetFilter } from "redux/filter-result"
import { searchKeyRecommend } from "pages/HomePage/data"
import SearchHistory from "./SearchHistory"
import IStore from "interface/IStore"
import { postHistorySearch } from "user-behavior"

interface SearchProps {
    key_work?: string,
    key_work_debounce?: string,
    onCloseSearchTimeOut?: () => void,
    onCloseSearchDialog?: () => void
}


function Search(props: SearchProps) {
    const { USER } = useSelector((state: IStore) => state.USER)
    const keysRecommend = useFetch(true, `${API_3RD.API_NODE}/history/view`).response
    const { key_work, key_work_debounce, onCloseSearchTimeOut, onCloseSearchDialog } = props
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const [keyword, setKeyword] = useState({ key: "", key_debounce: "" })
    const onCloseSearch = () => {
        onCloseSearchTimeOut && onCloseSearchTimeOut()
        onCloseSearchDialog && onCloseSearchDialog()
    }
    const KEY_WORD = IS_MB ? keyword.key : (key_work ?? "")
    const KEY_WORD_DE = IS_MB ? keyword.key_debounce : (key_work_debounce ?? "")
    //onChange input
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSetDebounceKeyword = useCallback(
        debounce((text) => setKeyword({ key: text, key_debounce: text }), 600),
        []
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDebounceGoogle = useCallback(
        debounce((text) => tracking.SEARCH_ON_CHANGE(text), 600),
        []
    )

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSetDebounceKeyword(e.target.value)
        onDebounceGoogle(e.target.value)
        setKeyword({ ...keyword, key: e.target.value })
    }
    //
    const PARAM_ORG = {
        ...paramOrgs,
        "filter[keyword]": KEY_WORD_DE
    }
    const PARAM_PRODUCT = {
        ...paramsProducts,
        "limit": IS_MB ? 4 : 6,
        "filter[keyword]": KEY_WORD_DE
    }
    const PARAM_SERVICE = {
        ...paramsServices,
        "limit": IS_MB ? 4 : 6,
        "filter[keyword]": KEY_WORD_DE
    }
    const { orgs, totalOrg, isLoad } = useOrgs(PARAM_ORG, KEY_WORD !== "")
    const { services, totalService, isLoadSer } = useServices(PARAM_SERVICE, KEY_WORD !== "")
    const { products, totalProduct, isLoadPr } = useProducts(PARAM_PRODUCT, KEY_WORD !== "")
    //
    const tabs = [
        { link: "dich-vu", total: totalService },
        { link: "cua-hang", total: totalOrg },
        { link: "san-pham", total: totalProduct }
    ]
    const tabSort = tabs.sort((a, b) => b.total - a.total);
    const dispatch = useDispatch()
    const onResult = () => {
        dispatch(onResetFilter())
        if (KEY_WORD_DE !== "") {
            history.push({
                pathname: `/ket-qua-tim-kiem/${tabSort[0]?.link}`,
                search: `?keyword=${encodeURIComponent(KEY_WORD)}`,
            })
            onCloseSearchTimeOut && onCloseSearchTimeOut()
            onCloseSearchDialog && onCloseSearchDialog()
            if (USER) postHistorySearch(KEY_WORD_DE, 'KEYWORD')
        }
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onResult()
        }
    }
    return (
        <div
            onScroll={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className={style.container}
        >
            <div className={style.search_head}>
                <div className={style.search_head_input}>
                    <div
                        onClick={onCloseSearch}
                        className={style.search_head_btn}
                    >
                        <img src={icon.chevronLeft} alt="" />
                    </div>
                    <input
                        autoFocus={true}
                        onChange={onChange}
                        type="text" className={style.search_input_mb}
                        placeholder="Bạn muốn tìm gì..."
                        value={KEY_WORD}
                        onKeyDown={handleKeyDown}
                    />
                    {
                        keyword.key !== '' &&
                        <XButton
                            iconSize={(isLoad && isLoadPr && isLoadPr) ? 0 : 22}
                            onClick={() => setKeyword({ key: "", key_debounce: "" })}
                            className={style.close_bnt}
                            icon={icon.closeBlack}
                            loading={isLoad && isLoadPr && isLoadPr}
                        />
                    }
                </div>
                {
                    KEY_WORD !== "" &&
                    <Link
                        onClick={() => {
                            onCloseSearch();
                            USER && postHistorySearch(KEY_WORD_DE, 'KEYWORD')
                        }}
                        to={{
                            pathname: `/ket-qua-tim-kiem/${tabSort[0].link}`,
                            search: `?keyword=${encodeURIComponent(KEY_WORD)}`,
                        }} className={style.search_head_link} >
                        Tìm kiếm kết quả cho <h3>{KEY_WORD}</h3>
                    </Link>
                }
            </div>
            <div
                onScroll={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className={style.search_body}
            >
                {
                    (KEY_WORD !== "" && totalOrg > 0) &&
                    <div className={style.section_container}>
                        <span className={style.section_title}>Cửa hàng</span>
                        <div className={style.org_list}>
                            <div
                                onClick={onCloseSearch}
                                className={style.org_list_wrapper}
                            >
                                {
                                    orgs.map((item: IOrganization) => (
                                        <Link
                                            onClick={() => USER && postHistorySearch(
                                                item.name, 'ORG', item.id
                                            )}
                                            key={item.id} to={{ pathname: formatRouterLinkOrg(item.subdomain) }}
                                        >
                                            <div className={style.org_item}>
                                                <img
                                                    src={item.image_url}
                                                    onError={(e) => onErrorImg(e)}
                                                    className={style.org_item_img} alt=""
                                                />
                                                <span className={style.org_item_name}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    (KEY_WORD !== "" && totalService > 0) &&
                    <div className={style.section_container}>
                        <span className={style.section_title}>Dịch vụ</span>
                        <ul className={style.result_list}>
                            {
                                services.map((item: IServicePromo, index: number) => (
                                    <li
                                        onClick={() => {
                                            onCloseSearch();
                                            USER && postHistorySearch(
                                                item.service_name,
                                                'SERVICE',
                                                item.org_id,
                                                item.service_id
                                            )
                                        }}
                                        key={index} className={style.result_item_cnt}
                                    >
                                        <SerProItem changeStyle={true} item={item} type="SERVICE" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                {
                    (KEY_WORD !== "" && totalProduct > 0) &&
                    <div className={style.section_container}>
                        <span className={style.section_title}>Sản phẩm</span>
                        <ul className={style.result_list}>
                            {
                                products.map((item: IProductPromo, index: number) => (
                                    <li
                                        onClick={() => {
                                            onCloseSearch();
                                            USER && postHistorySearch(
                                                item.product_name,
                                                'PRODUCT',
                                                item.org_id,
                                                item.product_id
                                            )
                                        }}
                                        key={index} className={style.result_item_cnt}
                                    >
                                        <SerProItem changeStyle={true} item={item} type="PRODUCT" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                {
                    KEY_WORD === "" &&
                    <div>
                        <SearchHistory onCloseSearch={onCloseSearch} />
                        {/* <div className={style.section_recommend}>
                            <span className={style.section_title}>Gợi ý tìm kiếm</span>
                            <ul className={style.list_key}>
                                {keysRecommend.map((item: any, index: number) => (
                                    <li key={index} className={style.list_key_item}>
                                        <Link
                                            className={style.key_item}
                                            to={{ pathname: `/ket-qua-tim-kiem/dich-vu/?keyword=${item._id}` }}
                                        >
                                            <img src={icon.searchGray} alt="" />
                                            <span>{item._id}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                        <div 
                            onClick={onCloseSearch}
                            className={style.section_keyword_trend}
                        >
                            <div className={style.section_keyword_title}>
                                <img className={style.section_keyword_title_icon} src={icon.trendGreen} alt="" />
                                <span>Xu hướng</span>
                            </div>
                            <ul className={style.keyword_trend_list}>
                                {
                                    keysRecommend.map((i:any, index:number) => (
                                        <li key={index} className={style.keyword_trend_item}>
                                            <Link
                                                to={{ pathname: `/ket-qua-tim-kiem/dich-vu/?keyword=${i._id}` }}
                                                className={style.keyword_trend_link}
                                            >
                                                {i._id}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default Search;

