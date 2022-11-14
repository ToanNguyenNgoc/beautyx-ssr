import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container } from '@mui/system';
import { SerProItem } from 'components/Layout';
import { FilterPrice, FilterLocation, EventLocation, FilterSort } from 'components/Filter';
import { extraParamsUrl, useSwr, useSwrInfinite } from 'utils';
import { ITag } from 'interface';
import { paramsProducts, paramsProductsCate } from 'params-query';
import { formatParamsString, formatRouterCateResult } from 'utils/formatRouterLink/formatRouter';
import Head from 'features/Head';
import icon from 'constants/icon';
import { LoadGrid } from 'components/LoadingSketion';
import style from "./home-cate.module.css"

function HomeCateResult() {
    const params: any = extraParamsUrl();
    const location = useLocation();
    const page_url = location.pathname.split("/")[1];
    const history = useHistory();
    const id = params?.id
    const type = page_url === "danh-sach-dich-vu" ? "SERVICE" : "PRODUCT"
    const query = params?.sort ?? ""
    const userLocation = params?.location ?? ''
    const tag: ITag = useSwr(`/tags/${id}`, id, paramsProductsCate).response
    const tagParent: ITag = useSwr(`/tags/${tag?.parent_id}`, tag?.parent_id, paramsProductsCate).response
    const tagParParent: ITag = useSwr(
        `/tags/${tagParent?.parent_id}`,
        tagParent?.parent_id,
        paramsProductsCate).response
    const newParams = {
        ...paramsProducts,
        "filter[location]": userLocation,
        "filter[keyword]": tag?.name,
        "filter[min_price]": parseInt(params.min_price) ?? "",
        "filter[max_price]": parseInt(params.max_price) ?? "",
        "filter[special_price]": query === "-discount_percent" ? true : "",
        "sort": query !== "location" && query
    }
    let condition = false
    if (tag?.name && (type === "PRODUCT" || type === "SERVICE")) condition = true
    let APL_URL = ""
    if (type === "SERVICE") APL_URL = "/services"
    if (type === "PRODUCT") APL_URL = "/products"
    const { resData, totalItem, onLoadMore } = useSwrInfinite(
        condition,
        APL_URL,
        newParams
    )

    const onViewMore = () => {
        if (resData.length >= 30 && resData.length <= totalItem) {
            onLoadMore()
        }
    }
    //handle sort & filter
    const onChangeFilter = (values: any) => {
        const paramsChange = {
            ...params,
            min_price: values.min_price ?? params?.min_price,
            max_price: values.max_price ?? params?.max_price
        }
        const pathname = location.pathname
        history.push(`${pathname}?${formatParamsString(paramsChange)}`)
    }
    const onChangeLocation = (e: EventLocation) => {
        const paramsChange = {
            ...params,
            location: e.coords
        }
        const pathname = location.pathname
        history.push(`${pathname}?${formatParamsString(paramsChange)}`)
    }
    const onChangeSort = (e: string) => {
        const paramsChange = {
            ...params,
            sort: e
        }
        const pathname = location.pathname
        history.push(`${pathname}?${formatParamsString(paramsChange)}`)
    }

    return (
        <>
            <Head />
            <Container>
                <div className={style.container}>
                    <div className={style.head}>
                        <span className={style.head_item}>
                            <Link to={{ pathname: "/" }} >Trang chủ</Link>
                        </span>
                        {
                            tagParParent?.name &&
                            <span className={style.head_item}>
                                <Link
                                    to={{ pathname: formatRouterCateResult(tagParParent.id, tagParParent.name, type) }}
                                >
                                    <img src={icon.chevronRightBlack} alt="" />
                                    {tagParParent.name}
                                </Link>
                            </span>
                        }
                        {
                            tagParent?.name &&
                            <span className={style.head_item}>
                                <Link
                                    to={{ pathname: formatRouterCateResult(tagParent.id, tagParent.name, type) }}
                                >
                                    <img src={icon.chevronRightBlack} alt="" />
                                    {tagParent.name}
                                </Link>
                            </span>
                        }
                        {
                            tag?.name &&
                            <span className={style.head_item}>
                                <Link
                                    to={{ pathname: formatRouterCateResult(tag.id, tag.name, type) }}
                                >
                                    <img src={icon.chevronRightBlack} alt="" />
                                    {tag.name}
                                </Link>
                            </span>
                        }
                    </div>
                    <div className={style.body}>
                        <div className={style.body_left}>
                            <ul className={style.body_left_cate_list}>
                                {
                                    tag?.children?.map((tag_child: ITag, index: number) => (
                                        <li className={style.body_left_cate_name} key={index}>
                                            <Link
                                                to={{ pathname: formatRouterCateResult(tag_child.id, tag_child.name, type) }}
                                            >
                                                {tag_child.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <FilterLocation
                                onChange={onChangeLocation}
                            />
                            <FilterSort
                                type={type}
                                onChange={onChangeSort}
                                value={query}
                            />
                            <FilterPrice
                                onChangePrice={onChangeFilter}
                                min_price={params?.min_price ?? ""}
                                max_price={params?.max_price ?? ""}
                            />
                        </div>
                        <div className={style.body_right}>
                            <InfiniteScroll
                                dataLength={resData.length}
                                hasMore={true}
                                loader={<></>}
                                next={onViewMore}
                            >
                                <ul className={style.body_right_list}>
                                    {
                                        resData.map((item: any, index: number) => (
                                            <li key={index} className={style.body_list_item}>
                                                {type === "PRODUCT" && <SerProItem item={item} type="PRODUCT" />}
                                                {type === "SERVICE" && <SerProItem item={item} type="SERVICE" />}
                                            </li>
                                        ))
                                    }
                                </ul>
                                {resData.length < totalItem && <LoadGrid grid={5} />}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomeCateResult;
