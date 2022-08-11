import React, { useContext, useRef, useState } from "react";
import { IOrganization } from "../../../../interface/organization";
import Slider from "react-slick";
import onErrorImg from "../../../../utils/errorImg";
import icon from "../../../../constants/icon";
import WrapperMap from "../../../Map/MapWarraper/WrapperMap";
import { extraOrgTimeWork } from "../Functions/extraOrg";
import OrgMapWrapper from "../OrgMap/OrgMapWrapper";
import { AppContext } from "../../../../context/AppProvider";

interface IProps {
    org: IOrganization;
    refMap?: any;
}
const day = new Date();
const today = day.getDay() + 1;

function OrgInformation(props: IProps) {
    const { org, refMap } = props;
    const { t } = useContext(AppContext);
    const branchesCntRef = useRef<any>();
    const sliderRef = useRef<any>();
    const [branch, setBranch] = useState<any>(org?.branches[0] || org);
    const settings = {
        className: "map-org-detail__slide",
        arrows: false,
    };
    const [openPopupSeemoreMap, setOpenPopupSeemoreMap] = useState(false);
    const onDropBranches: any = () => {
        branchesCntRef.current.classList.toggle("branches-list-cnt__drop");
    };
    const handleSetBranch = (item: any, index: number) => {
        setBranch(item);
        onDropBranches();
        sliderRef?.current?.slickGoTo(index + 1);
    };
    const orgTimes = extraOrgTimeWork(org?.opening_time);

    return (
        <div className="org-information" ref={refMap}>
            <div className="org-information__map-cnt">
                <div className="map-cnt">
                    <WrapperMap
                        lat={org.latitude}
                        long={org.longitude}
                    />
                </div>
                <div className="map-org__seemore">
                    <p
                        onClick={() => {
                            setOpenPopupSeemoreMap(true);
                        }}
                    >
                        {t("trending.watch_all")}
                    </p>
                </div>
                <div className="map-org-detail">
                    <Slider {...settings} ref={sliderRef}>
                        <div className="map-org-detail__item">
                            <img
                                onError={(e) => onErrorImg(e)}
                                src={org?.image_url}
                                alt=""
                                className="branch-avatar"
                            />
                            <div className="branch-detail">
                                <span className="name">{org?.name}</span>
                                <div className="flex-row address">
                                    <img
                                        src={icon.mapPinRed}
                                        alt=""
                                        className="icon"
                                    />
                                    <span className="address-text">
                                        {org?.address
                                            ? org?.address
                                            : org?.full_address}
                                    </span>
                                </div>
                                <div className="flex-row rate">
                                    <div className="flex-row rate-item">
                                        <img
                                            src={icon.star}
                                            alt=""
                                            className="icon"
                                        />
                                        <div className="rate-item__text">
                                            5 +
                                        </div>
                                    </div>
                                    <div className="flex-row rate-item">
                                        <img
                                            src={icon.cartCheckPurple}
                                            alt=""
                                            className="icon"
                                        />
                                        <div className="rate-item__text">
                                            1222 +
                                        </div>
                                    </div>
                                    <div className="flex-row rate-item">
                                        <img
                                            src={icon.heart}
                                            alt=""
                                            className="icon"
                                        />
                                        <div className="rate-item__text">
                                            {org?.favorites_count} +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {org?.branches.map((item: any, index: number) => (
                            <div key={index} className="map-org-detail__item">
                                <img
                                    onError={(e) => onErrorImg(e)}
                                    src={
                                        item?.image
                                            ? item?.image_url
                                            : org?.image_url
                                    }
                                    alt=""
                                    className="branch-avatar"
                                />
                                <div className="branch-detail">
                                    <span className="name">{item?.name}</span>
                                    <div className="flex-row address">
                                        <img
                                            src={icon.mapPinRed}
                                            alt=""
                                            className="icon"
                                        />
                                        <span className="address-text">
                                            {item?.address}
                                        </span>
                                    </div>
                                    <div className="flex-row rate">
                                        <div className="flex-row rate-item">
                                            <img
                                                src={icon.star}
                                                alt=""
                                                className="icon"
                                            />
                                            <div className="rate-item__text">
                                                122 +
                                            </div>
                                        </div>
                                        <div className="flex-row rate-item">
                                            <img
                                                src={icon.cartCheckPurple}
                                                alt=""
                                                className="icon"
                                            />
                                            <div className="rate-item__text">
                                                122 +
                                            </div>
                                        </div>
                                        <div className="flex-row rate-item">
                                            <img
                                                src={icon.heart}
                                                alt=""
                                                className="icon"
                                            />
                                            <div className="rate-item__text">
                                                122 +
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            {org?.branches?.length > 0 && (
                <div className="org-information__branches">
                    <span className="title">{t("Mer_de.branch")}</span>
                    <div ref={branchesCntRef} className="branches-list-cnt">
                        <ul className="list">
                            <li
                                onClick={onDropBranches}
                                style={{ color: "var(--text-black)" }}
                                className="list-item"
                            >
                                {branch?.full_address}
                            </li>
                            {org?.branches
                                .filter((i: any) => i?.id !== branch?.id)
                                .map((item: any, index: number) => (
                                    <li
                                        onClick={() =>
                                            handleSetBranch(item, index)
                                        }
                                        key={index}
                                        className="list-item"
                                    >
                                        {item?.full_address}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
            <div className="org-information__branches">
                <div className="title">{t("Mer_de.business_hours")}</div>
                <ul className="org-time-list">
                    {orgTimes.map((item: any, index: number) => (
                        <li
                            style={
                                index + 2 === today
                                    ? { color: "var(--text-black)" }
                                    : {}
                            }
                            key={index}
                            className="flex-row org-time-list__item"
                        >
                            <span className="org-time-list__left">
                                {item.day_week}
                            </span>
                            <div className="org-time-list__right">
                                {item?.from_time_opening} -{" "}
                                {item?.to_time_opening}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="org-information__branches">
                <div className="title">{t("Mer_de.about")}</div>
                <div className="org-information__about">
                    {
                        org.description ||
                        (`Thành lập năm 2018, ${org?.name} là thương hiệu uy tín hàng
                    đầu trong ngành công nghệ spa, với thiết bị máy móc hiện đại
                    đội ngũ nhân sự có tay nghề được đào tạo bài bản`)
                    }
                </div>
            </div>
            <div className="org-information__branches">
                <div className="title">{t("Mer_de.utilities")}</div>
                <ul className="org-information-utils">
                    <li className="flex-row utils-item">
                        <img src={icon.carBlack} alt="" className="icon" />
                        <span>{t("detail_item.parking")}</span>
                    </li>
                    <li className="flex-row utils-item">
                        <img src={icon.wifiBlack} alt="" className="icon" />
                        <span>Wifi</span>
                    </li>
                    <li className="flex-row utils-item">
                        <img
                            src={icon.creditCardBlack}
                            alt=""
                            className="icon"
                        />
                        <span>{t("detail_item.accept_card_payment")}</span>
                    </li>
                </ul>
            </div>
            <OrgMapWrapper
                open={openPopupSeemoreMap}
                setOpen={setOpenPopupSeemoreMap}
                org={org}
            />
        </div>
    );
}

export default OrgInformation;
