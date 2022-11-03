import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";

function DetailPolicy(props: any) {
    const { t } = useContext(AppContext);
    return (
        <div className="detailPolicy">
            {/* detail policy useguild */}
            <div className="detailPolicy-useguild">
                <div className="detailPolicy-useguild__top">
                    <p className="detailPolicy-useguild__title">
                        {t("detail_item.user_manual")}
                    </p>
                    <ul className="detailPolicy-useguild__list">
                        <li className="detailPolicy-useguild__item">
                            {t("detail_item.step_1")}
                        </li>
                        <li className="detailPolicy-useguild__item">
                            {t("detail_item.step_2")}
                        </li>
                        <li className="detailPolicy-useguild__item">
                            {t("detail_item.step_3")}
                        </li>
                    </ul>
                </div>
                <div className="detailPolicy-useGuild__bot">
                    <p>{t("detail_item.expiry_date")}</p>
                </div>
            </div>
            {/* detail policy mid */}
            <div className="detailPolicy-rules">
                <span>{t("detail_item.general_terms")}</span>
                <span>{t("detail_item.confirm")}</span>
                <span>{t("detail_item.confirm_desc")}</span>
                <span>{t("detail_item.cancellation_policy")}</span>
                <span>{t("detail_item.policy_desc")}</span>
            </div>
        </div>
    );
}

export default DetailPolicy;
