import { Drawer } from "@mui/material";
import { Container } from "@mui/system";
import { API_ROUTE_V } from "api/_api";
import { AUTH_LOCATION } from "api/authLocation";
import {
    EventLocation,
    FilterLocation,
    FilterPrice,
    FilterSort,
} from "components/Filter";
import { ProductableItem, XButton } from "components/Layout";
import { LoadGrid } from "components/LoadingSketion";
import icon from "constants/icon";
import HeadMobile from "features/HeadMobile";
import { useDeviceMobile, useFetchInfinite, useTags } from "hooks";
import { ITag } from "interface";
import { paramsProductable } from "params-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { extraParamsUrl } from "utils";
import {
    formatParamsString,
    formatRouterCateResult,
} from "utils/formatRouterLink/formatRouter";
import style from "./home-cate.module.css";

interface IPageGroup {
    page: number;
    items: ITag[];
}
const NextButton = (props: any) => {
    return (
        <XButton
            className={style.next_btn}
            onClick={() => props.onClick()}
            icon={icon.chevronRight}
        />
    );
};
const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <XButton
            className={style.prev_btn}
            onClick={onClick}
            icon={icon.chevronLeft}
        />
    );
};

function HomeCateResult() {
    const IS_MB = useDeviceMobile();
    const params: any = extraParamsUrl();
    const location = useLocation();
    const { queryTag } = useTags();
    const [openFilter, setOpenFilter] = useState(false);
    const page_url = location.pathname.split("/")[1];
    const history = useHistory();
    const id = params?.id;
    const type = page_url === "danh-sach-dich-vu" ? "SERVICE" : "PRODUCT";
    let check_type_params = type === "SERVICE" ? "1" : "2";
    const query = params?.sort ?? "";
    // const userLocation = params?.location ?? "";
    const LOCATION = AUTH_LOCATION();

    const tag = queryTag(id, type);
    const tagParent = queryTag(tag?.parent_id, type);
    const tagParParent = queryTag(tagParent?.parent_id, type);
    // const newParams = {
    //     ...paramsProducts,
    //     "filter[location]": userLocation,
    //     "filter[keyword]": tag?.name,
    //     "filter[min_price]": parseInt(params.min_price) ?? "",
    //     "filter[max_price]": parseInt(params.max_price) ?? "",
    //     "filter[special_price]": query === "-discount_percent" ? true : "",
    //     "sort": query !== "location" && query
    // }
    const newParams = {
        ...paramsProductable,
        type: check_type_params,
        limit: 15,
        keyword: tag?.name ?? "",
        min_price: parseInt(params.min_price) ?? "",
        max_price: parseInt(params.max_price) ?? "",
        on_ecommerce: true,
        location: LOCATION,
        discount_price: query === "-discount_percent" ? true : "",
        sort: query !== "location" && query,
    };
    let condition = false;
    if (tag?.name && (type === "PRODUCT" || type === "SERVICE"))
        condition = true;
    // let APL_URL = ""
    // if (type === "SERVICE") APL_URL = "/services"
    // if (type === "PRODUCT") APL_URL = "/products"
    // const { resData, totalItem, onLoadMore } = useSwrInfinite(
    //     condition,
    //     APL_URL,
    //     newParams
    // )

    const { resDataV2, totalItemV2, onLoadMore } = useFetchInfinite(
        condition,
        API_ROUTE_V.PRODUCTABLE("v3"),
        newParams
    );

    const onViewMore = () => {
        if (resDataV2.length >= 15 && resDataV2.length <= totalItemV2) {
            onLoadMore();
        }
    };
    //handle sort & filter
    const onChangeFilter = (values: any) => {
        const paramsChange = {
            ...params,
            min_price: values.min_price ?? params?.min_price,
            max_price: values.max_price ?? params?.max_price,
        };
        const pathname = location.pathname;
        history.push(`${pathname}?${formatParamsString(paramsChange)}`);
    };
    const onChangeLocation = (e: EventLocation) => {
        const paramsChange = {
            ...params,
            location: e.coords,
        };
        const pathname = location.pathname;
        history.push(`${pathname}?${formatParamsString(paramsChange)}`);
    };
    const onChangeSort = (e: string) => {
        const paramsChange = {
            ...params,
            sort: e,
        };
        const pathname = location.pathname;
        history.push(`${pathname}?${formatParamsString(paramsChange)}`);
    };
    //pagination tags child
    const perPage = IS_MB ? 4 : 6;
    const totalTagChild = tag?.children?.length ?? 0;
    const totalPage = Math.ceil(totalTagChild / perPage);
    const pageGroup: IPageGroup[] = [];
    for (var i = 0; i < totalPage; i++) {
        const pageItem = {
            page: i + 1,
            items:
                tag?.children?.slice(i * perPage, i * perPage + perPage) ?? [],
        };
        pageGroup.push(pageItem);
    }
    const [slide, setSlide] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: slide === 0 ? <NextButton /> : <></>,
        prevArrow: slide === 1 ? <PrevButton /> : <></>,
        swipe: true,
        afterChange: function (index: number) {
            setSlide(index);
        },
    };

    return (
        <>
            {IS_MB && <HeadMobile title={tag?.name ?? ""} />}
            <Container>
                <div className={style.container}>
                    <div className={style.head}>
                        <span className={style.head_item}>
                            <Link to={{ pathname: "/" }}>Trang chủ</Link>
                        </span>
                        {tagParParent?.name && (
                            <span className={style.head_item}>
                                <Link
                                    to={{
                                        pathname: formatRouterCateResult(
                                            tagParParent.id,
                                            tagParParent.name,
                                            type
                                        ),
                                    }}
                                >
                                    <img src={icon.chevronRightBlack} alt="" />
                                    {tagParParent.name}
                                </Link>
                            </span>
                        )}
                        {tagParent?.name && (
                            <span className={style.head_item}>
                                <Link
                                    to={{
                                        pathname: formatRouterCateResult(
                                            tagParent.id,
                                            tagParent.name,
                                            type
                                        ),
                                    }}
                                >
                                    <img src={icon.chevronRightBlack} alt="" />
                                    {tagParent.name}
                                </Link>
                            </span>
                        )}
                        {tag?.name && (
                            <span className={style.head_item}>
                                <Link
                                    to={{
                                        pathname: formatRouterCateResult(
                                            tag.id,
                                            tag.name,
                                            type
                                        ),
                                    }}
                                >
                                    <img src={icon.chevronRightBlack} alt="" />
                                    {tag.name}
                                </Link>
                            </span>
                        )}
                    </div>
                    {pageGroup.length > 0 && (
                        <div className={style.cate_child_cnt}>
                            <Slider {...settings}>
                                {pageGroup.map((page: IPageGroup) => (
                                    <ul
                                        key={page.page}
                                        className={style.cate_child_list}
                                    >
                                        {page.items?.map(
                                            (
                                                tag_child: ITag,
                                                index: number
                                            ) => (
                                                <li
                                                    key={index}
                                                    className={
                                                        style.cate_child_item
                                                    }
                                                >
                                                    <Link
                                                        to={{
                                                            pathname:
                                                                formatRouterCateResult(
                                                                    tag_child.id,
                                                                    tag_child.name,
                                                                    type
                                                                ),
                                                        }}
                                                        className={
                                                            style.cate_child_item_cnt
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.cate_child_item_img
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    tag_child
                                                                        .media[0]
                                                                        ?.original_url
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <p
                                                            className={
                                                                style.cate_child_item_title
                                                            }
                                                        >
                                                            {tag_child.name}
                                                        </p>
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ))}
                            </Slider>
                        </div>
                    )}
                    {IS_MB && (
                        <div className={style.filter_mobile_cnt}>
                            <div className={style.filter_mobile_location}>
                                <FilterLocation onChange={onChangeLocation} />
                            </div>
                            <div className={style.filter_mobile_other}>
                                <XButton
                                    icon={icon.settingsSliders}
                                    iconSize={18}
                                    className={style.filter_mobile_other_open}
                                    title="Bộ lọc"
                                    onClick={() => setOpenFilter(true)}
                                />
                                <Drawer
                                    anchor="bottom"
                                    open={openFilter}
                                    onClose={() => setOpenFilter(false)}
                                >
                                    <FilterSort
                                        type={type}
                                        onChange={onChangeSort}
                                        value={query}
                                    />
                                    <FilterPrice
                                        onChangePrice={onChangeFilter}
                                        onCloseDrawer={() =>
                                            setOpenFilter(false)
                                        }
                                        min_price={params?.min_price ?? ""}
                                        max_price={params?.max_price ?? ""}
                                    />
                                </Drawer>
                            </div>
                        </div>
                    )}
                    <div className={style.body}>
                        <div className={style.body_left}>
                            <FilterLocation onChange={onChangeLocation} />
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
                                dataLength={resDataV2.length}
                                hasMore={true}
                                loader={<></>}
                                next={onViewMore}
                            >
                                {/* <ul className={style.body_right_list}>
                                    {resDataV2.map(
                                        (item: any, index: number) => (
                                            <li
                                                key={index}
                                                className={style.body_list_item}
                                            >
                                                {type === "PRODUCT" && (
                                                    <SerProItem
                                                        item={item}
                                                        type="PRODUCT"
                                                    />
                                                )}
                                                {type === "SERVICE" && (
                                                    <SerProItem
                                                        item={item}
                                                        type="SERVICE"
                                                    />
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul> */}
                                <ul className={style.body_right_list}>
                                    {resDataV2.map(
                                        (item: any, index: number) => (
                                            <li
                                                key={index}
                                                className={style.body_list_item}
                                            >
                                                {type === "PRODUCT" && (
                                                    <ProductableItem
                                                        productable={item}
                                                    />
                                                )}
                                                {type === "SERVICE" && (
                                                    <ProductableItem
                                                        productable={item}
                                                    />
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                                {resDataV2.length < totalItemV2 && (
                                    <LoadGrid grid={IS_MB ? 2 : 5} />
                                )}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomeCateResult;
