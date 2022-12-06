/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./style.css";
import CateLeft from "./components/CateLeft";
import CateRight from "./components/CateRight";
import { useSelector } from "react-redux";
import { STATUS } from "../../redux/status";
import { cateChild1 } from "../../data/category";
// ==== api tracking ====
 import tracking from "../../api/trackApi";
import { Bottom } from "components/Layout";
// end

function HomeCategory(props: any) {
    const { CATE, ORGS, SERVICES, VALUE, PRODUCTS } = useSelector(
        (state: any) => state.CATE_TREE
    );
    const catesChild = cateChild1.filter(
        (item) => item.cate_id === CATE.cate_id
    );
    useEffect(() => {
           if( ORGS.status === STATUS.SUCCESS || SERVICES.status === STATUS.SUCCESS || PRODUCTS.status === STATUS.SUCCESS)
            {
                tracking.CATEGORY_TREE_LOAD();
            }
    }, [CATE.title]);

    return (
        <>
            <div className="cate-tree-cnt">
                <CateLeft CATE={CATE} VALUE={VALUE} />
                <CateRight
                    CATE={CATE}
                    VALUE={VALUE}
                    catesChild={catesChild}
                    ORGS={ORGS}
                    SERVICES={SERVICES}
                    PRODUCTS={PRODUCTS}
                />
            </div>
        </>
    );
}

export default HomeCategory;
