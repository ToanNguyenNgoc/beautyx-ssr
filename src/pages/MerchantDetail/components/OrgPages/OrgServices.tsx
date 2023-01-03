/* eslint-disable react-hooks/exhaustive-deps */
import { EmptyRes, SerProItem } from "components/Layout";
import { AppContext } from "context/AppProvider";
import { CategoryService } from "interface/category";
import { IOrganization } from "interface/organization";
import { Service } from "interface/service";
import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDeviceMobile, useSwrInfinite } from "hooks";
import { paramsServicesOrg } from 'params-query'
import API_ROUTE from "api/_api";
import { useHistory, useLocation } from "react-router-dom";
import { LoadGrid } from "components/LoadingSketion";
import { extraParamsUrl } from "utils";
import { useGetServiceCateOrgQuery } from "redux-toolkit-query/hook-org";

interface IProps {
    org: IOrganization;
}

export function OrgServices(props: IProps) {
    const history = useHistory()
    const location = useLocation()
    const IS_MB = useDeviceMobile();
    const { t } = useContext(AppContext);
    const paramsUrl = extraParamsUrl()
    const cate_id = paramsUrl?.cate_id
    const { org } = props;
    const handleChooseCate = (id: any) => {
        history.replace({
            pathname: location.pathname,
            search: id ? `cate_id=${id}` : ''
        })
    }
    const { data } = useGetServiceCateOrgQuery(org.id)
    const categories: CategoryService[] = data ?? []
    const { resData, totalItem, onLoadMore } = useSwrInfinite(org?.id, API_ROUTE.ORG_SERVICES(org?.id), {
        ...paramsServicesOrg,
        "filter[service_group_id]": cate_id
    })
    const services: Service[] = resData ?? []
    const onViewMore = () => {
        if (services.length >= 15 && services.length < totalItem) {
            onLoadMore()
        }
    };
    return (
        <div className="org-services-cnt">
            {categories &&
                categories.filter((e: CategoryService) => e.services_count > 0).length >
                0 && (
                    <div className="org-services-cnt__left">
                        <ul className="cates-list">
                            <li
                                onClick={() => handleChooseCate(null)}
                                style={!cate_id ?
                                    {
                                        color: "var(--bgWhite)",
                                        backgroundColor: "var(--purple)",
                                    } : {}
                                }
                                className="cate-list__item"
                            >
                                <span
                                    style={
                                        !cate_id
                                            ? {
                                                color: "var(--bgWhite)",
                                            }
                                            : {}
                                    }
                                    className="cate-list__item-title"
                                >
                                    {t("cart.all")}
                                </span>
                            </li>
                            {categories
                                .filter((i: CategoryService) => i.services_count > 0)
                                .map((item: CategoryService, index: number) => (
                                    <li
                                        style={
                                            (cate_id && parseInt(cate_id) === item.id)
                                                ? {
                                                    color: "#fff",
                                                    backgroundColor:
                                                        "var(--purple)",
                                                }
                                                : {}
                                        }
                                        onClick={() =>
                                            handleChooseCate(item.id)
                                        }
                                        className="cate-list__item"
                                        key={index}
                                    >
                                        <span
                                            style={
                                                (cate_id && parseInt(cate_id) === item.id)
                                                    ? {
                                                        color: "#fff",
                                                    }
                                                    : {}
                                            }
                                            className="cate-list__item-title"
                                        >
                                            {item.name}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}

            <div className="org-services-cnt__right">
                {totalItem === 0 && <EmptyRes title='Không có dịch vụ phù hợp!' />}
                <InfiniteScroll
                    dataLength={services.length}
                    hasMore={true}
                    next={onViewMore}
                    loader={<></>}
                >
                    <ul className="org-services-cnt__right-list">
                        {services.map((item: Service, index: number) => (
                            <li key={index}>
                                <SerProItem changeStyle={IS_MB} org={org} item={item} type="SERVICE" />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
                {services.length < totalItem && <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />}
            </div>
        </div>
    );
}
