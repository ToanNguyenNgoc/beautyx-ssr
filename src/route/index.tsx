import  { lazy, Suspense } from "react";
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
// import MerchantDetail from "pages/MerchantDetail";
import Organization from "pages/Organization";
import { analytics, logEvent } from "../firebase";
import { LoadProgress } from "components/LoadingSketion";
import ResetPassword from "pages/ResetPassword";
import SearchResults from "pages/SearchResults";
import DiscountDetail from "pages/_DiscountDetail";
import Discounts from "pages/Discounts";
import HomeCateResult from "pages/HomeCateResult";
import ServicesUser from "features/ServiceUser";
import Account from "pages/Account";
import Calendar from "pages/Calendar";
import Cart from "pages/Cart";
import SignPage from "pages/SignPage";
import Bottom from "components/Bottom";
import Head from "components/Head";
import CateTree from "pages/CateTree";
import Chat from "pages/Chat";

//community page
const PostDetail = lazy(() => import("pages/Community/pages/PostDetail"));
const GroupDetail = lazy(() => import("pages/Community/pages/GroupDetail"));

//update import lazy
const DealBanner = lazy(() => import("pages/DealBanner"));
const VoucherPage = lazy(() => import("pages/VoucherPage"));
const Booking = lazy(() => import("features/Booking"));
const HomeListProvince = lazy(() => import("pages/Provinces"));
const HomeMap = lazy(() => import("features/HomeMap"));
const Partner = lazy(() => import("../pages/Partner"));
const Policy = lazy(() => import("pages/Policy"));
const SellerCenter = lazy(() => import("pages/SellerCenter"));
const Otp = lazy(() => import("features/Otp"));
const LandingPage = lazy(() => import("pages/LandingPage"));
const OtpMbPage = lazy(() => import("pages/OtpMbPage"));
const Trends = lazy(() => import("pages/Trends"));
const Community = lazy(() => import("pages/Community"));
const TrendsDetail = lazy(() => import("pages/TrendsDetail"));
const Rewards = lazy(() => import("pages/Rewards"));
const Messenger = lazy(() => import("pages/Messenger"))

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
      component: <Organization />,
    },
    {
      path: "/TIKI/org/:subdomain",
      component: <Organization />,
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
      component: <Organization />,
    },
    {
      path: "/MOMO/org/:subdomain",
      component: <Organization />,
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
      path: "/BEAUTYX_MOBILE",
      component: <HomePage />,
    },
    {
      path: "/ZALO",
      component: <HomePage />,
    },
    {
      path: "/auth/zalo",
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
      component: <Organization />,
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
      component: <DiscountDetail />
    },
    {
      path: "/giam-gia/:name",
      component: <DiscountDetail />,
    },
    {
      path: "/giam-gia",
      component: <Discounts />,
    },
    {
      path: "/danh-muc",
      component: <CateTree />,
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
      path: "/bai-viet/:id",
      component: <PostDetail />,
    },
    {
      path: "/nhom/:id",
      component: <GroupDetail />,
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
      path: "/gio-hang",
      component: <Cart />,
    },
    {
      path: "/otp-form",
      component: <OtpMbPage />,
    },
    {
      path: "/ma-giam-gia",
      component: <VoucherPage />,
    },
    {
      path: "/coins",
      component: <Rewards />,
    },
    {
      path: "/chat",
      component: <Chat />,
    },
    {
      path:"/messages",
      component:<Messenger/>
    }
  ];
  logEvent(analytics, "page_view", {
    page_title: document.title,
    page_path: window.location.pathname,
    page_location: window.location.href,
  });
  return (
    <BrowserRouter>
      <Router>
        <Head />
        <Switch>
          <Redirect exact from="/" to="homepage" />
          {routes.map((item, index: number) => (
            <Route key={index} path={item.path}>
              <Suspense fallback={<LoadProgress/>}>
                {item.component}
              </Suspense>
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
        <ExtraFlatForm />
        <AssistantBtn />
        <Footer />
        <Bottom />
      </Router>
    </BrowserRouter>
  );
}

export default RouterConfig;
