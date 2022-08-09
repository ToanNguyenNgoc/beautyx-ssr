import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import MapTagsGoogle from "./MapGoogle";
import MapTagsOrgItem from "./MapOrgItem";
import { fetchAsyncOrgsByFilter } from "../../redux/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import MapTagsItemMB from "./MapItemMB";
import { IOrganization } from "../../interface/organization";
import MapOrgItemDetail from "./MapOrgItemDetail";
interface IProps {
    onChangeCardMap?: any;
    orgs: IOrganization[];
}

export default function MapContent(props: IProps) {
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const location = useLocation();
    const org: IOrganization = useSelector((state: any) => state.ORG.org);
    const dispatch = useDispatch();
    const { orgs, onChangeCardMap } = props;
    const slideRef = useRef<any>();
    const LOCATION = AUTH_LOCATION();
    const [openDetail, setOpenDetail] = useState({
        open: false,
        check: false,
    });
    const [local, setLocal] = useState<any>({
        lat: LOCATION ? parseFloat(LOCATION?.split(",")[0]) : orgs[0]?.latitude,
        long: LOCATION
            ? parseFloat(LOCATION?.split(",")[1])
            : orgs[0]?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    const { page, totalItem } = useSelector((state: any) => state.FILTER.ORGS);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
        if (
            openListOrg === false &&
            openDetail.open === false &&
            openDetail.check === true
        ) {
            setOpenDetail({
                ...openDetail,
                open: true,
            });
        } else {
            setOpenDetail({
                ...openDetail,
                open: false,
            });
        }
        if (
            openListOrg === false &&
            openDetail.open === true &&
            openDetail.check === true
        ) {
            setOpenDetail({
                ...openDetail,
                open: true,
            });
        }
    };
    const handleSetLocation = useCallback((cardMapItem: any) => {
        if (onChangeCardMap) {
            onChangeCardMap(cardMapItem);
        }
        setLocal({
            lat: cardMapItem?.latitude,
            long: cardMapItem?.longitude,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        orgs[0] &&
            setLocal({
                lat: LOCATION
                    ? parseFloat(LOCATION?.split(",")[0])
                    : orgs[0]?.latitude,
                long: LOCATION
                    ? parseFloat(LOCATION?.split(",")[1])
                    : orgs[0]?.longitude,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgs[0]]);

    const onViewMoreOrgs = () => {
        if (
            location.pathname === "/ban-do" &&
            totalItem >= 15 &&
            orgs.length < totalItem
        ) {
            dispatch(
                fetchAsyncOrgsByFilter({
                    page: page + 1,
                    sort: "distance",
                    path_url: location.pathname,
                })
            );
        }
    };

    const onGotoSlickOrgItem = (index: number) => {
        slideRef?.current?.slickGoTo(index);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "30px",
        className: "center",
        centerMode: true,
        afterChange: function (index: any) {
            handleSetLocation(orgs[index]);
        },
    };

    return (
        <div className="map-content">
            {/* map */}
            <MapTagsGoogle
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                loadingElement={<div style={{ height: `100%` }} />}
                zoom={16}
                org={orgs}
                location={local}
                containerElement={
                    <div
                        style={{
                            height: `100%`,
                            margin: `auto`,
                            width: `100%`,
                        }}
                    />
                }
                mapElement={<div style={{ height: `100%` }} />}
                onChangeCardMap={onChangeCardMap}
                setLocal={setLocal}
                onGotoSlickOrgItem={onGotoSlickOrgItem}
                setOpenDetail={setOpenDetail}
                openDetail={openDetail}
            />
            {/* close map */}

            {/* list map desktop */}
            <div
                className={
                    openListOrg === true
                        ? "dialog-map__wrapper list-org__active "
                        : "dialog-map__wrapper"
                }
                ref={refListOrg}
            >
                <div className="dialog-wrap__list">
                    {/* org list  */}
                    <div id="scrollableDiv" className="dialog-map__list">
                        <InfiniteScroll
                            hasMore={true}
                            loader={<></>}
                            next={onViewMoreOrgs}
                            dataLength={orgs.length}
                            scrollableTarget="scrollableDiv"
                        >
                            {orgs?.map((item: any, index: number) => (
                                <MapTagsOrgItem
                                    location={local}
                                    handleSetLocation={handleSetLocation}
                                    key={index}
                                    item={item}
                                    setOpenDetail={setOpenDetail}
                                    openDetail={setOpenDetail}
                                />
                            ))}
                        </InfiniteScroll>
                    </div>
                    {/* close org list */}

                    {/* org detail */}
                    {openDetail.open === true ? (
                        <MapOrgItemDetail
                            org={org}
                            setOpenDetail={setOpenDetail}
                            openDetail={openDetail}
                        />
                    ) : null}
                    {/* btn toggle open close list map org */}
                    <div
                        onClick={() => {
                            handleToggleListOrg();
                        }}
                        className="open-list__org close"
                    >
                        <img
                            src={
                                openListOrg === true
                                    ? icon.arrownLeftWhite
                                    : icon.arrownRightWhite
                            }
                            alt=""
                        />
                    </div>
                    {/* close toggle open close list map org */}
                </div>
                {/* close org detail */}
            </div>
            {/* close list map desktop */}

            {/* list map mobile */}
            <div className="map-list__mobile">
                <Slider ref={slideRef} {...settings}>
                    {orgs.map((item: any, index: number) => (
                        <MapTagsItemMB key={index} item={item} />
                    ))}
                </Slider>
            </div>
            {/* close list map mobile */}
        </div>
    );
}
