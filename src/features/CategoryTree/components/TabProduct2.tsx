/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onSetFirstCateProducts } from "../../../redux/CateTree/cateTreeSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ==== api tracking ====
 import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { onResetFilter } from "redux/filter-result";
// end

function TabProduct2(props: any) {
    const dispatch = useDispatch();
    const { PRODUCTS } = useSelector((state: any) => state.CATE_TREE);
    const { catesChildByTab } = props;
    const cateChildFirst = catesChildByTab.filter(
        (item: any) => item.type === "PRODUCT"
    )[0];
    useEffect(() => {
        if (!PRODUCTS.CATE_CHILD) {
            dispatch(onSetFirstCateProducts(cateChildFirst));
        }
    }, []);
    return (
        <div>
            <ul className="home-tree__pr-cate-child">
                {PRODUCTS.CATE_CHILD?.keywords?.map(
                    (item: any, index: number) => (
                        <li key={index}>
                            <Link
                                to={{
                                    pathname: `/ket-qua-tim-kiem/san-pham`,
                                    search: `keyword=${item.title}`,
                                }}
                                onClick={() => {
                                    tracking.CATEGORY_TREE_ITEM_CLICK(
                                        catesChildByTab.id
                                    );
                                    GoogleTagPush(
                                        GoogleTagEvents.PRODUCT_CLICK
                                    );
                                    dispatch(onResetFilter())
                                }}
                                className="flex-column home-tree__pr-cate-child__item"
                            >
                                <div className="item-img__box">
                                    <img
                                        src={item.image_url}
                                        alt=""
                                        className="item-img"
                                    />
                                </div>
                                <span className="item-name">{item.title}</span>
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

export default TabProduct2;
