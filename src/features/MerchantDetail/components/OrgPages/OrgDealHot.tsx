/* eslint-disable eqeqeq */
import React from "react";
import { useSelector } from "react-redux";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../../interface/discount";
import DiscountItem from "../../../HomeDiscounts/DiscountItem";
import { Service } from "../../../../interface/service";
import { Product } from "../../../../interface/product";
import OrgServiceItem from "./OrgServiceItem";
import OrgProductItem from "./OrgProductItem";
import EmptyRes from "../../../EmptyRes";
import OrgVoucher from "./OrgVoucher";

function OrgDealHot() {
    const ORG = useSelector((state: any) => state.ORG);
    const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
    const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = ORG_SPECIALS;
    const { DISCOUNTS } = useSelector((state: any) => state.ORG_DISCOUNTS);
    const discounts: IDiscountPar[] = DISCOUNTS.discounts;
    return (
        <div className="org-deal-hot">
            {/* <OrgVoucher
                org_id={ORG.org?.id}
            /> */}
            {discounts?.length > 0 && (
                <div className="org-deal-hot__discounts">
                    <ul className="list">
                        {discounts
                            ?.filter(
                                (i: IDiscountPar) =>
                                    i.discount_type === "PRODUCT"
                            )
                            ?.map((discount: any, index: number) => (
                                <li key={index} className="org-discount__item">
                                    {discount.items.map(
                                        (item: IITEMS_DISCOUNT, i: number) => (
                                            <DiscountItem
                                                key={i}
                                                discountItem={item}
                                                discountPar={discount}
                                            />
                                        )
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            {SERVICES_SPECIAL.services_special?.length > 0 && (
                <div className="org-deal-hot__section">
                    <span className="org-deal-hot__section-title">Dịch vụ</span>
                    <ul className="org-special__list">
                        {SERVICES_SPECIAL.services_special?.map(
                            (item: Service, index: number) => (
                                <li key={index}>
                                    <OrgServiceItem
                                        org={ORG.org}
                                        service={item}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
            {PRODUCTS_SPECIAL.products_special?.length > 0 && (
                <div className="org-deal-hot__section">
                    <span className="org-deal-hot__section-title">
                        Sản phẩm
                    </span>
                    <ul className="org-special__list">
                        {PRODUCTS_SPECIAL.products_special?.map(
                            (item: Product, index: number) => (
                                <li key={index}>
                                    <OrgProductItem
                                        org={ORG.org}
                                        product={item}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
            {discounts?.length +
                SERVICES_SPECIAL.services_special?.length +
                PRODUCTS_SPECIAL.products_special?.length ==
                0 && (
                <EmptyRes title="Hiện chưa có deal hot nào dành cho bạn!" />
            )}
        </div>
    );
}

export default OrgDealHot;
