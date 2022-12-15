import React, { lazy, Suspense } from "react";
import AuthRoute from "./AuthRoute";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    BrowserRouter,
    Route,
} from "react-router-dom";
import CartPaymentStatus from "../pages/CartPaymentStatus";
import PageNotFound from "../components/PageNotFound";
import HomePage from "pages/HomePage";
import ExtraFlatForm from "rootComponents/extraFlatForm";
import AssistantBtn from "../components/AssistantBtn";
import PaymentStatus from "rootComponents/momo/PaymentStatus";
import SerProCoDetail from "pages/_SerProCoDetail";
import Footer from "components/Footer";
import MerchantDetail from "pages/MerchantDetail";
import { analytics, logEvent } from "../firebase";
import {  LoadProgress } from "components/LoadingSketion";
import LoadDetail from "components/LoadingSketion/LoadDetail";
// import Otp from "features/Otp";
import ResetPassword from "pages/ResetPassword";
import SearchResults from "pages/SearchResults";
// import Policy from "pages/Policy";
import HomeListProvince from "features/HomeResults/HomeListProvince";
// import Partner from "pages/Partner";
// import SellerCenter from "pages/SellerCenter";
import DealBanner from "pages/DealBanner";
import DiscountDetail from "pages/_DiscountDetail";
import HomeDiscountList from "features/HomeResults/HomeDiscountList";
import CategoryTree from "features/CategoryTree";
import Booking from "features/Booking";
// import LandingPage from "pages/LandingPage";
import ProductsByCate from "features/CategoryTree/ProductsByCate";
import HomeMap from "features/HomeMap";
import HomeCateResult from "pages/HomeCateResult";
// import Trends from "pages/Trends";
// import TrendsDetail from "pages/TrendsDetail";
// import Community from "pages/Community";
import ServicesUser from "features/ServiceUser";
import Account from "pages/Account";
import Calendar from "features/Calendar";
import BuyNow from "features/BuyNow";
import Carts from "pages/Carts";
// import OtpMbPage from "pages/OtpMbPage";
import VoucherPage from "pages/VoucherPage";
import SignPage from "pages/SignPage";
import { Bottom } from "components/Layout";
import Head from "components/Head";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import RefreshToken from 'features/RefreshToken'
//update import lazy
// const Account = lazy(() => import('pages/Account'))
// const SignPage = lazy(() => import('pages/SignPage'))
// const ServicesUser = lazy(() => import('features/ServiceUser'))
// const HomeMap = lazy(() => import('features/HomeMap'))
const Partner = lazy(() => import("../pages/Partner"))
// const SearchResults = lazy(() => import("../pages/SearchResults/index"))
// const DiscountDetail = lazy(() => import('pages/_DiscountDetail'))
// const HomeListProvince = lazy(() => import("../features/HomeResults/HomeListProvince"))
// const DealBanner = lazy(() => import('pages/DealBanner'))
const Policy = lazy(() => import('pages/Policy'))
const SellerCenter = lazy(() => import('pages/SellerCenter'))
const Otp = lazy(() => import('features/Otp'))
// const ResetPassword = lazy(() => import('pages/ResetPassword'))
// const HomeDiscountList = lazy(() => import('features/HomeResults/HomeDiscountList'))
// const HomeCateResult = lazy(() => import('pages/HomeCateResult'))
// const CategoryTree = lazy(() => import('features/CategoryTree'))
// const Booking = lazy(() => import('features/Booking'))
// const Calendar = lazy(() => import('features/Calendar'))
// const BuyNow = lazy(() => import('features/BuyNow'))
// const Carts = lazy(() => import('pages/Carts'))
// const ProductsByCate = lazy(() => import('features/CategoryTree/ProductsByCate'))
const LandingPage = lazy(() => import('pages/LandingPage'))
const OtpMbPage = lazy(() => import('pages/OtpMbPage'))
const Trends = lazy(() => import('pages/Trends'))
const Community = lazy(() => import('pages/Community'))
// const VoucherPage = lazy(() => import('pages/Community'))
const TrendsDetail = lazy(() => import('pages/TrendsDetail'))

function RouterConfig() {
    const routes = [
        // START mini app share link
        {
            path: "/TIKI/dich-vu/",
            component: <SerProCoDetail />,
        },

        {
            path: "/TIKI/san-pham/",
            component: <SerProCoDetail />,
        },
        {
            path: "/TIKI/combo-detail/",
            component: <SerProCoDetail />,
        },
        {
            path: "/TIKI/cua-hang/:subdomain",
            component: <MerchantDetail />,
        },
        {
            path: "/TIKI/org/:subdomain",
            component: <MerchantDetail />,
        },
        //
        {
            path: "/MOMO/dich-vu/",
            component: <SerProCoDetail />,
        },

        {
            path: "/MOMO/san-pham/",
            component: <SerProCoDetail />,
        },
        {
            path: "/MOMO/combo-detail/",
            component: <SerProCoDetail />,
        },
        {
            path: "/MOMO/cua-hang/:subdomain",
            component: <MerchantDetail />,
        },
        {
            path: "/MOMO/org/:subdomain",
            component: <MerchantDetail />,
        },
        // END mini app share link
        {
            path: `/home`,
            component: <HomePage />,
        },
        {
            path: `/homepage`,
            component: <HomePage />,
        },
        {
            path: `/MOMO`,
            component: <HomePage />,
        },
        {
            path: "/TIKI",
            component: <HomePage />,
        },
        {
            path: "/MBBANK",
            component: <HomePage />,
        },
        {
            path: "/ZALO",
            component: <HomePage />,
        },
        {
            path: `/otp`,
            component: <Otp />,
        },
        {
            path: "/doi-mat-khau",
            component: <ResetPassword />,
        },
        {
            path: "/ket-qua-tim-kiem/:tab",
            component: <SearchResults />,
        },
        {
            path: "/tim-kiem/:tab",
            component: <SearchResults />,
        },
        {
            path: "/san-pham/",
            component: <SerProCoDetail />,
        },
        {
            path: "/combo-detail/",
            component: <SerProCoDetail />,
        },
        {
            path: "/dich-vu/",
            component: <SerProCoDetail />,
        },
        {
            path: "/sign-up",
            component: <SignPage />,
        },
        {
            path: "/sign-in",
            component: <SignPage />,
        },
        {
            path: "/cua-hang/:subdomain",
            component: <MerchantDetail />,
        },
        {
            path: "/dia-diem-quan-tam",
            component: <HomeListProvince />,
        },
        {
            path: "/chinh-sach/",
            component: <Policy />,
        },
        {
            path: "/partner",
            component: <Partner />,
        },
        {
            path: "/kenh-nguoi-ban",
            component: <SellerCenter />,
        },
        {
            path: "/deal/:_id",
            component: <DealBanner />,
        },
        {
            path: "/chi-tiet-giam-gia/:name",
            component: <DiscountDetail />,
            load:<LoadDetail/>
        },
        {
            path: "/giam-gia",
            component: <HomeDiscountList />,
        },
        {
            path: "/-danh-muc/",
            component: <CategoryTree />,
        },
        {
            path: "/dat-hen",
            component: <Booking />,
        },
        {
            path: "/landingpage/:name",
            component: <LandingPage />,
        },
        {
            path: "/san-pham",
            component: <ProductsByCate />,
        },
        {
            path: "/ban-do",
            component: <HomeMap />,
        },
        {
            path: "/danh-sach-san-pham/:tag_name",
            component: <HomeCateResult />,
        },
        {
            path: "/danh-sach-dich-vu/:tag_name",
            component: <HomeCateResult />,
        },
        {
            path: "/xu-huong",
            component: <Trends />,
        },
        {
            path: "/video/:id",
            component: <TrendsDetail />,
        },
        {
            path: "/cong-dong",
            component: <Community />,
        },
        {
            path: "/error",
            component: <PageNotFound />,
        },
    ];
    const routesPrivate = [
        {
            path: "/goi-dich-vu",
            component: <ServicesUser />,
        },
        {
            path: "/tai-khoan",
            component: <Account />,
        },
        {
            path: "/lich-hen",
            component: <Calendar />,
        },
        {
            path: "/trang-thai-don-hang/",
            component: <CartPaymentStatus />,
        },
        {
            path: "/thanh-toan-momo/:tran_uid",
            component: <PaymentStatus />,
        },
        {
            path: "/mua-hang",
            component: <BuyNow />,
        },
        {
            path: "/gio-hang",
            component: <Carts />,
        },
        {
            path: "/otp-form",
            component: <OtpMbPage />,
        },
        {
            path: "/ma-giam-gia",
            component: <VoucherPage />,
        },
    ];
    logEvent(analytics, "page_view", {
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
    });
    const {refresh} = useSelector((state:IStore) => state.USER)
    const PLAT_FORM:string = EXTRA_FLAT_FORM()
    return (
        <BrowserRouter>
            <Router>
                <Head/>
                {(refresh && PLAT_FORM==='BEAUTYX') && <RefreshToken/>}
                <Switch>
                    <Redirect exact from="/" to="homepage" />
                    {routes.map((item, index: number) => (
                        <Route key={index} path={item.path}>
                            <Suspense fallback={item.load ?? <LoadProgress/>}>
                                {item.component}
                            </Suspense>
                        </Route>
                    ))}
                    <AuthRoute>
                        {routesPrivate.map((item, index: number) => (
                            <Route key={index} path={item.path}>
                                {/* <Suspense fallback={<LoadProgress />}> */}
                                    {item.component}
                                {/* </Suspense> */}
                            </Route>
                        ))}
                    </AuthRoute>
                    <Redirect exact from="*" to="error" />
                </Switch>
                <ExtraFlatForm />
                <AssistantBtn />
                <Footer />
                <Bottom/>
            </Router>
        </BrowserRouter>
    );
}

export default RouterConfig;
