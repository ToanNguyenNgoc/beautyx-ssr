import React, { useCallback, KeyboardEvent, useState } from "react"
import { useDeviceMobile, useFetch, useProductable } from "hooks"
import { hashtag } from 'utils'
import { paramOrgs, paramsProductable } from "params-query"
import style from "./search.module.css"
import { Link, useHistory } from "react-router-dom"
import { useOrgs } from "./hook"
import { ProductableItem, XButton, XImage } from "components/Layout"
import { IOrganization } from "interface/organization"
import icon from "constants/icon"
import { debounce } from "lodash"
import tracking from "api/trackApi"
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter"
import { useDispatch, useSelector } from "react-redux"
import API_3RD from "api/3rd-api"
import { onResetFilter } from "redux/filter-result"
import SearchHistory from "./SearchHistory"
import IStore from "interface/IStore"
import { usePostSearchHisMutation } from "redux-toolkit-query/hook-search-history"
import { ParamsProductable } from "params-query/param.interface"
import { Productable } from "interface"
import SearchLocation from "./SearchLocation"

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
    const { orgs, totalOrg, isLoad } = useOrgs(PARAM_ORG, KEY_WORD !== "")
    const params: ParamsProductable = {
        ...paramsProductable,
        keyword: KEY_WORD_DE,
        limit: IS_MB ? 4 : 6,
    }
    const { serviceData } = useProductable("1", params, KEY_WORD_DE !== '')
    const { productData } = useProductable('2', params, KEY_WORD_DE !== '')
    const tabs = [
        { link: "dich-vu", total: serviceData.totalItem },
        { link: "cua-hang", total: totalOrg },
        { link: "san-pham", total: productData.totalItem }
    ]
    const tabSort = tabs.sort((a, b) => b.total - a.total);
    const dispatch = useDispatch()
    const onResult = (tabName?: string, outKeyword?: string) => {
        dispatch(onResetFilter())
        if (KEY_WORD_DE !== "") {
            const { isHashtag, textReplace } = hashtag("@", KEY_WORD)
            if (isHashtag) {
                history.push(`/cua-hang/${textReplace}`)
            } else {
                history.push({
                    pathname: `/ket-qua-tim-kiem/${tabName ?? tabSort[0]?.link}`,
                    search: `?keyword=${encodeURIComponent(outKeyword ?? KEY_WORD)}`,
                })
                if (USER) { postHistorySearch(outKeyword ?? KEY_WORD_DE, 'KEYWORD') }
            }
            onCloseSearchTimeOut && onCloseSearchTimeOut()
            onCloseSearchDialog && onCloseSearchDialog()
        }
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onResult()
        }
    }
    const [addSearch] = usePostSearchHisMutation()
    const postHistorySearch = (KEY_WORD_DE: string, type: any, organization_id?: any, productable_id?: any) => {
        addSearch({
            text: KEY_WORD_DE,
            type: type,
            organization_id: organization_id,
            productable_id: productable_id
        })
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
                            iconSize={(isLoad && serviceData.isLoad && productData.isLoad) ? 0 : 22}
                            onClick={() => setKeyword({ key: "", key_debounce: "" })}
                            className={style.close_bnt}
                            icon={icon.closeBlack}
                            loading={isLoad && serviceData.isLoad && productData.isLoad}
                        />
                    }
                </div>
                {
                    KEY_WORD !== "" &&
                    <Link
                        onClick={() => {
                            onCloseSearch();
                            dispatch(onResetFilter())
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
                                                <XImage
                                                    src={item.image_url}
                                                    className={style.org_item_img}
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
                {KEY_WORD !== "" && <SearchLocation keyword={KEY_WORD_DE} onResult={onResult} />}
                {
                    (KEY_WORD !== "" && serviceData.totalItem > 0) &&
                    <div className={style.section_container}>
                        <span className={style.section_title}>Dịch vụ</span>
                        <ul className={style.result_list}>
                            {
                                serviceData.productable?.map((item: Productable, index: number) => (
                                    <li
                                        onClick={() => {
                                            onCloseSearch();
                                            USER && postHistorySearch(
                                                item.name,
                                                'SERVICE',
                                                item.organization_id,
                                                item.origin_id
                                            )
                                        }}
                                        key={index} className={style.result_item_cnt}
                                    >
                                        <ProductableItem productable={item} changeStyle />
                                    </li>
                                ))
                            }
                        </ul>
                        {/* <ul className={style.result_list}>
                            {
                                services.map((item: Productable, index: number) => (
                                    <li
                                        onClick={() => {
                                            onCloseSearch();
                                            USER && postHistorySearch(
                                                item.content?.name,
                                                'SERVICE',
                                                item.content?.organization_id,
                                                item.content?.id
                                            )
                                        }}
                                        key={index} className={style.result_item_cnt}
                                    >
                                        <ProductableItem changeStyle productable={item} />
                                    </li>
                                ))
                            }
                        </ul> */}
                    </div>
                }
                {
                    (KEY_WORD !== "" && productData.totalItem > 0) &&
                    <div className={style.section_container}>
                        <span className={style.section_title}>Sản phẩm</span>
                        <ul className={style.result_list}>
                            {
                                productData.productable?.map((item: Productable, index: number) => (
                                    <li
                                        onClick={() => {
                                            onCloseSearch();
                                            USER && postHistorySearch(
                                                item.name,
                                                'PRODUCT',
                                                item.organization_id,
                                                item.origin_id
                                            )
                                        }}
                                        key={index} className={style.result_item_cnt}
                                    >
                                        <ProductableItem productable={item} changeStyle />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                {
                    (KEY_WORD === "") &&
                    <div>
                        {USER && <SearchHistory onCloseSearch={onCloseSearch} />}
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
                                    keysRecommend.map((i: any, index: number) => (
                                        <li key={index} className={style.keyword_trend_item}>
                                            <Link
                                                onClick={() => dispatch(onResetFilter())}
                                                to={{
                                                    pathname: `/ket-qua-tim-kiem/dich-vu/`,
                                                    search: `keyword=${i._id}`
                                                }}
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

