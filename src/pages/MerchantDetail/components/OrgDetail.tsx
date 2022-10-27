import React, { useContext, useRef, useState } from "react";
import { Container, Drawer } from "@mui/material";
import onErrorImg from "../../../utils/errorImg";
import icon from "../../../constants/icon";
import Slider from "react-slick";
import {
    onActiveTab,
    onDeleteFavoriteOrg,
    onFavoriteOrg,
} from "../../../redux/org/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PopupDetailContact from "./PopupDetailContact";
import { extraOrgTimeWork } from "../Functions/extraOrg";
import { AppContext } from "../../../context/AppProvider";
// import { onToggleOpenChat } from "../../../redux/chat/chatOrgSlice";
import { OrgMapFull } from "../../../features/Map/MapWarraper/WrapperMap";

import { IOrgMobaGalleries, IOrganization } from 'interface'
import IStore from "interface/IStore";

interface IProps {
    org: IOrganization;
    galleries: IOrgMobaGalleries[]
}

function OrgDetail(props: IProps) {
    const { org, galleries } = props;
    const org_redux = useSelector((state:IStore) => state.ORG.org)
    const { t } = useContext(AppContext);
    const { totalItem } = useSelector((state: any) => state.ORG_COMMENTS);
    const dispatch = useDispatch();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const [openPopupContact, setOpenPopupContact] = useState(false);
    const [open, setOpen] = useState(false);
    const [openPopupMap, setOpenPopupMap] = useState(false);
    // time works
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes = extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
    const refListTimeWorks = useRef<any>();
    const handleOpenSelector = () => {
        refListTimeWorks.current.classList.toggle("org-time-work__list-active");
    };

    // handle favorite Org
    const handleFavoriteOrg = () => {
        if (USER) {
            if (org_redux?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org_redux));
            } else {
                dispatch(onFavoriteOrg(org_redux));
            }
        } else {
            history.push("/sign-in?1");
        }
    };

    // setting slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        swipe: true,
        autoplaySpeed: 2000,
        //fade: true,
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

    const onActiveTabGallery = () => {
        dispatch(onActiveTab(7));
    };
    const handleOpenMap = () => {
        setOpenPopupMap(true);
    };
    // const onOpenChatOrg = () => {
    //     if (USER) {
    //         dispatch(onToggleOpenChat(true));
    //     } else {
    //         history.push("/sign-in?1");
    //     }
    // };
    return (
        <div className="org-detail">
            {
                org &&
                <OrgMapFull
                    open={openPopupMap}
                    setOpen={setOpenPopupMap}
                    org={org}
                />
            }
            <Container>
                <div className="org-detail__cnt">
                    <div
                        onClick={onActiveTabGallery}
                        className="org-detail__cnt-top"
                    >
                        <Slider {...settings}>
                            {galleries.length === 0 &&
                                (
                                    <div className="org-detail__banner-de">
                                        <div className="org-detail__banner-de__item">
                                            <div className="back-drop">
                                                <img
                                                    style={{ width: "100%" }}
                                                    src={org?.image_url}
                                                    alt=""
                                                    className="back-drop__img"
                                                    onError={(e) =>
                                                        onErrorImg(e)
                                                    }
                                                />
                                                <div className="banner-item__cnt">
                                                    <img
                                                        src={org?.image_url}
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
                                                src={item?.image_url}
                                                alt=""
                                                className="back-drop__img"
                                            />
                                            <div className="banner-item__cnt">
                                                <img
                                                    src={item?.image_url}
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
                                                src={org?.image_url}
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
                                                                src={icon.chatAll}
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <span className="text">
                                                                {totalItem}
                                                            </span>
                                                        </div>
                                                        <div className="flexX-gap-4 org-left-detail__rate-item">
                                                            <img
                                                                src={icon.heart}
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <span className="text">
                                                                {org_redux?.favorites_count}
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
                                            style={
                                                org_redux?.is_favorite
                                                    ? {
                                                        backgroundColor:
                                                            "#e64d4a",
                                                        border: "1px solid #e64d4a",
                                                    }
                                                    : {}
                                            }
                                            onClick={handleFavoriteOrg}
                                        >
                                            <span
                                                style={
                                                    org_redux?.is_favorite
                                                        ? {
                                                            color: "#fff",
                                                        }
                                                        : {}
                                                }
                                            >
                                                {org_redux?.is_favorite
                                                    ? t("Mer_de.flowing")
                                                    : t("Mer_de.flow")}
                                            </span>
                                        </div>
                                        {/* <div
                                            onClick={() => onOpenChatOrg()}
                                            className="org-flo"
                                        >
                                            <span>Nhắn tin</span>
                                        </div> */}
                                        <div
                                            className="org-flo"
                                            onClick={() => {
                                                setOpenPopupContact(true);
                                            }}
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
                                                {time_works_today?.day_week}:
                                            </span>
                                        </div>
                                        <div className="flex-row org-time-work__right">
                                            <div
                                                onClick={() =>
                                                    handleOpenSelector()
                                                }
                                                className="flex-row-sp org-time-work__right-list"
                                            >
                                                {
                                                    time_works_today?.from_time_opening
                                                }{" "}
                                                -{" "}
                                                {
                                                    time_works_today?.to_time_opening
                                                }
                                                <img
                                                    src={icon.arrowDownPurple}
                                                    alt=""
                                                />
                                            </div>
                                            {/* selector time_works_today */}
                                            <ul
                                                ref={refListTimeWorks}
                                                className="org-time-work__list"
                                            >
                                                {orgTimes?.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => (
                                                        <li
                                                            style={
                                                                index + 2 ===
                                                                    today
                                                                    ? {
                                                                        color: "var(--purple)",
                                                                    }
                                                                    : {}
                                                            }
                                                            key={index}
                                                            className="flex-row org-time-list__item"
                                                        >
                                                            <span className="org-time-list__left">
                                                                {item.day_week}
                                                            </span>
                                                            <div className="org-time-list__right">
                                                                {
                                                                    item?.from_time_opening
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    item?.to_time_opening
                                                                }
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
                                    style={
                                        org_redux?.is_favorite
                                            ? {
                                                backgroundColor:
                                                    "var(--purple)",
                                                color: "var(--bgWhite)",
                                            }
                                            : {}
                                    }
                                    onClick={handleFavoriteOrg}
                                >
                                    {org_redux?.is_favorite
                                        ? t("Mer_de.flowing")
                                        : t("Mer_de.flow")}
                                </button>
                                <br />
                                <button
                                    onClick={() => {
                                        setOpenPopupContact(true);
                                    }}
                                >
                                    {t("Mer_de.contact")}
                                </button>
                                {/* <button onClick={onOpenChatOrg}>Chat</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <PopupDetailContact
                org={org}
                openPopupContact={openPopupContact}
                setOpenPopupContact={setOpenPopupContact}
            />
            <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)}>
                <div className="se-branch__drawer">
                    <p className="se-branch__title">
                        {t("Mer_de.list_branch")}
                    </p>
                    <div className="se-branch__list">
                        {org?.branches.map((item: any, index: number) => (
                            <div key={index} className="se-branch__item">
                                <div>
                                    <div className="branch-item__top">
                                        <div className="item-top__distance">
                                            <img src={icon.mapPinRed} alt="" />
                                            <span>3km</span>
                                        </div>
                                        <div className="item-top__name">
                                            <p>{item?.name}</p>
                                        </div>
                                    </div>
                                    <div className="branch-item__bottom">
                                        <div className="item-bottom__address">
                                            <p>{item?.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        setOpenPopupMap(true);
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className="branch-item__pinmap"
                                >
                                    <img src={icon.mapMarkerOrg} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default OrgDetail;
