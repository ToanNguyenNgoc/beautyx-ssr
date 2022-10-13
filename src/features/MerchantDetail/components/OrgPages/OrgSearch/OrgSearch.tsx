import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import OrgDealHot from "../OrgDealHot";
import { SerProItem } from "components/Layout";
import { Product } from "interface/product";
import { Service } from "interface/service";

function OrgSearch(props: any) {
    const { orgSearchCnt, keyword, org } = props;
    const { SERVICES_KEYWORD, PRODUCTS_KEYWORD } = useSelector(
        (state: any) => state.ORG
    );
    const [tab, setTab] = useState(1);
    const tabs = useMemo(
        () => [
            { id: 1, title: "", total: SERVICES_KEYWORD.total_services },
            {
                id: 2,
                title: "Sản phẩm",
                total: PRODUCTS_KEYWORD.total_products,
            },
        ],
        [PRODUCTS_KEYWORD.total_products, SERVICES_KEYWORD.total_services]
    );
    useEffect(() => {
        const tabSort = tabs.sort((a, b) => b.total - a.total);
        setTab(tabSort[0]?.id);
    }, [tabs]);

    return (
        <div ref={orgSearchCnt} className="mb-org-search-cnt">
            <div className="wrap">
                {keyword.length === 0 ? (
                    <>
                        <span className="mb-org-search-cnt__title">
                            Từ khóa được tìm nhiều nhất
                        </span>
                        <div className="flex-row mb-org-search-cnt__current">
                            <span>Message</span>
                            <span>Trị mụn</span>
                            <span>Chống lão hóa</span>
                        </div>
                        <OrgDealHot />
                    </>
                ) : (
                    <div className="mb-org-search__result">
                        <div className="flex-row tab">
                            {tabs.map((item) => (
                                <span
                                    key={item.id}
                                    onClick={() => setTab(item.id)}
                                    style={
                                        item.id === tab
                                            ? {
                                                  color: "var(--text-black)",
                                                  borderBottom:
                                                      "solid 1px var(--text-black)",
                                              }
                                            : {}
                                    }
                                    className="tab-item"
                                >
                                    {item.title}
                                </span>
                            ))}
                        </div>
                        <div className="mb-org-search-result__cnt">
                            {tab === 1 && (
                                <TabServices
                                    org={org}
                                    services={SERVICES_KEYWORD.services_keyword}
                                />
                            )}
                            {tab === 2 && (
                                <TabProducts
                                    org={org}
                                    products={PRODUCTS_KEYWORD.products_keyword}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrgSearch;

const TabProducts = (props: any) => {
    const { org, products } = props;
    return (
        <ul className="list">
            {products?.map((item: Product, index: number) => (
                <li key={index}>
                   <SerProItem changeStyle={true} org={org} item={item} type="PRODUCT" />
                </li>
            ))}
        </ul>
    );
};
const TabServices = (props: any) => {
    const { services, org } = props;
    return (
        <ul className="list">
            {services?.map((item: Service, index: number) => (
                <li key={index}>
                    <SerProItem changeStyle={true} org={org} item={item} type="SERVICE" />
                </li>
            ))}
        </ul>
    );
};
