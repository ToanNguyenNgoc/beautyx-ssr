import React from "react";
import AuthRoute from "./AuthRoute";
import { BrowserRouter as Router, Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
import MerchantDetail from "../pages/MerchantDetail/index";
import Partner from "../pages/Partner";
import Cart from "../features/Cart/index";
import Account from "../pages/Account";
import ProductDetail from "../pages/ProductDetail";
import ServiceDetail from "../pages/ServiceDetail";
import SignPage from "../pages/SignPage/index";
import CartPaymentStatus from "../features/CartPaymentStatus";
import ServicesUser from "../features/ServiceUser";
import SearchResults from "../pages/SearchResults/index";
import HomePromo from "../features/HomeResults/HomePromo";
import HomeListProvince from "../features/HomeResults/HomeListProvince";
import HomeDealBanner from "../features/HomeResults/HomeDealBanner";
import Policy from "../pages/Policy";
import SellerCenter from "../pages/SellerCenter";
import Otp from "../features/Otp";
import ResetPassword from "../pages/ResetPassword";
import ComboDetail from "../features/ComboDetail";
import DiscountDetail from "../pages/DiscountDetail";
import HomeDiscountList from "../features/HomeResults/HomeDiscountList";
import HomeMap from "../features/HomeMap";
import HomePromoProduct from "../features/HomeResults/HomePromoProduct";
import HomeCateResult from "../features/HomeResults/HomeCateResult"
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

function RouterConfig() {
  const routes = [
    // START mini app share link 
    {
      path: "/TIKI/dich-vu",
      component: <ServiceDetail />,
    },

    {
      path: "/TIKI/san-pham/:name",
      component: <ProductDetail />,
    },
    {
      path: "/TIKI/combo-detail/:name",
      component: <ComboDetail />
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
      component: <HomePage />
    },
    {
      path: '/TIKI',
      component: <HomePage />
    },
    {
      path: '/MBBANK',
      component: <HomePage />
    },
    {
      path: '/ZALO',
      component: <HomePage />
    },
    {
      path: `/otp`,
      component: <Otp />,
    },
    {
      path: '/doi-mat-khau',
      component: <ResetPassword />
    },
    {
      path: '/ket-qua-tim-kiem/:tab',
      component: <SearchResults />
    },
    {
      path: "/cart",
      component: <Cart />,
    },
    {
      path: "/san-pham/:name",
      component: <ProductDetail />,
    },
    {
      path: "/combo-detail/:name",
      component: <ComboDetail />
    },
    {
      path: "/dich-vu/",
      component: <ServiceDetail />,
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
      path: '/deal-lam-dep-cuc-HOT',
      component: <HomePromo />
    },
    {
      path: '/dia-diem-quan-tam',
      component: <HomeListProvince />
    },
    {
      path: '/chinh-sach/',
      component: <Policy />
    },
    {
      path: "/partner",
      component: <Partner />,
    },
    {
      path: "/kenh-nguoi-ban",
      component: <SellerCenter />
    },
    {
      path: "/deal/:title",
      component: <HomeDealBanner />
    },
    {
      path: "/tin-tuc",
      component: <Blog />
    },
    {
      path: "/chi-tiet-giam-gia/:name",
      component: <DiscountDetail />
    },
    {
      path: "/giam-gia",
      component: <HomeDiscountList />
    },
    {
      path: "/-danh-muc/",
      component: <CategoryTree />
    },
    {
      path: "/dat-hen",
      component: <Booking />
    },
    {
      path: "/landingpage/:name",
      component: <LadingPage />,
    },
    {
      path: "/san-pham",
      component: <ProductsByCate />
    },
    {
      path: "/ban-do",
      component: <HomeMap />
    },
    {
      path: "/top-san-pham-giam-gia",
      component: <HomePromoProduct />
    },
    {
      path: "/danh-sach-san-pham/:tag_name",
      component: <HomeCateResult />
    },
    {
      path: "/danh-sach-dich-vu/:tag_name",
      component: <HomeCateResult />
    },
  ];
  const routesPrivate = [
    {
      path: '/goi-dich-vu',
      component: <ServicesUser />
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
      path: '/trang-thai-don-hang/',
      component: <CartPaymentStatus />
    },
    {
      path: "/mua-hang",
      component: <BuyNow />
    },
    {
      path: "/gio-hang",
      component: <Carts />
    },
    {
      path: '/otp-form',
      component: <OtpMbPage />
    },
  ];
  logEvent(analytics, 'page_view', {
    page_title: document.title,
    page_path: window.location.pathname,
    page_location: window.location.href
  });
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Redirect exact from="/" to="homepage" />
          {
            routes.map((item, index: number) => (
              <Route key={index} path={item.path} >
                {item.component}
              </Route>
            ))
          }
          <AuthRoute>
            {
              routesPrivate.map((item, index: number) => (
                <Route key={index} path={item.path} >
                  {item.component}
                </Route>
              ))
            }
          </AuthRoute>
          <Route path="*" > <PageNotFound /> </Route>
        </Switch>
      </Router>
      <AssistantBtn />
    </BrowserRouter>
  );
}

export default RouterConfig;
