/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
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
import Review from "../Reviews";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import useFullScreen from "../../utils/useFullScreen";
import ServiceDetailRight from "../ServiceDetail/components/ServiceDetailRight";
import icon from "../../constants/icon";

function ProductDetail(props: any) {
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { PRODUCT, COMMENTS } = useSelector((state: any) => state.PRODUCT);
    const params: any = extraParamsUrl();
    const is_mobile = useFullScreen();
    const [open, setOpen] = useState(false);

    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    console.log(scrollMap, scrollDesc, scrollReview);

    // handle onclick active menu
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        let top;
        switch (value) {
            case 1:
                if (is_mobile) {
                    top = refDesc?.current?.offsetTop;
                } else {
                    top = refDesc?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 2:
                if (is_mobile) {
                    top = refReview?.current?.offsetTop;
                } else {
                    top = refReview?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 3:
                if (is_mobile) {
                    top = refMap?.current?.offsetTop;
                } else {
                    top = refMap?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            default:
                break;
        }
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    // handle scroll active menu
    function handleScroll() {
        if (is_mobile) {
            if (window.scrollY + 16 < scrollReview) {
                setValue(1);
            } else if (
                window.scrollY + 16 > scrollDesc &&
                window.scrollY + 16 < scrollMap
            ) {
                setValue(2);
            } else if (window.scrollY + 16 > scrollReview) {
                setValue(3);
            }
        } else {
            if (window.scrollY + 72 < scrollReview) {
                setValue(1);
            } else if (
                window.scrollY + 72 > scrollDesc &&
                window.scrollY + 72 < scrollMap
            ) {
                setValue(2);
            } else if (window.scrollY + 72 > scrollReview) {
                setValue(3);
            }
        }
    }
    const callProductDetail = () => {
        if (
            parseInt(params.id) !== PRODUCT.product.id ||
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
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        callProductDetail();
        callOrgDetail();
        callProductComments();
    }, []);
    const product = PRODUCT.product;
    const org = ORG.org;

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
    ];

    return (
        <div className="product">
            <HeadTitle
                title={
                    product?.product_name ? product.product_name : "Loading..."
                }
            />
            <Head />
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
                                        <div
                                            ref={refDesc}
                                            className="service-detail__description"
                                        >
                                            <p>
                                                Mô tả:{" "}
                                                {product?.description
                                                    ? product.description
                                                    : "Đang cập nhật"}
                                            </p>
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
                                                commentable_type={"PRODUCT"}
                                                id={ORG.org?.id}
                                                detail_id={product?.id}
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
                                                    <OrgInformation org={org} />
                                                )}
                                            </div>
                                        </div>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
                    </div>
                    {/* service bottom buttom add cart                                             */}
                    <div className="service-detail__bottom">
                        <button>
                            <p>Mua ngay</p>
                        </button>
                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="btn-addcart"
                        >
                            <p>Thêm vào giỏ hàng</p>
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                        </button>
                        {/* drawer service detail */}
                        <Drawer
                            open={open}
                            anchor="bottom"
                            onClose={() => setOpen(false)}
                        >
                            <div className="active-mb">
                                <div className="service-detail">
                                    <ProductDetailRight
                                        product={product}
                                        org={org}
                                    />
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductDetail;
