import React from 'react';
import Head from '../../Head';
import { extraParamsUrl } from '../../../utils/extraParamsUrl';
import { useSwr } from '../../../utils/useSwr';
import useSwrInfinite from '../../../utils/useSwrInfinite';
import { paramsProductsCate, paramsProducts } from "../../../params-query"
import { ITag } from '../../../interface/tags';
import { formatRouterCateResult } from "../../../utils/formatRouterLink/formatRouter"
import { Link, useHistory, useLocation } from 'react-router-dom';
import { IProductPromo } from '../../../interface/productPromo';
import ProductPromoItem from '../../ViewItemCommon/ProductPromoItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadGrid from '../../../components/LoadingSketion/LoadGrid';
import FilterProduct from '../../Filter/FilterProduct';

import style from "./home-cate.module.css"
import icon from '../../../constants/icon';
import { Container } from '@mui/system';

function HomeCateResult() {
    const params = extraParamsUrl();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const location = useLocation();
    const history = useHistory();
    const id = params?.id
    const query = params?.sort ?? ""

    const tag: ITag = useSwr(`/tags/${id}`, id, paramsProductsCate).response
    const tagParent: ITag = useSwr(`/tags/${tag?.parent_id}`, tag?.parent_id, paramsProductsCate).response
    const tagParParent: ITag = useSwr(
        `/tags/${tagParent?.parent_id}`,
        tagParent?.parent_id,
        paramsProductsCate).response
    const newParams = {
        ...paramsProducts,
        "filter[keyword]": tag?.name,
        "filter[special_price]": query === "-discount_percent" ? true : "",
        "sort": query
    }
    const { resData, totalItem, onLoadMore } = useSwrInfinite(
        tag?.name,
        "/products",
        newParams
    )

    const onViewMore = () => {
        if (resData.length >= 30 && resData.length <= totalItem) {
            onLoadMore()
        }
    }
    //handle sort & filter
    const onChangeFilter = (q: string) => {
        console.log(location)
        const pathname = location.pathname
        history.push(`${pathname}?id=${id}&sort=${q}`)
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
                                    to={{ pathname: formatRouterCateResult(tagParParent.id, tagParParent.name) }}
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
                                    to={{ pathname: formatRouterCateResult(tagParent.id, tagParent.name) }}
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
                                    to={{ pathname: formatRouterCateResult(tag.id, tag.name) }}
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
                                                to={{ pathname: formatRouterCateResult(tag_child.id, tag_child.name) }}
                                            >
                                                {tag_child.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={style.body_right}>
                            <div className={style.body_right_sort}>
                                <FilterProduct
                                    onChangeFilter={onChangeFilter}
                                    value={query}
                                />
                            </div>
                            <InfiniteScroll
                                dataLength={resData.length}
                                hasMore={true}
                                loader={<></>}
                                next={onViewMore}
                            >
                                <ul className={style.body_right_list}>
                                    {
                                        resData.map((item: IProductPromo, index: number) => (
                                            <li key={index} className={style.body_list_item}>
                                                <ProductPromoItem
                                                    product={item}
                                                />
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
