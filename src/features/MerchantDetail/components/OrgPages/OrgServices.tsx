/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrganization } from "../../../../interface/organization";
import {
    fetchAsyncCateServices,
    fetchAsyncServices,
    onChooseCateServices,
    clearServices,
} from "../../../../redux/org_services/orgServivesSlice";
import { Service } from "../../../../interface/service";
import OrgServiceItem from "./OrgServiceItem";
import { STATUS } from "../../../../redux/status";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppContext } from "../../../../context/AppProvider";
import EmptyRes from '../../../EmptyRes';
interface IProps {
    org: IOrganization;
}

function OrgServices(props: IProps) {
    const dispatch = useDispatch();
    const { t } = useContext(AppContext)
    const { CATE, SERVICES, choose_cate, org_id } = useSelector(
        (state: any) => state.ORG_SERVICES
    );
    const { categories, status } = CATE;
    const { services, page, totalItem, status_ser } = SERVICES;
    const { org } = props;
    const callServicesCate = () => {
        if (org_id !== org?.id || status !== STATUS.SUCCESS) {
            dispatch(onChooseCateServices(null))
            dispatch(fetchAsyncCateServices(org?.id));
        }
    };
    const callServicesOrg = () => {
        if (org_id !== org?.id || status_ser !== STATUS.SUCCESS) {
            console.log(org)
            const values = {
                org_id: org?.id,
                page: 1,
                cate_id: choose_cate,
                isEnable: org?.is_momo_ecommerce_enable && true
            };
            dispatch(clearServices());
            dispatch(fetchAsyncServices(values));
        }
    };
    useEffect(() => {
        callServicesOrg();
        callServicesCate();
    }, []);
    const handleChooseCate = (id: any) => {
        const values = {
            org_id: org?.id,
            page: 1,
            cate_id: id,
            isEnable: org?.is_momo_ecommerce_enable && true
        };
        dispatch(clearServices());
        dispatch(onChooseCateServices(id));
        dispatch(fetchAsyncServices(values));
    };
    const onViewMore = () => {
        if (totalItem >= 15 && services.length < totalItem) {
            const values = {
                org_id: org?.id,
                page: page + 1,
                cate_id: choose_cate,
                isEnable: org?.is_momo_ecommerce_enable && true
            };
            dispatch(fetchAsyncServices(values));
        }
    };

    return (
        <div className="org-services-cnt">
            {
                totalItem > 0 && (
                    (categories && categories.filter((e:any) => e.services_count > 0).length > 0)
                    &&
                    <div className="org-services-cnt__left">
                        <ul className="cates-list">
                            <li
                                onClick={() => handleChooseCate(null)}
                                style={
                                    !choose_cate
                                        ? {
                                            color: "var(--bgWhite)",
                                            backgroundColor: "var(--purple)",
                                        }
                                        : {}
                                }
                                className="cate-list__item"
                            >
                                <span
                                    style={
                                        !choose_cate
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
                            {
                                categories
                                    .filter((i: any) => i.services_count > 0)
                                    .map((item: any, index: number) => (
                                        <li
                                            style={
                                                choose_cate === item.id
                                                    ? {
                                                        color: "#fff",
                                                        backgroundColor: "var(--purple)",
                                                    }
                                                    : {}
                                            }
                                            onClick={() => handleChooseCate(item.id)}
                                            className="cate-list__item"
                                            key={index}
                                        >
                                            <span
                                                style={
                                                    choose_cate === item.id
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
                )
            }
            <div className="org-services-cnt__right">
                {
                    (totalItem > 0 && status === STATUS.SUCCESS)
                        ?
                        <InfiniteScroll
                            dataLength={services.length}
                            hasMore={true}
                            next={onViewMore}
                            loader={<></>}
                        >
                            <ul className="org-services-cnt__right-list">
                                {services.map((item: Service, index: number) => (
                                    <li key={index}>
                                        <OrgServiceItem org={org} service={item} />
                                    </li>
                                ))}
                            </ul>
                        </InfiniteScroll>
                        :
                        <EmptyRes title='Không có dịch vụ phù hợp!' />
                }
            </div>
        </div>
    );
}

export default OrgServices;
