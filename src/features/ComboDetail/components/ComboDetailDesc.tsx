import { SerProItem } from "components/Layout";
import { IOrganization } from "interface/organization";
import React from "react";

interface IProps {
    combo: any;
    org: IOrganization;
}
export default function ComboDetailDesc(props: IProps) {
    const { combo, org } = props;
    const productList = combo?.products;
    const serviceList = combo?.services;
    return (
        <div className="combo-desc">
            <p className="combo-description">
                Combo bao gồm :
                {` ${
                    serviceList?.length > 0 ? serviceList?.length : "0"
                } dịch vụ`}
                {productList?.length > 0 &&
                    ` và ${productList?.length} sản phẩm`}
                {serviceList?.map((item: any, index: number) => (
                    <li key={index}>
                        <span>{item.service_name}</span>
                    </li>
                ))}
                {productList?.map((item: any, index: number) => (
                    <li key={index}>
                        <span>{item.product_name}</span>
                    </li>
                ))}
            </p>

            {serviceList?.length > 0 && (
                <div className="combo-desc__wrap">
                    <div className="combo-desc__title">
                        Dịch vụ {`(${serviceList?.length})`}
                    </div>
                    <ul className="combo-desc__list">
                        {serviceList?.map((item: any, index: number) => (
                            <li key={index}>
                                <SerProItem 
                                    item={item} org={org} type="SERVICE"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {productList?.length > 0 && (
                <div className="combo-desc__wrap">
                    <div className="combo-desc__title">
                        Sản phẩm {`(${productList?.length})`}
                    </div>
                    <ul className="combo-desc__list">
                        {productList?.map((item: any, index: number) => (
                            <li key={index}>
                                <SerProItem type="PRODUCT" item={item} org={org} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
