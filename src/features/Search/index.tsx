/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, KeyboardEvent, useState, useContext } from "react"
import { onErrorImg, useDeviceMobile, useFetch } from "utils"
import { paramOrgs, paramsProducts, paramsServices } from "params-query"
import style from "./search.module.css"
import { Link, useHistory } from "react-router-dom"
import { useOrgs, useProducts, useServices } from "./hook"
import { IProductPromo } from "interface/productPromo"
import { SerProItem, SpecialItem } from "components/Layout"
import { IServicePromo } from "interface/servicePromo"
import { IOrganization } from "interface/organization"
import icon from "constants/icon"
import { debounce } from "lodash"
import tracking from "api/trackApi"
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter"
import { AppContext } from "context/AppProvider"
import { useDispatch, useSelector } from "react-redux"
import API_3RD from "api/3rd-api"
import slugify from "utils/formatUrlString"

interface SearchProps {
    key_work?: string,
    key_work_debounce?: string,
    onCloseSearchTimeOut?: () => void
}


function Search(props: SearchProps) {
    const { specialItems } = useContext(AppContext)
    const keysRecommend = useFetch(true, `${API_3RD.API_NODE}/history/view`).response
    const { key_work, key_work_debounce, onCloseSearchTimeOut } = props
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const [keyword, setKeyword] = useState({ key: "", key_debounce: "" })
    const onCloseSearch = () => onCloseSearchTimeOut && onCloseSearchTimeOut()
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
    const { orgs, totalOrg } = useOrgs(PARAM_ORG, KEY_WORD !== "")
    const { services, totalService } = useServices(PARAM_SERVICE, KEY_WORD !== "")
    const { products, totalProduct } = useProducts(PARAM_PRODUCT, KEY_WORD !== "")
    //
    const tabs = [
        { link: "dich-vu", total: totalService },
        { link: "cua-hang", total: totalOrg },
        { link: "san-pham", total: totalProduct }
    ]
    const tabSort = tabs.sort((a, b) => b.total - a.total);
    const onResult = () => {
        if (KEY_WORD_DE !== "") history.push({
            pathname: `/ket-qua-tim-kiem/${tabSort[0]?.link}`,
            search: `?keyword=${encodeURIComponent(KEY_WORD)}`,
        })
        if (onCloseSearchTimeOut) onCloseSearchTimeOut()
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onResult()
        }
    }
    // const onSaveOrg = (item: IOrganization) => {
    //     dispatch(addHistory({
    //         TYPE: "ORG", id: item.id, item: item
    //     }))
    // }
    const onItemSpecial = (item: any) => {
        if (item.type === "DISCOUNT") {
            history.push({
                pathname: `/chi-tiet-giam-gia/service_${item.organization_id}_${item.id}_${item.item_id}_${slugify(item.name)}`,
            });
        }
        if (item.type === "SERVICE") return history.push(`/dich-vu/${item.id}_${item.organization_id}_${slugify(item.name)}`);
    }
    return (
        <div className={style.container}>
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
                        KEY_WORD !== "" &&
                        <img
                            onClick={() => setKeyword({ key: "", key_debounce: "" })}
                            className={style.search_input_x} src={icon.closeBlack}
                            alt=""
                        />
                    }
                </div>
                {
                    KEY_WORD !== "" &&
                    <Link
                        onClick={onCloseSearch}
                        to={{
                            pathname: `/ket-qua-tim-kiem/${tabSort[0].link}`,
                            search: `?keyword=${encodeURIComponent(KEY_WORD)}`,
                        }} className={style.search_head_link} >
                        Tìm kiếm kết quả cho <h3>{KEY_WORD}</h3>
                    </Link>
                }
            </div>
            <div className={style.search_body}>
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
                                            // onClick={() => onSaveOrg(item)}
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
                                        onClick={onCloseSearch}
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
                                        onClick={onCloseSearch}
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
                    <div className={style.section_container}>
                        <span className={style.section_title}>Đã tìm kiếm</span>
                        <div className={style.org_list}>
                            <div
                                onClick={onCloseSearch}
                                className={style.org_list_wrapper}
                            >
                                {/* {
                                    HISTORY
                                        .filter((i: any) => i.TYPE === "ORG")
                                        .map((item: any) => (
                                            <Link key={item.id} to={{ pathname: formatRouterLinkOrg(item.item.subdomain) }} >
                                                <div className={style.org_item}>
                                                    <img
                                                        src={item.item.image_url}
                                                        onError={(e) => onErrorImg(e)}
                                                        className={style.org_item_img} alt=""
                                                    />
                                                    <span className={style.org_item_name}>
                                                        {item.item.name}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                } */}
                            </div>
                        </div>
                    </div>
                }
                {
                    KEY_WORD === "" &&
                    <>
                        <div className={style.section_recommend}>
                            <span className={style.section_title}>Dịch vụ bán chạy</span>
                            <ul className={style.list_special}>
                                {specialItems.map((item: any, index: number) => (
                                    <li
                                        onClick={() => onItemSpecial(item)}
                                        key={index} className={style.list_special_item}
                                    >
                                        <SpecialItem item={item} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={style.section_recommend}>
                            <span className={style.section_title}>Gợi ý tìm kiếm</span>
                            <ul className={style.list_key}>
                                {keysRecommend.map((item: any, index: number) => (
                                    <li
                                        onClick={onCloseSearch}
                                        key={index} className={style.list_key_item}
                                    >
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
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
export default Search;

