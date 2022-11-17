import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { EmptyRes, SerProItem } from "components/Layout";
import { extraParamsUrl } from "utils";
import { Category, IOrganization, Product } from "interface";
import { useDeviceMobile, useSwr, useSwrInfinite } from 'hooks'
import { AppContext } from "context/AppProvider";
import { paramProductCatesOrg, paramsProductsOrg } from 'params-query'
import API_ROUTE from "api/_api";
import { useHistory, useLocation } from "react-router-dom";
import { LoadGrid } from "components/LoadingSketion";


interface IProps {
    org: IOrganization;
}

export function OrgProducts(props: IProps) {
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const location = useLocation();
    const paramsUrl = extraParamsUrl()
    const cate_id = paramsUrl?.cate_id
    const { org } = props;
    const { t } = useContext(AppContext);
    const handleChooseCate = (id: number | null) => {
        history.replace({
            pathname: location.pathname,
            search: id ? `cate_id=${id}` : ''
        })
    }
    const categories: Category[] = useSwr(
        API_ROUTE.PRODUCT_CATES_ORG(org?.id),
        org?.id,
        paramProductCatesOrg
    ).responseArray
    const { resData, totalItem, onLoadMore } = useSwrInfinite(
        org?.id,
        API_ROUTE.ORG_PRODUCTS(org?.id),
        {
            ...paramsProductsOrg,
            "filter[product_category_id]": cate_id
        }
    )
    const products: Product[] = resData ?? []
    const onViewMore = () => {
        if (products.length >= 15 && products.length < totalItem) onLoadMore()
    }
    return (
        <div className="org-services-cnt">
            {
                (categories && categories.filter((e: Category) => e.products_count > 0).length > 0)
                &&
                <div className="org-services-cnt__left">
                    <ul className="cates-list">
                        <li
                            onClick={() => handleChooseCate(null)}
                            style={
                                !cate_id
                                    ? {
                                        color: "#fff",
                                        backgroundColor: "var(--purple)",
                                    }
                                    : {}
                            }
                            className="cate-list__item"
                        >
                            <span
                                style={
                                    !cate_id
                                        ? {
                                            color: "#fff",
                                        }
                                        : {}
                                }
                                className="cate-list__item-title"
                            >
                                {t("cart.all")}
                            </span>
                        </li>
                        {
                            categories
                                .filter((i: Category) => i.products_count > 0)
                                .map((item: Category, index: number) => (
                                    <li
                                        style={
                                            (cate_id && parseInt(cate_id) === item.id)
                                                ? {
                                                    color: "#fff",
                                                    backgroundColor: "var(--purple)",
                                                }
                                                : {}
                                        }
                                        onClick={() => handleChooseCate(item.id)}
                                        className="cate-list__item"
                                        key={index}
                                    >
                                        <span
                                            style={
                                                (cate_id && parseInt(cate_id) === item.id)
                                                    ? {
                                                        color: "#fff",
                                                    }
                                                    : {}
                                            }
                                            className="cate-list__item-title"
                                        >
                                            {item.name}
                                        </span>
                                    </li>
                                ))}
                    </ul>
                </div>
            }
            <div className="org-services-cnt__right">
                <InfiniteScroll
                    dataLength={products.length}
                    hasMore={true}
                    next={onViewMore}
                    loader={<></>}
                >
                    <ul className="org-services-cnt__right-list">
                        {products.map((item: Product, index: number) => (
                            <li key={index}>
                                <SerProItem changeStyle={IS_MB} type="PRODUCT" org={org} item={item} />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
                {totalItem === 0 && <EmptyRes title='Không có sản phẩm phù hợp!' />}
                {products.length < totalItem && <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />}
            </div>
        </div>
    );
}
