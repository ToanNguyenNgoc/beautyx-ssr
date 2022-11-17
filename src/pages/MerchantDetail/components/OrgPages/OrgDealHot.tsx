/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { EmptyRes, SerProItem } from 'components/Layout';
import DiscountItem from 'features/HomeDiscounts/DiscountItem';
import { IOrganization } from 'interface';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';
import React from 'react';
import { useDeviceMobile } from 'hooks';
import { Service, Product } from 'interface'
import {
    useDiscountsOrg,
    useServicesSpecial,
    useProductsSpecial
} from 'pages/MerchantDetail/Functions';
import { useHistory } from 'react-router-dom';

interface OrgDealHotProps {
    org: IOrganization
}

export function OrgDealHot(props: OrgDealHotProps) {
    const { org } = props
    const IS_MB = useDeviceMobile();
    const history = useHistory()



    const { discounts, loadDiscounts } = useDiscountsOrg(org)
    const { services_special, loadServices } = useServicesSpecial(org)
    const { products_special, loadProducts } = useProductsSpecial(org)
    const discountsOrgs = discounts?.filter((item: IDiscountPar) => (
        (item.discount_type === "PRODUCT" || item.discount_type === "FINAL_PRICE") &&
        item.items.length > 0
    ))

    const onNavigate = () => {
        if (
            !loadDiscounts && !loadServices && !loadProducts
            && discounts.length === 0 && services_special.length === 0 && products_special.length === 0
        )
            history.push(`/cua-hang/${org.subdomain}/thong-tin`)
    }
    // useEffect(() => {
    //     onNavigate()
    // }, [discounts, loadDiscounts, services_special, loadServices, products_special, loadProducts])

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
            {services_special?.length > 0 && (
                <div className="org-deal-hot__section">
                    <span className="org-deal-hot__section-title">Dịch vụ</span>
                    <ul className="org-special__list">
                        {services_special?.map(
                            (item: Service, index: number) => (
                                <li key={index}>
                                    <SerProItem
                                        org={org}
                                        item={item}
                                        type="SERVICE"
                                        changeStyle={IS_MB}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
            {products_special?.length > 0 && (
                <div className="org-deal-hot__section">
                    <span className="org-deal-hot__section-title">
                        Sản phẩm
                    </span>
                    <ul className="org-special__list">
                        {products_special?.map(
                            (item: Product, index: number) => (
                                <li key={index}>
                                    <SerProItem
                                        org={org}
                                        item={item}
                                        type="PRODUCT"
                                        changeStyle={IS_MB}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
            {discounts?.length +
                services_special?.length +
                products_special?.length ==
                0 && (
                    <EmptyRes title="Hiện chưa có deal hot nào dành cho bạn!" />
                )}
        </div>
    );
}
