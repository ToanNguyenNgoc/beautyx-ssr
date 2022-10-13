/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import onErrorImg from "../../../utils/errorImg";
import formatNumber from "../../../utils/formatPrice";
import { fetchServiceByCateChild } from "../../../redux/CateTree/cateTreeSlice";
import { formatRouterLinkService } from "utils/formatRouterLink/formatRouter"
import { STATUS } from "../../../redux/status";
import { useEffect } from "react";
import scrollTop from "../../../utils/scrollTop";
// ==== api tracking ====
import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { analytics, logEvent } from "../../../firebase";
// end
function TabService(props: any) {
    const { catesChild, CATE } = props;
    const dispatch = useDispatch();
    const { SERVICES } = useSelector((state: any) => state.CATE_TREE);

    const callServicesByCateChild = () => {
        if (
            SERVICES.status !== STATUS.SUCCESS ||
            SERVICES.CATE?.cate_id !== CATE.cate_id
        ) {
            const cateChildFirst = catesChild.filter(
                (item: any) => item.type === "SERVICE"
            )[0];
            const action = {
                page: 1,
                keyword: cateChildFirst?.title,
                CATE_CHILD: cateChildFirst,
                CATE: CATE,
            };
            dispatch(fetchServiceByCateChild(action));
        }
    };
    useEffect(() => {
        callServicesByCateChild();
    }, []);
    const { discounts } = useSelector((state: any) => state.HOME.DISCOUNTS);
    const discount_items = discounts.map((item: any) => item.items).flat();
    const history = useHistory();
    const onServiceDetail = (service: any) => {
        scrollTop();
        tracking.CATEGORY_TREE_ITEM_CLICK(CATE.cate_id, service.org_id, service.id)
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        logEvent(analytics, 'detail_service', {
            service: service.service_name,
            merchant: service.org_name
        })
        const pathServiceOb = formatRouterLinkService(
            service.service_id, service.org_id, service.name
        );
        history.push(pathServiceOb);
    };
    return (
        <div>
            <ul className="cate-services__list">
                {SERVICES.services.map((item: any, index: number) => {
                    const service_item_discount = discount_items?.find(
                        (i: any) =>
                            i.productable_id === item.service_id &&
                            i.organization_id === item.org_id
                    );
                    return (
                        <li key={index} onClick={() => onServiceDetail(item)}>
                            <div className="flex-row-sp cate-services__list-item">
                                <img
                                    src={
                                        item.image_url
                                            ? item.image_url
                                            : item.org_image
                                    }
                                    alt=""
                                    className="item-img"
                                    onError={(e) => onErrorImg(e)}
                                />
                                <div className="item-detail">
                                    <span className="item-name">
                                        {item.service_name}
                                    </span>
                                    <div className="flex-row item-price">
                                        {service_item_discount ? (
                                            <>
                                                <span>
                                                    {formatNumber(
                                                        service_item_discount?.view_price
                                                    )}
                                                    đ
                                                </span>
                                                <span>
                                                    {formatNumber(item.price)}đ
                                                </span>
                                            </>
                                        ) : item.special_price > 0 ? (
                                            <>
                                                <span>
                                                    {formatNumber(
                                                        item.special_price
                                                    )}
                                                    đ
                                                </span>
                                                <span>
                                                    {formatNumber(item.price)}đ
                                                </span>
                                            </>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "var(--purple)",
                                                }}
                                            >
                                                {formatNumber(item.price)}đ
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TabService;
