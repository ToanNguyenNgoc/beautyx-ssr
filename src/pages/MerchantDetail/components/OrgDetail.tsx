import React, { useContext, useRef, useState } from "react";
import { Container } from "@mui/material";
import Slider from "react-slick";
// import PopupDetailContact from "./PopupDetailContact";
import { extraOrgTimeWork, IOrgTimeWork } from "../Functions/extraOrg";
import { IOrgMobaGalleries, IOrganization } from 'interface'
import { OrgItemMap } from "components/Layout/OrgItemMap";
import { AppContext } from "context/AppProvider";
import { onErrorImg } from "utils";
import icon from "constants/icon";
import { useFavorite } from "hooks";
import img from "constants/img";
import { useHistory } from "react-router-dom";

interface IProps {
    org: IOrganization;
    galleries: IOrgMobaGalleries[]
}

function OrgDetail(props: IProps) {
    const { org, galleries } = props;
    const { favoriteSt, onToggleFavorite } = useFavorite({
        id: org.id,
        org_id: org.id,
        type: 'ORG',
        count: org.favorites_count,
        favorite: org.is_favorite
    })
    const { t } = useContext(AppContext) as any;
    const history = useHistory()
    const onContact = () => history.push(`/chat`)
    const [openPopupMap, setOpenPopupMap] = useState(false);
    const orgTimes = extraOrgTimeWork(org?.opening_time);
    const orgTimeToday = orgTimes?.find(i => i.todayAct)
    const refListTimeWorks = useRef<HTMLUListElement>(null);
    const onOpenTime = () => {
        refListTimeWorks.current?.classList.add("org-time-work__list-active");
    };
    const onCloseTime = () => refListTimeWorks.current?.classList.remove("org-time-work__list-active");
    window.onclick = () => onCloseTime()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    swipe: true,
                    dots: true,
                    speed: 100,
                },
            },
        ],
    };
    const handleOpenMap = () => {
        setOpenPopupMap(true);
    };
    return (
        <div className="org-detail">
            {
                org &&
                <OrgItemMap
                    open={openPopupMap}
                    setOpen={setOpenPopupMap}
                    org={org}
                />
            }
            <Container>
                <div className="org-detail__cnt">
                    <div className="org-detail__cnt-top">
                        <Slider {...settings}>
                            {galleries.length === 0 &&
                                (
                                    <div className="org-detail__banner-de">
                                        <div className="org-detail__banner-de__item">
                                            <div className="back-drop">
                                                <img
                                                    style={{ width: "100%" }}
                                                    src={org?.image_url ?? img.imgDefault}
                                                    alt=""
                                                    className="back-drop__img"
                                                    onError={(e) => onErrorImg(e)}
                                                />
                                                <div className="banner-item__cnt">
                                                    <img
                                                        src={org?.image_url ?? img.imgDefault}
                                                        alt=""
                                                        className="banner-item__img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {galleries.map((item: IOrgMobaGalleries, index: number) => (
                                <div
                                    key={index}
                                    className="org-detail__banner-de"
                                >
                                    <div className="org-detail__banner-de__item">
                                        <div className="back-drop">
                                            <img
                                                src={item?.image_url ?? img.imgDefault}
                                                alt=""
                                                className="back-drop__img"
                                            />
                                            <div className="banner-item__cnt">
                                                <img
                                                    src={item?.image_url ?? img.imgDefault}
                                                    alt=""
                                                    className="banner-item__img"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="wrap-bot">
                        <div className="org-detail__cnt-bot">
                            <div className="left">
                                <div className="org-detail__info">
                                    <div className="flexX-gap-8">
                                        <div className="org-avatar">
                                            <img
                                                src={org?.image_url ?? img.imgDefault}
                                                onError={(e) => onErrorImg(e)}
                                                alt=""
                                            />
                                        </div>
                                        <div className="org-left-detail">
                                            <span className="org-left-detail__name">
                                                {org?.name}
                                            </span>
                                            <div className="flex-row ">
                                                <div className="flex-col org-des-cnt">

                                                    <div className="flexX-gap-4 org-left-detail__address">
                                                        <img
                                                            src={icon.mapPinRed}
                                                            alt=""
                                                            className="icon"
                                                        />
                                                        <span className="title">
                                                            {org?.full_address}
                                                        </span>
                                                    </div>
                                                    <div className="flexX-gap-8 org-left-detail__rate">
                                                        <div className="flexX-gap-4 org-left-detail__rate-item">
                                                            <img
                                                                src={icon.star}
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <span className="text">
                                                                4.5
                                                            </span>
                                                        </div>
                                                        <div className="flexX-gap-4 org-left-detail__rate-item">
                                                            <img
                                                                src={icon.heart}
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <span className="text">
                                                                {favoriteSt.favorite_count}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={(e) => {
                                                        handleOpenMap();
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    className="re-change-map"
                                                >
                                                    <img
                                                        src={icon.mapMarkerOrg}
                                                        alt=""
                                                    />
                                                    <span className="re-change-map-text">
                                                        {t("pr.map")}
                                                    </span>
                                                    {org?.branches.length > 0 ? (
                                                        <>
                                                            <span className="re-change-map-total">
                                                                {org?.branches.length}{" "}
                                                                CN
                                                            </span>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="org-mess-flo">
                                        <div
                                            className="org-mess"
                                            style={favoriteSt.is_favorite ? {
                                                backgroundColor: "#e64d4a",
                                                border: "1px solid #e64d4a",
                                            } : {}}
                                            onClick={onToggleFavorite}
                                        >
                                            <span
                                                style={favoriteSt ? { color: "#fff", } : {}}
                                            >
                                                {favoriteSt?.is_favorite ? t("Mer_de.flowing") : t("Mer_de.flow")}
                                            </span>
                                        </div>
                                        <div
                                            className="org-flo"
                                            onClick={onContact}
                                        >
                                            <span> {t("Mer_de.contact")}</span>
                                        </div>
                                    </div>
                                    <div className="org-time-work">
                                        <div className="flexX-gap-4 org-time-work__left">
                                            <img
                                                src={icon.Clock_purple}
                                                alt=""
                                                className="icon"
                                            />
                                            <span className="title">
                                                {t("Mer_de.time_work")}{" "}
                                                {orgTimeToday?.day_week ?? ''}:
                                            </span>
                                        </div>
                                        <div className="flex-row org-time-work__right">
                                            <div
                                                onClick={(e) => {
                                                    onOpenTime();
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                className="flex-row-sp org-time-work__right-list"
                                            >
                                                {orgTimeToday?.from_time_opening}{" "}-{" "}
                                                {orgTimeToday?.to_time_opening}
                                                <img src={icon.arrowDownPurple} alt="" />
                                            </div>
                                            {/* selector time_works_today */}
                                            <ul
                                                ref={refListTimeWorks}
                                                className="org-time-work__list"
                                            >
                                                {orgTimes?.map((item: IOrgTimeWork, index: number) => (
                                                    <li
                                                        style={item.todayAct ? { color: "var(--purple)" } : {}}
                                                        key={index}
                                                        className="flex-row org-time-list__item"
                                                    >
                                                        <span className="org-time-list__left">
                                                            {item.day_week}
                                                        </span>
                                                        <div className="org-time-list__right">
                                                            {item?.from_time_opening}{" "}-{" "}
                                                            {item?.to_time_opening}
                                                        </div>
                                                    </li>
                                                )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <button
                                    style={favoriteSt.is_favorite ? {
                                        backgroundColor: "var(--purple)",
                                        color: "var(--bgWhite)",
                                    } : {}}
                                    onClick={onToggleFavorite}
                                >
                                    {favoriteSt?.is_favorite ? t("Mer_de.flowing") : t("Mer_de.flow")}
                                </button>
                                <br />
                                <button
                                    onClick={onContact}
                                >
                                    {t("Mer_de.contact")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {/* <PopupDetailContact
                org={org}
                openPopupContact={openPopupContact}
                setOpenPopupContact={setOpenPopupContact}
            /> */}
        </div>
    );
}

export default OrgDetail;
