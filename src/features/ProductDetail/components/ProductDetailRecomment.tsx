import { SerProItem } from "components/Layout";
import { AppContext } from "context/AppProvider";
import { IOrganization } from "interface/organization";
import { Product } from "interface/product";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynProductRecomment } from "redux/org_products/productSlice";
import { STATUS } from "redux/status";
import { useGetParamUrl } from "utils";
// import { AppContext } from "../../../context/AppProvider";
// import { IOrganization } from "../../../interface/organization";
// import { Product } from "../../../interface/product";
// import { fetchAsynProductRecomment } from "../../../redux/org_products/productSlice";
// import { STATUS } from "../../../redux/status";
// import { extraParamsUrl } from "../../../utils/extraParamsUrl";
// import ProductItem from "../../ViewItemCommon/ProductItem";

interface IProps {
    org: IOrganization;
}
export default function ProductDetailRecomment(props: IProps) {
    const paramsArr = useGetParamUrl();
    const params = {
        org: paramsArr[1] ? paramsArr[1] : 1,
        id: paramsArr[0] ?? 1
    }
    const { t } = useContext(AppContext);
    const { org } = props;
    const dispatch = useDispatch();
    const { PRODUCT, PRODUCT_REC } = useSelector((state: any) => state.PRODUCT);
    const callProductRecomment = () => {
        if (PRODUCT.status === STATUS.SUCCESS) {
            if (
                PRODUCT_REC.cate_id !== PRODUCT.product.category?.id ||
                PRODUCT_REC.status !== STATUS.SUCCESS
            ) {
                const values = {
                    page: 1,
                    org_id: params.org,
                    cate_id: PRODUCT.product.category?.id,
                    isEnable: org?.is_momo_ecommerce_enable && true,
                };
                dispatch(fetchAsynProductRecomment(values));
            }
        }
    };
    useEffect(() => {
        callProductRecomment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PRODUCT.status]);

    return (
        <div className="detail-recommend">
            <div className="detail-recommend__title">
                {t("detail_item.similar_product")}
            </div>
            <ul className="detail-recommend__list">
                {PRODUCT_REC?.products?.map((item: Product, index: number) => (
                    <li key={index}>
                        <SerProItem item={item} org={org} type="PRODUCT" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
