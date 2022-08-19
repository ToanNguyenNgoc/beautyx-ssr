import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extraParamsUrl } from "../../../utils/extraParamsUrl";
import { STATUS } from "../../../redux/status";
import { Service } from "../../../interface/service";
import ServiceItem from "../../ViewItemCommon/ServiceItem";
import { fetchAsyncServicesRec } from "../../../redux/org_services/serviceSlice";
import { AppContext } from "../../../context/AppProvider";

function DetailRecommend(props: any) {
    const params: any = extraParamsUrl();
    const { org } = props;
    const dispatch = useDispatch();
    const { SERVICE, SERVICES_REC } = useSelector(
        (state: any) => state.SERVICE
    );
    const curService = SERVICE.service

    const { t } = useContext(AppContext);

    const callServicesRecommend = () => {
        if (SERVICE.status === STATUS.SUCCESS) {
            if (
                SERVICES_REC.cate_id !== SERVICE.service.category?.id ||
                SERVICES_REC.status !== STATUS.SUCCESS
            ) {
                const values = {
                    page: 1,
                    org_id: params.org,
                    cate_id: SERVICE.service.category?.id,
                    isEnable: org?.is_momo_ecommerce_enable && true,
                };
                dispatch(fetchAsyncServicesRec(values));
            }
        }
    };
    useEffect(() => {
        callServicesRecommend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SERVICE.status]);
    return (
        <div className="detail-recommend">
            {SERVICES_REC.services.filter((e: any) => e.id !== curService.id).length>0&&
            <>
            <div className="detail-recommend__title">{`${t(
                "detail_item.similar_service"
            )}`}</div>
            <ul className="detail-recommend__list">
                {SERVICES_REC.services.filter((e: any) => e.id !== curService.id).map((item: Service, index: number) => (
                    <li key={index}>
                        <ServiceItem service={item} org={org} />
                    </li>
                ))}
            </ul>
            </>
            }
        </div>
    );
}

export default DetailRecommend;
