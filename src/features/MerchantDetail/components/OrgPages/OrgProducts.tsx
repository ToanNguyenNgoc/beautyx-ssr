/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Product } from "../../../../interface/product";
import { IOrganization } from "../../../../interface/organization";
import { STATUS } from "../../../../redux/status";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAsyncCateProducts,
    fetchAsyncProducts,
    clearProducts,
    onChooseCateServices,
} from "../../../../redux/org_products/orgProductsSlice";
import OrgProductItem from "./OrgProductItem";
import { AppContext } from "../../../../context/AppProvider";
import EmptyRes from '../../../EmptyRes';
import IStore from '../../../../interface/IStore';
import { Category } from '../../../../interface/category'

interface IProps {
    org: IOrganization;
}

function OrgProducts(props: IProps) {
    const { org } = props;
    const { t } = useContext(AppContext);
    const { CATE, PRODUCTS, choose_cate, org_id } = useSelector(
        (state: IStore) => state.ORG_PRODUCTS
    );
    const { categories, status } = CATE;
    const { products, page, totalItem, status_pr } = PRODUCTS;
    const dispatch = useDispatch();
    const callCategories = () => {
        if (org_id !== org?.id || status !== STATUS.SUCCESS) {
            dispatch(onChooseCateServices(null))
            dispatch(fetchAsyncCateProducts(org?.id));
        }
    };
    const callProducts = () => {
        if (org_id !== org?.id || status_pr !== STATUS.SUCCESS) {
            const values = {
                org_id: org?.id,
                page: 1,
                cate_id: choose_cate,
                isEnable: org?.is_momo_ecommerce_enable && true
            };
            dispatch(clearProducts());
            dispatch(fetchAsyncProducts(values));
        }
    };
    useEffect(() => {
        callCategories();
        callProducts();
    }, []);
    const handleChooseCate = (id: any) => {
        const values = {
            org_id: org?.id,
            page: 1,
            cate_id: id,
            isEnable: org?.is_momo_ecommerce_enable && true
        };
        dispatch(clearProducts());
        dispatch(onChooseCateServices(id));
        dispatch(fetchAsyncProducts(values));
    };
    const onViewMore = () => {
        if (totalItem >= 15 && products.length < totalItem) {
            const values = {
                org_id: org?.id,
                page: page + 1,
                cate_id: choose_cate,
                isEnable: org?.is_momo_ecommerce_enable && true
            };
            dispatch(fetchAsyncProducts(values));
        }
    };
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
                                !choose_cate
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
                                    !choose_cate
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
                                            choose_cate === item.id
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
                                                choose_cate === item.id
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
                {totalItem === 0 && status === STATUS.SUCCESS && <EmptyRes title='Không có sản phẩm phù hợp!' />}
                <InfiniteScroll
                    dataLength={products.length}
                    hasMore={true}
                    next={onViewMore}
                    loader={<></>}
                >
                    <ul className="org-services-cnt__right-list">
                        {products.map((item: Product, index: number) => (
                            <li key={index}>
                                <OrgProductItem org={org} product={item} />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default OrgProducts;
