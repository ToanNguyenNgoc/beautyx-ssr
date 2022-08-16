import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import { AppContext } from "../../context/AppProvider";
import { extraOrgTimeWork } from "../../features/MerchantDetail/components/Functions/extraOrg";
import OrgReviews from "../../features/MerchantDetail/components/OrgPages/OrgReviews";
import {
    fetchOrgGalleries,
    onDeleteFavoriteOrg,
    onFavoriteOrg,
} from "../../redux/org/orgSlice";
import onErrorImg from "../../utils/errorImg";

interface IProps {
    org: any;
    openDetail: any;
    setOpenDetail: any;
}

export default function MapOrgItemDetail(props: IProps) {
    const { org, setOpenDetail, openDetail } = props;
    const { t } = useContext(AppContext);
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const refDetail: any = useRef();
    const refHead: any = useRef();
    const refListTimeWorks = useRef<any>();
    const galleries = useSelector((state: any) => state.ORG.GALLERIES);
    // time open ORG
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
    // close time open ORG

    const handleOpenSelector = () => {
        refListTimeWorks.current.classList.toggle("org-time-work__list-active");
    };

    const handleGotoOrg = () => {
        history.push({
            pathname: `/org/${org.subdomain}`,
            state: org,
        });
    };

    const handleFolower = async () => {
        if (USER) {
            if (org.is_favorite === false) {
                await dispatch(onFavoriteOrg(org));
            } else {
                await dispatch(onDeleteFavoriteOrg(org));
            }
        } else {
            history.push("/sign-in");
        }
    };

    const handleScrollActive = () => {
        if (refDetail && refDetail?.current) {
            refDetail?.current.addEventListener(
                "scroll",
                function () {
                    const scrolled = refDetail?.current.scrollTop;
                    if (refHead?.current) {
                        refHead?.current.classList.toggle(
                            "head-active",
                            scrolled > 80
                        );
                    }
                },
                false
            );
        }
    };

    useEffect(() => {
        handleScrollActive();
        org?.subdomain && dispatch(fetchOrgGalleries(org?.subdomain));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [org?.subdomain]);

    return (
        <>
            <div ref={refDetail} className="dialog-map__detail">
                {/* header */}
                <div ref={refHead} className="content-head">
                    <span className="content-head__name">{org?.name}</span>
                    <img
                        className="cursor-pointer"
                        onClick={() =>
                            setOpenDetail({
                                ...openDetail,
                                open: false,
                                check: false,
                            })
                        }
                        src={icon.x}
                        alt=""
                    />
                </div>
                {/* close header */}

                {/* content */}
                <div className="dialog-map__content">
                    {/* image */}
                    <div className="content-img">
                        <img
                            onError={(e) => onErrorImg(e)}
                            src={
                                galleries?.galleries[0]?.image_url
                                    ? galleries?.galleries[0]?.image_url
                                    : org?.image_url
                            }
                            alt=""
                        />
                    </div>
                    {/* close image */}

                    {/* info  */}
                    <div className="content-info">
                        <span className="content-info__name">{org?.name}</span>
                        <div className="map-item__evaluate">
                            <div className="evaluate-item">
                                <img src={icon.star} alt="" />
                                <p>5</p>
                            </div>
                            <div className="evaluate-item">
                                <img src={icon.cartCheckPurple} alt="" />
                                <p>10</p>
                            </div>
                            <div className="evaluate-item">
                                <img src={icon.heart} alt="" />
                                <p>{org?.favorites_count}</p>
                            </div>
                        </div>
                        <div className="content-info__wrapbtn">
                            <div
                                onClick={() => handleGotoOrg()}
                                className="content-info__btn"
                            >
                                <img src={icon.archive} alt="" />
                                <span>Xem spa</span>
                            </div>

                            <div
                                style={
                                    org?.is_favorite === true
                                        ? {
                                              backgroundColor: "var(--purple)",
                                          }
                                        : { backgroundColor: "#fff" }
                                }
                                onClick={handleFolower}
                                className="content-info__btn"
                            >
                                {org?.is_favorite === true ? (
                                    <>
                                        <span style={{ color: "#fff" }}>
                                            Đang theo dõi
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <img src={icon.rss} alt="" />
                                        <span>Theo dõi</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* close info  */}

                    {/* list info  */}
                    <div className="content-info__list">
                        <div className="content-info__item">
                            <div className="item-icon">
                                <img src={icon.pinMap} alt="" />
                            </div>
                            <span className="item-text">
                                {org?.full_address}
                            </span>
                        </div>
                        <div className="content-info__item">
                            <div className="item-icon">
                                <img src={icon.time} alt="" />
                            </div>
                            <div className="item-text flex-row">
                                <div>
                                    {time_works_today?.status && (
                                        <>
                                            {time_works_today?.status ===
                                            "on" ? (
                                                <p
                                                    style={{
                                                        color: "var(--green)",
                                                    }}
                                                >{`${t(
                                                    "detail_item.open"
                                                )}`}</p>
                                            ) : (
                                                <p
                                                    style={{
                                                        color: "var(--red_2)",
                                                    }}
                                                >{`${t(
                                                    "detail_item.close"
                                                )}`}</p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="org-time-work__right">
                                    <div
                                        onClick={() => handleOpenSelector()}
                                        className="flex-row-sp org-time-work__right-list"
                                    >
                                        {time_works_today?.from_time_opening} -{" "}
                                        {time_works_today?.to_time_opening}
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
                                            (item: any, index: number) => (
                                                <li
                                                    style={
                                                        index + 2 === today
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
                                                        {item?.to_time_opening}
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="content-info__item">
                            <div className="item-icon">
                                <img src={icon.Check} alt="" />
                            </div>
                            <span className="item-text">Đã xác minh</span>
                        </div>
                    </div>
                    {/* close info */}

                    {/* rating */}
                    <div className="content-info__rating">
                        <OrgReviews org={org} isMapReview={true} />
                    </div>
                    {/* close rating */}
                </div>
                {/* close content */}
            </div>
        </>
    );
}
