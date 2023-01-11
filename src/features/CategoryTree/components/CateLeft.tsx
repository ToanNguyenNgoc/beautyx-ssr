import React from "react";
import { useDispatch } from "react-redux";
import { category } from "data/category";
import {
    onChooseCate,
    fetchOrgsByTag,
} from "redux/cate-tree/cateTreeSlice";
import { cateChild1 } from "data/category";
import {
    fetchServiceByCateChild,
    onSetFirstCateProducts,
} from "redux/cate-tree/cateTreeSlice";

// ==== api tracking ====
 import tracking from "api/trackApi";
// end
function CateLeft(props: any) {
    const { CATE, VALUE } = props;
    const dispatch = useDispatch();
    const handleChooseCate = (item: any) => {
        tracking.CATEGORY_TREE_ITEM_CLICK(item.id);
        const action = {
            title: item.title,
            cate_id: item.id,
        };
        dispatch(onChooseCate(action));
        dispatch(
            fetchOrgsByTag({
                tags: item.title,
                page: 1,
            })
        );

        const cateChildFirst = cateChild1.filter(
            (i) => i.cate_id === item.id
        )[0];
        if (VALUE === "SERVICE") {
            const action_service = {
                page: 1,
                keyword: cateChildFirst?.title,
                CATE_CHILD: cateChildFirst,
            };
            dispatch(fetchServiceByCateChild(action_service));
        } else if (VALUE === "PRODUCT") {
            const cateProductsFirst = cateChild1.filter(
                (i) => i.cate_id === item.id
            );
            dispatch(
                onSetFirstCateProducts(
                    cateProductsFirst.filter((i) => i.type === "PRODUCT")[0]
                )
            );
        }
    };
    return (
        <div className="cate-tree-cnt__left">
            <ul className="cate-list">
                {category.map((item, index) => (
                    <li
                        style={
                            CATE.cate_id === item.id
                                ? { backgroundColor: "var(--white)" }
                                : {}
                        }
                        className={
                            CATE.cate_id === item.id
                                ? "flex-column cate-list__item active_cate"
                                : "flex-column cate-list__item"
                        }
                        key={index}
                        onClick={() => handleChooseCate(item)}
                    >
                        <img
                            src={item.image}
                            alt=""
                            className="cate-list__item-img"
                        />
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CateLeft;
