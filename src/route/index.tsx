import React from "react";
import AuthRoute from "./AuthRoute";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    BrowserRouter,
    Route,
} from "react-router-dom";
import MerchantDetail from "../pages/MerchantDetail/index";
import Partner from "../pages/Partner";
import Cart from "../features/Cart/index";
import Account from "../pages/Account";
// import ProductDetail from "../pages/ProductDetail";
// import ServiceDetail from "../pages/ServiceDetail";
import SignPage from "../pages/SignPage/index";
import CartPaymentStatus from "../features/CartPaymentStatus";
import ServicesUser from "../features/ServiceUser";
import SearchResults from "../pages/SearchResults/index";
import HomeListProvince from "../features/HomeResults/HomeListProvince";
import HomeDealBanner from "../features/HomeResults/HomeDealBanner";
import Policy from "../pages/Policy";
import SellerCenter from "../pages/SellerCenter";
import Otp from "../features/Otp";
import ResetPassword from "../pages/ResetPassword";
// import ComboDetail from "../features/ComboDetail";
import DiscountDetail from "../pages/DiscountDetail";
import HomeDiscountList from "../features/HomeResults/HomeDiscountList";
import HomeMap from "../features/HomeMap";
import HomeCateResult from "../features/HomeResults/HomeCateResult";
import Blog from "../features/Blog";
import CategoryTree from "../features/CategoryTree";
import Booking from "../features/Booking";
import Calendar from "../features/Calendar";
import BuyNow from "../features/BuyNow";
import Carts from "../pages/Carts";
import AssistantBtn from "../components/AssistantBtn";
import ProductsByCate from "../features/CategoryTree/ProductsByCate";
import PageNotFound from "../components/PageNotFound";
import { analytics, logEvent } from "../firebase";
import HomePage from "pages/HomePage";
// import ExtraFlatForm from "rootComponents/extraFlatForm";
import LadingPage from "pages/LandingPage";
import OtpMbPage from "pages/OtpMbPage";
import PaymentStatus from "rootComponents/momo/PaymentStatus";
import Trends from "pages/Trends";
import Community from "pages/Community";
import VoucherPage from "pages/VoucherPage";
import TrendsDetail from "pages/TrendsDetail";
import SerProCoDetail from "pages/SerProCoDetail";
import { useAuth } from "hooks";

function RouterConfig() {
    const routes = [
        // START mini app share link
        {
            path: "/TIKI/dich-vu",
            component: <SerProCoDetail />,
        },

        {
            path: "/TIKI/san-pham/:name",
            component: <SerProCoDetail />,
        },
        {
            path: "/TIKI/combo-detail/:name",
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
            path: "/cart",
            component: <Cart />,
        },
        {
            path: "/san-pham/:name",
            component: <SerProCoDetail />,
        },
        {
            path: "/combo-detail/:name",
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
            path: "/deal/:title",
            component: <HomeDealBanner />,
        },
        {
            path: "/tin-tuc",
            component: <Blog />,
        },
        {
            path: "/chi-tiet-giam-gia/:name",
            component: <DiscountDetail />,
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
            component: <LadingPage />,
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
        // {
        //     path: "*",
        //     component: <PageNotFound />,
        // },
    ];
    logEvent(analytics, "page_view", {
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
    });
    const { firstLoad } = useAuth()
    return (
        <BrowserRouter>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="homepage" />
                    {routes.map((item, index: number) => (
                        <Route key={index} path={item.path}>
                            {item.component}
                        </Route>
                    ))}
                    <AuthRoute>
                        {routesPrivate.map((item, index: number) => (
                            <Route key={index} path={item.path}>
                                {item.component}
                            </Route>
                        ))}
                    </AuthRoute>
                    <Redirect exact from="*" to="error" />
                </Switch>
                <AssistantBtn />
            </Router>
        </BrowserRouter>
    );
}

export default RouterConfig;
