/* eslint-disable eqeqeq */
import React from 'react';
import { useSelector } from 'react-redux';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../../interface/discount'
import DiscountItem from '../../../HomeDiscounts/DiscountItem';
import { Service } from '../../../../interface/service';
import { Product } from '../../../../interface/product'
import OrgServiceItem from './OrgServiceItem';
import OrgProductItem from './OrgProductItem';
import EmptyRes from '../../../EmptyRes';
import IStore from '../../../../interface/IStore';

function OrgDealHot() {
    const ORG = useSelector((state: IStore) => state.ORG);
    const ORG_SPECIALS = useSelector((state: IStore) => state.ORG_SPECIALS);
    const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = ORG_SPECIALS;
    const { DISCOUNTS } = useSelector((state: IStore) => state.ORG_DISCOUNTS);
    const discounts: IDiscountPar[] = DISCOUNTS.discounts
    const discountsOrgs = discounts.filter((item: IDiscountPar) => (
        (item.discount_type === "PRODUCT" || item.discount_type === "FINAL_PRICE") &&
        item.items.length > 0
    ))
    return (
        <div className="org-deal-hot">
            {
                discountsOrgs.length > 0 &&
                <div className="org-deal-hot__discounts">
                    <ul className="list">
                        {discountsOrgs.map((discount: any, index: number) => (
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
            }
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
