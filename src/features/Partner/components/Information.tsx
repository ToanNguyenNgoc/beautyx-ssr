import React, { useContext } from "react";
import img from "../../../constants/img";
import { partnerStyle } from "../style";
import { AppContext } from "../../../context/AppProvider";

export default function Information() {
    const parner = partnerStyle();
    const { t } = useContext(AppContext);
    return (
        <div className={parner.partnerInfor}>
            <h1 className={parner.partnerTitle}>
                Booking Platform BeautyX {t("partner.online_business")}
            </h1>
            <div className={parner.parnerImg}>
                <img src={img.Partner} alt="" />
            </div>
            <div className={parner.partnerDesc}>
                <p style={{ whiteSpace: "pre-line" }}>{t("partner.intro")}</p>
            </div>
            <div className={parner.partnerList}>
                <ul className={parner.partnerItem}>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.sell_products")}
                    </li>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.customers")}
                    </li>
                </ul>
                <ul className={parner.partnerItem}>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.regional")}
                    </li>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.support")}
                    </li>
                </ul>
                <ul className={parner.partnerItem}>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.simplify")}
                    </li>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.a_place")}
                    </li>
                </ul>
                <ul className={parner.partnerItem}>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.create")}
                    </li>
                    <li>
                        <span style={{ fontWeight: "normal" }}>📌 </span>
                        {t("partner.create_a_beauty")}
                    </li>
                </ul>
            </div>
        </div>
    );
}
