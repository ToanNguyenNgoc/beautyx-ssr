/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./product.css";
import Head from "../Head";
import Footer from "../Footer";
import HeadTitle from "../HeadTitle";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { STATUS } from "../../redux/status";
import {
    fetchAsyncProductDetail,
    fetchAsyncProductCmt,
} from "../../redux/org_products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import "../ServiceDetail/serviceDetail.css";
import "./product.css";
import { Container, Drawer, Tab } from "@mui/material";
import ProductDetailLeft from "./components/ProductDetailLeft";
import ProductDetailRight from "./components/ProductDetailRight";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import useFullScreen from "../../utils/useDeviceMobile";
import icon from "../../constants/icon";
import Review from "../Reviews";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import {
    handleChangeScroll,
    handleScroll,
} from "../ServiceDetail/onScrollChange";
import DetailPolicy from "../ServiceDetail/components/DetailPolicy";
import ProductDetailRecomment from "./components/ProductDetailRecomment";
import DetailOrgCard from "../ServiceDetail/components/DetailOrgCard";
import ReviewsContainer from "../ReviewsContainer";
import PageNotFound from "../../components/PageNotFound";
import { AppContext } from "../../context/AppProvider";
import LoadDetail from "../../components/LoadingSketion/LoadDetail";
import IStore from "../../interface/IStore";
import { postHistoryView } from "../../user-behavior";

function ProductDetail(props: any) {
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const location = useLocation();
    const IS_MB = useFullScreen();
    const history = useHistory();
    const ORG = useSelector((state: IStore) => state.ORG);
    const { PRODUCT, COMMENTS } = useSelector((state: IStore) => state.PRODUCT);
    const params: any = extraParamsUrl();
    const is_mobile = useFullScreen();
    const [open, setOpen] = useState({
        NOW: true,
        open: false,
    });
    const { t } = useContext(AppContext);
    const product = PRODUCT.product;
    const org = ORG.org;
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

    const callProductDetail = () => {
        if (
            parseInt(params.id) !== PRODUCT?.product?.id ||
            PRODUCT.status !== STATUS.SUCCESS
        ) {
            const values = {
                id: params.id,
                org_id: params.org,
            };
            dispatch(fetchAsyncProductDetail(values));
        }
    };
    const callOrgDetail = () => {
        if (
            parseInt(params.org) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org));
        }
    };
    const callProductComments = () => {
        if (
            parseInt(params.id) !== COMMENTS.product_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "PRODUCT",
                page: 1,
                id: params.id,
                org_id: params.org,
            };
            dispatch(fetchAsyncProductCmt(values));
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
    const postAsyncHistory = async () => {
        await postHistoryView({ id: params.id, organization_id: params.org, type: "PRODUCT" })
    }
    useEffect(() => {
        postAsyncHistory()
        callProductDetail();
        callOrgDetail();
        callProductComments();
    }, [params.id]);

    const handleBack = () => {
        history.goBack();
        const values = {
            org_id: params.org,
            id: params.id,
        };
        if (params?.org && params?.org) {
            dispatch(fetchAsyncProductDetail(values));
        }
    };

    return (
        <div className="product">
            {PRODUCT.status === STATUS.LOADING && <LoadDetail />}
            {PRODUCT.status === STATUS.FAIL && <PageNotFound />}
            <HeadTitle
                title={
                    product?.product_name ? product.product_name : "Loading..."
                }
            />
            {IS_MB ? <HeadOrg onBackFunc={handleBack} org={org} /> : <Head />}
            <Container>
                <div className="service-detail">
                    <div className="service-detail__head">
                        <ProductDetailLeft org={org} product={product} />
                        <ProductDetailRight org={org} product={product} />
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
                                        {product?.description.length === 0 ? (
                                            <div className="service-description-updating">
                                                <span className="service-description">
                                                    {t("pr.description")}
                                                    {": "}
                                                    {t("detail_item.updating")}
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="service-description">
                                                    {t("pr.description")}:{" "}
                                                    {product?.description
                                                        .length > 150 &&
                                                        readMore !== true
                                                        ? product?.description.slice(
                                                            0,
                                                            150
                                                        )
                                                        : product?.description}
                                                    {/* dots */}
                                                    {product?.description
                                                        .length > 150 &&
                                                        readMore === false
                                                        ? "..."
                                                        : " "}
                                                    {/* close dot  */}
                                                </span>{" "}
                                                <span>
                                                    {product?.description &&
                                                        product?.description
                                                            .length > 150 && (
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
                                            </>
                                        )}
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div
                                            ref={refReview}
                                            className="service-detail__comment"
                                        >
                                            <Review
                                                comments={COMMENTS.comments}
                                                totalItem={COMMENTS.totalItem}
                                                commentable_type={"PRODUCT"}
                                                id={ORG.org?.id}
                                                detail_id={product?.id}
                                                page={COMMENTS.page}
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
                                                    <p>{`${t(
                                                        "detail_item.see_more"
                                                    )}`}</p>
                                                </div>
                                            ) : null}
                                            <ReviewsContainer
                                                open={openAllCmt}
                                                setOpen={setOpenAllCmt}
                                                comments={COMMENTS.comments}
                                                org_id={ORG.org?.id}
                                                totalItem={COMMENTS.totalItem}
                                                page={COMMENTS.page}
                                                commentable_type="PRODUCT"
                                            />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div
                                            ref={refMap}
                                            className="org-information-cnt"
                                        >
                                            <div className="service-detail__org">
                                                {ORG.status ===
                                                    STATUS.SUCCESS && (
                                                        <>
                                                            <p className="service-detail__title">
                                                                {`${t(
                                                                    "detail_item.merchant"
                                                                )}`}
                                                            </p>
                                                            <div className="service-detail__org-mb">
                                                                <DetailOrgCard
                                                                    org={org}
                                                                />
                                                            </div>
                                                            <OrgInformation
                                                                org={org}
                                                            />
                                                        </>
                                                    )}
                                            </div>
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
                        <ProductDetailRecomment org={org} />
                    </div>
                    {/* service bottom buttom add cart*/}
                    <div className="service-detail__bottom">
                        {product?.is_momo_ecommerce_enable === false ||
                            org?.is_momo_ecommerce_enable === false ? (
                            <span className="detail-right__no">
                                {`${t("detail_item.not_sale")}`}
                            </span>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setOpen({ NOW: true, open: true });
                                    }}
                                    style={{ backgroundColor: "var(--orange)" }}
                                >
                                    <p>{t("cart.payment_now")}</p>
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
                                    <p>{t("detail_item.add_cart")}</p>
                                </button>
                                {/* drawer service detail */}
                                <Drawer
                                    open={open.open}
                                    anchor="bottom"
                                    onClose={() =>
                                        setOpen({ ...open, open: false })
                                    }
                                >
                                    <div className="active-mb">
                                        <div className="service-detail">
                                            <ProductDetailRight
                                                product={product}
                                                org={org}
                                                NOW={open.NOW}
                                            />
                                        </div>
                                    </div>
                                </Drawer>
                            </>
                        )}
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductDetail;
