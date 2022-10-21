/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "../Head";
import { Container, Drawer, Tab } from "@mui/material";
import "./serviceDetail.css";
import HeadTitle from "../HeadTitle";
import Footer from "../Footer";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { useDispatch, useSelector } from "react-redux";
import ServiceDetailLeft from "./components/ServiceDetailLeft";
import ServiceDetailRight from "./components/ServiceDetailRight";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    fetchAsyncServiceDetail,
    fetchAsyncServiceCmt,
} from "../../redux/org_services/serviceSlice";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { STATUS } from "../../redux/status";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import Review from "../Reviews";
import icon from "../../constants/icon";
import DetailOrgCard from "./components/DetailOrgCard";
import useFullScreen from "../../utils/useDeviceMobile";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import DetailPolicy from "./components/DetailPolicy";
import DetailRecommend from "./components/DetailRecommend";
import { handleScroll, handleChangeScroll } from "./onScrollChange";
import ReviewsContainer from "../ReviewsContainer";
import PageNotFound from "../../components/PageNotFound";
import { useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { EXTRA_DETAIL_SERVICE } from "../../utils/extraDetail";
//import ServiceVideo from "./components/ServiceVideo";

// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../utils/dataLayer";
import LoadDetail from "../../components/LoadingSketion/LoadDetail";
import { Service } from "../../interface/service";
import IStore from "../../interface/IStore";
import { analytics, logEvent } from "../../firebase";
import { postHistoryView } from "../../user-behavior";
import ExtraFlatForm from "rootComponents/extraFlatForm";
import { OpenApp } from 'components/Layout'
// end

function ServiceDetail() {
    const { t } = useContext(AppContext);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const location = useLocation();
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const ORG = useSelector((state: IStore) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: IStore) => state.SERVICE);
    const params: any = extraParamsUrl();
    const history = useHistory();
    const is_mobile = useFullScreen();
    const service: Service = EXTRA_DETAIL_SERVICE(SERVICE.service);
    const org = ORG.org;
    const [open, setOpen] = useState({
        NOW: true,
        open: false,
    });
    const [openAllCmt, setOpenAllCmt] = useState(false);
    const handleOpenSeemoreCmt = () => {
        setOpenAllCmt(true);
    };
    const [value, setValue] = useState<any>(1);

    let tabs = [
        { id: 1, title: t("pr.description") },
        { id: 2, title: t("Mer_de.feedback") },
        { id: 3, title: t("my_ser.business") },
        { id: 4, title: t("se.instructions_terms") },
    ];

    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    let refPolicy = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const scrollPolicy = refPolicy?.current?.offsetTop;
    const [readMore, setReadMore] = useState(false);
    const handleSeemoreText = () => {
        setReadMore(!readMore);
    };
    // handle onclick active menu
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        const top = handleChangeScroll(
            is_mobile,
            value,
            setValue,
            refDesc,
            refReview,
            refMap,
            refPolicy
        );
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };
    // call api service detail
    const callServiceDetail = () => {
        if (
            parseInt(params.id) !== SERVICE.service.id ||
            SERVICE.org_id !== params.org ||
            SERVICE.status !== STATUS.SUCCESS
        ) {
            const values = {
                org_id: params.org,
                ser_id: params.id,
            };
            dispatch(fetchAsyncServiceDetail(values));
        }
    };
    // call api org detail
    const callOrgDetail = () => {
        if (
            parseInt(params.org) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org));
        }
    };
    // call api service comment
    const callServiceComments = () => {
        if (
            parseInt(params.id) !== COMMENTS.service_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "SERVICE",
                page: 1,
                id: params.id,
                org_id: params.org,
            };
            dispatch(fetchAsyncServiceCmt(values));
        }
    };
    useEffect(() => {
        let scroll = true;
        window.addEventListener("scroll", () => {
            if (scroll) {
                handleScroll(
                    is_mobile,
                    setValue,
                    scrollReview,
                    scrollDesc,
                    scrollMap,
                    scrollPolicy
                );
            }
        });
        return () => {
            scroll = false;
        };
    });
    const postAsyncWatched = async () => {
        await postHistoryView({ id: params.id, organization_id: params.org, type: "SERVICE" })
    }
    useEffect(() => {
        postAsyncWatched()
        GoogleTagPush(GoogleTagEvents.PROMOTION_LOAD);
        logEvent(analytics, "detail_service", {
            service: service.service_name,
            merchant: org.name,
        });
        callServiceDetail();
        callOrgDetail();
        callServiceComments();
    }, [params.id]);

    const handleBack = () => {
        history.goBack();
        //console.log(params)
        const values = {
            org_id: params.org,
            ser_id: params.id,
        };
        if (params.org && params.id) {
            dispatch(fetchAsyncServiceDetail(values));
        }
    };
    return (
        <>
            <ExtraFlatForm />
            {SERVICE.status === STATUS.LOADING && <LoadDetail />}
            {SERVICE.status === STATUS.FAIL && <PageNotFound />}
            {/* title page servive */}
            <HeadTitle
                title={
                    service?.service_name ? service.service_name : "Loading..."
                }
            />
            {IS_MB ? <HeadOrg onBackFunc={handleBack} org={org} /> : <Head />}
            {SERVICE.status === STATUS.SUCCESS && (
                <Container>
                    {/* service detail */}
                    <div className="service-detail">
                        {/* service head detail */}
                        <div className="service-detail__head">
                            <ServiceDetailLeft org={org} service={service} />
                            <ServiceDetailRight
                                org={org}
                                service={service}
                                NOW={open.NOW}
                                setValue={setValue}
                            />
                        </div>
                        {/* service body */}
                        <div className="service-detail__body">
                            {/* service tab detail */}
                            <div className="service-detail__tab">
                                {/* service tab menu */}
                                <TabContext value={value}>
                                    <TabList onChange={handleChange}>
                                        {tabs.map((item: any, i: number) => (
                                            <Tab
                                                key={i}
                                                label={item.title}
                                                value={item.id}
                                            />
                                        ))}
                                    </TabList>
                                    <div className="service-detail__tabitem">
                                        {/* description */}
                                        <TabPanel value={value}>
                                            {/* {service?.video && <ServiceVideo service={service} />} */}
                                            <div
                                                ref={refDesc}
                                                className="service-detail__description"
                                            >
                                                {service?.description.length ===
                                                    0 ? (
                                                    <div className="service-description-updating">
                                                        <span className="service-description">
                                                            {t(
                                                                "pr.description"
                                                            )}
                                                            {": "}
                                                            {t(
                                                                "detail_item.updating"
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {/* open description */}
                                                        <span className="service-description">
                                                            {t(
                                                                "pr.description"
                                                            )}
                                                            :{" "}
                                                            {service
                                                                ?.description
                                                                .length > 150 &&
                                                                readMore !== true
                                                                ? service?.description.slice(
                                                                    0,
                                                                    150
                                                                )
                                                                : service?.description}
                                                            {/* dots */}
                                                            {service
                                                                ?.description
                                                                .length > 150 &&
                                                                readMore === false
                                                                ? "..."
                                                                : " "}
                                                            {/* close dot  */}
                                                        </span>{" "}
                                                        {/* end description */}
                                                        {/* button read more */}
                                                        <span>
                                                            {service?.description &&
                                                                service
                                                                    ?.description
                                                                    .length >
                                                                150 && (
                                                                    <span
                                                                        onClick={() =>
                                                                            handleSeemoreText()
                                                                        }
                                                                        className="seemore-btn"
                                                                    >
                                                                        {readMore ===
                                                                            false
                                                                            ? "Xem thêm >> "
                                                                            : "Thu gọn <<"}
                                                                    </span>
                                                                )}
                                                        </span>
                                                        {/* end  button read more */}
                                                    </>
                                                )}
                                            </div>
                                        </TabPanel>

                                        {/* comment */}
                                        <TabPanel value={value}>
                                            <div
                                                ref={refReview}
                                                className="service-detail__comment"
                                            >
                                                <Review
                                                    comments={COMMENTS.comments}
                                                    totalItem={
                                                        COMMENTS.totalItem
                                                    }
                                                    commentable_type={"SERVICE"}
                                                    id={ORG.org?.id}
                                                    page={COMMENTS.page}
                                                    detail_id={service?.id}
                                                    openSeeMoreCmt={
                                                        handleOpenSeemoreCmt
                                                    }
                                                />
                                                {COMMENTS.comments &&
                                                    COMMENTS.comments.length >=
                                                    8 ? (
                                                    <div
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                        onClick={() => {
                                                            setOpenAllCmt(true);
                                                        }}
                                                        className="seemore-cmt"
                                                    >
                                                        <p>
                                                            {t(
                                                                "detail_item.see_more"
                                                            )}
                                                        </p>
                                                    </div>
                                                ) : null}
                                                <ReviewsContainer
                                                    open={openAllCmt}
                                                    setOpen={setOpenAllCmt}
                                                    comments={COMMENTS.comments}
                                                    org_id={ORG.org?.id}
                                                    totalItem={
                                                        COMMENTS.totalItem
                                                    }
                                                    page={COMMENTS.page}
                                                    commentable_type="SERVICE"
                                                />
                                            </div>
                                        </TabPanel>

                                        {/* org */}
                                        <TabPanel value={value}>
                                            <div
                                                ref={refMap}
                                                className="service-detail__org"
                                            >
                                                {ORG.status ===
                                                    STATUS.SUCCESS && (
                                                        <div>
                                                            <p className="service-detail__title">
                                                                {t(
                                                                    "detail_item.merchant"
                                                                )}
                                                            </p>
                                                            <div className="service-detail__org-mb">
                                                                <DetailOrgCard
                                                                    org={org}
                                                                />
                                                            </div>
                                                            <OrgInformation
                                                                org={org}
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                        </TabPanel>

                                        {/* policy */}
                                        <TabPanel value={value}>
                                            <div ref={refPolicy}>
                                                <DetailPolicy org={org} />
                                            </div>
                                        </TabPanel>
                                    </div>
                                </TabContext>
                            </div>
                            <DetailRecommend org={org} />
                        </div>
                        {/* service bottom buttom add cart */}
                        <div className="service-detail__bottom">
                            {service?.is_momo_ecommerce_enable &&
                                org?.is_momo_ecommerce_enable ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setOpen({ NOW: true, open: true });
                                        }}
                                        style={{
                                            backgroundColor: "var(--orange)",
                                        }}
                                    >
                                        <p>{t("se.booking_now")}</p>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOpen({ NOW: false, open: true });
                                        }}
                                        className="btn-addcart"
                                    >
                                        <img
                                            src={icon.ShoppingCartSimpleWhite}
                                            alt=""
                                        />
                                        <p>{t("pr.add_to_cart")}</p>
                                    </button>
                                    {/* drawer service detail */}
                                    <Drawer
                                        open={open.open}
                                        anchor="bottom"
                                        onClose={() =>
                                            setOpen({
                                                ...open,
                                                open: false,
                                            })
                                        }
                                    >
                                        <div className="active-mb">
                                            <div className="service-detail">
                                                <ServiceDetailRight
                                                    service={service}
                                                    org={org}
                                                    setOpenDrawer={setOpen}
                                                    NOW={open.NOW}
                                                />
                                            </div>
                                        </div>
                                    </Drawer>
                                </>
                            ) : (
                                <span className="detail-right__no">
                                    {t("se.off_service")}
                                </span>
                            )}
                        </div>
                    </div>
                </Container>
            )}
            {/* footer */}
            <Footer />
            <OpenApp
                type="service"
                item_id={params.id} org_id={params.org} id={params.id}
            />
        </>
    );
}

export default ServiceDetail;
