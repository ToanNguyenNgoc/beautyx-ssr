/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { shareLink } from "../../utils/formatUrlString";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Drawer } from "@mui/material";
import HeadTitle from "../HeadTitle";
import Head from "../Head";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { AppContext } from "../../context/AppProvider";
import { STATUS } from "../../redux/status";
import {
    fetchAsyncComboDetail,
    fetchAsyncCommentsCombo,
} from "../../redux/org_combos/comboSlice";
import ComboDetailLeft from "./components/ComboDetailLeft";
import ComboDetailRight from "./components/ComboDetailRight";
import Review from "../Reviews";
import "../../pages/ServiceDetail/serviceDetail.css";
import "./style.css";
import "../../pages/ProductDetail/product.css";
import icon from "../../constants/icon";
import DetailOrgCard from "../../pages/ServiceDetail/components/DetailOrgCard";
import HeadOrg from "../../pages/MerchantDetail/components/HeadOrg";
import {
    handleChangeScroll,
    handleScroll,
} from "../../pages/ServiceDetail/onScrollChange";
import DetailPolicy from "../../pages/ServiceDetail/components/DetailPolicy";
import ReviewsContainer from "../ReviewsContainer";
import useDeviceMobile from "../../utils/useDeviceMobile";
import ComboDetailDesc from "./components/ComboDetailDesc";
import { OrgInformation } from "pages/MerchantDetail/components/OrgPages";
import { useGetParamUrl } from "utils/useParamsUrl";

function ComboDetail() {
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const paramsUrl: any = shareLink();
    const paramsArr = useGetParamUrl();
    const params = {
        org_id: paramsUrl?.org_id ?? paramsArr[1],
        id: paramsUrl?.id ?? paramsArr[0]
    }
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { COMBO, COMMENTS } = useSelector((state: any) => state.COMBO);
    const is_mobile = useDeviceMobile();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>(1);
    const [openAllCmt, setOpenAllCmt] = useState(false);
    const handleOpenSeemoreCmt = () => {
        setOpenAllCmt(true);
    };

    let tabs = [
        { id: 1, title: t("pr.description") },
        { id: 2, title: t("detail_item.evaluate") },
        { id: 3, title: t("detail_item.merchant") },
        { id: 4, title: t("detail_item.tutorial_rules") },
    ];

    const org = ORG.org;
    const combo = COMBO.combo;
    console.log("combo", combo);
    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    let refPolicy = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const scrollPolicy = refPolicy?.current?.offsetTop;

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
    const callOrgDetail = () => {
        if (
            parseInt(params.org_id) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org_id));
        }
    };
    const callComboDetail = () => {
        if (
            parseInt(params.id) !== COMBO.combo.id ||
            COMBO.status !== STATUS.SUCCESS
        ) {
            const values = {
                com_id: params.id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncComboDetail(values));
        }
    };
    const callComboComments = () => {
        if (
            parseInt(params.id) !== COMMENTS.combo_id ||
            COMMENTS.status !== STATUS.SUCCESS
        ) {
            const values = {
                type: "TREATMENT_COMBO",
                page: 1,
                id: params.id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncCommentsCombo(values));
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                is_mobile,
                setValue,
                scrollReview,
                scrollDesc,
                scrollMap,
                scrollPolicy
            )
        );
        return () => {
            window.removeEventListener(
                "scroll",
                () =>
                    handleScroll(
                        is_mobile,
                        setValue,
                        scrollReview,
                        scrollDesc,
                        scrollMap,
                        scrollPolicy
                    ),
                false
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    useEffect(() => {
        callOrgDetail();
        callComboDetail();
        callComboComments();
    }, []);

    return (
        <div className="product">
            {IS_MB ? <HeadOrg org={org} /> : <Head />}
            <HeadTitle title={combo?.name ? combo?.name : "Loading..."} />
            <Container>
                <div className="service-detail">
                    <div className="service-detail__head">
                        <ComboDetailLeft org={org} combo={combo} />
                        <ComboDetailRight org={org} combo={combo} />
                    </div>
                    <div className="service-detail__body">
                        <div className="service-detail__tab">
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
                                    <TabPanel value={value}>
                                        <div
                                            ref={refDesc}
                                            className="service-detail__description"
                                        >
                                            {combo?.products?.length === 0 &&
                                                combo?.services?.length === 0 ? (
                                                <p>{`${t(
                                                    "detail_item.updating"
                                                )}`}</p>
                                            ) : (
                                                <ComboDetailDesc
                                                    combo={combo}
                                                    org={ORG?.org}
                                                />
                                            )}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div
                                            ref={refReview}
                                            className="service-detail__comment"
                                        >
                                            <Review
                                                comments={COMMENTS.comments}
                                                totalItem={COMMENTS.totalItem}
                                                commentable_type={
                                                    "TREATMENT_COMBO"
                                                }
                                                page={COMMENTS.page}
                                                id={ORG.org?.id}
                                                detail_id={combo?.id}
                                                openSeeMoreCmt={
                                                    handleOpenSeemoreCmt
                                                }
                                            />
                                            {COMMENTS.comments &&
                                                COMMENTS.comments.length >= 8 ? (
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
                                                    <p>{"Xem tất cả >>"}</p>
                                                </div>
                                            ) : null}
                                            <ReviewsContainer
                                                open={openAllCmt}
                                                setOpen={setOpenAllCmt}
                                                comments={COMMENTS.comments}
                                                org_id={ORG.org?.id}
                                                totalItem={COMMENTS.totalItem}
                                                page={COMMENTS.page}
                                                commentable_type="TREATMENT_COMBO"
                                            />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div
                                            ref={refMap}
                                            className="service-detail__org"
                                        >
                                            {ORG.status === STATUS.SUCCESS && (
                                                <>
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
                                                    <OrgInformation org={org} />
                                                </>
                                            )}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div ref={refPolicy}>
                                            <DetailPolicy org={org} />
                                        </div>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
                    </div>
                    {/* btn add cart */}
                    <div className="service-detail__bottom">
                        <button>
                            <p>{t("cart.payment_now")}</p>
                        </button>
                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="btn-addcart"
                        >
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>{t("detail_item.add_cart")}</p>
                        </button>
                    </div>
                    <Drawer
                        open={open}
                        anchor="bottom"
                        onClose={() => setOpen(false)}
                    >
                        <div className="active-mb">
                            <div className="service-detail">
                                <ComboDetailRight combo={combo} org={org} />
                            </div>
                        </div>
                    </Drawer>
                </div>
            </Container>
        </div>
    );
}

export default ComboDetail;
