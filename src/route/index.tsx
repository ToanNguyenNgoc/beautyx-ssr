import React from "react";
//import Home from "../features/Home/index";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { RouteComponentProps } from "@reach/router";
import { FLAT_FORM_TYPE } from '../rootComponents/flatForm';
import MerchantDetail from "../features/MerchantDetail/index";
import Partner from "../features/Partner";
import Cart from "../features/Cart/index";
import CartPayment from "../features/CartPayment/index";
import Account from "../features/Account";
import ProductDetail from "../features/ProductDetail";
import ServiceDetail from "../features/ServiceDetail";
import SignPage from "../features/SignPage/index";
import SignPageRequest from "../features/SignPageRequest/index";
import Notification from "../features/Notification/index";
import PrivateRoute from "./PrivateRoute";
import CartPaymentStatus from "../features/CartPaymentStatus";
import ServicesUser from "../features/ServiceUser";
//import DatePicker from "../components/DatePicker"
import SearchResults from "../features/SearchResults/index";
import HomePromo from "../features/HomeResults/HomePromo";
import HomeListProvince from "../features/HomeResults/HomeListProvince";
import HomeDealBanner from "../features/HomeResults/HomeDealBanner";
import Policy from "../features/Policy";
import SellerCenter from "../features/SellerCenter";
import CommentsDetail from "../features/Comments/CommentsDetail";
import Otp from "../features/Otp";
import ResetPassword from "../features/ResetPassword";
import ComboDetail from "../features/ComboDetail";
import DiscountDetail from "../features/DiscountDetail";
import HomeDiscountList from "../features/HomeResults/HomeDiscountList";
import HomeBannerSearchResult from "../features/HomePage/HomeBanner/homeSearchReasult";
import HomeMap from "../features/HomeMap";

// feature mobile
//import Calendar from "../featuresMobile/Calendar";
//import MerchantComment from "../features/MerchantComment";
import { useSelector } from "react-redux";
import HomePage from "../features/HomePage";
import Videos from "../features/Feed/Videos";
import Blog from "../features/Blog";
import CategoryTree from "../features/CategoryTree";
import Booking from "../features/Booking";
import Calendar from "../features/Calendar";
import BuyNow from "../features/BuyNow";
import Carts from "../features/Carts";
import AssistantBtn from "../components/AssistantBtn";

import ProductsByCate from "../features/CategoryTree/ProductsByCate";

import Result from "../features/Results";
import ChatOrg from "../features/Chat/ChatOrg";
import ChatAll from "../features/Chat/ChatAll";
import PageNotFound from "../components/PageNotFound";

import MapBox from "../features/MapBeta";
import { analytics } from "../firebase";

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
function RouterConfig(props: any) {
  const USER = useSelector((state: any) => state.USER);
  const routes = [
    {
      path: '/map-box',
      component: <MapBox />
    },
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
      path: `/otp`,
      component: <Otp />,
    },
    {
      path: '/doi-mat-khau',
      component: <ResetPassword />
    },
    {
      path: '/ket-qua-tim-kiem/',
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
      path: "/sign-request",
      component: <SignPageRequest />,
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
      path: "/danh-gia/",
      component: <CommentsDetail />
    },
    {
      path: "/deal/:title",
      component: <HomeDealBanner />
    },
    {
      path: "/beautyx-videos",
      component: <Videos />
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
      path: "/home-banner-result",
      component: <HomeBannerSearchResult />,
    },
    // {
    //   path: "/mua-hang",
    //   component: <BoyNow />
    // }
    {
      path: "/san-pham",
      component: <ProductsByCate />
    },
    {
      path: "/ket-qua",
      component: <Result />
    },
    {
      path: "/ban-do",
      component: <HomeMap />
    },
    {
      path: "*",
      component: <PageNotFound />
    }
  ];
  const routesPrivate = [
    {
      path: '/goi-dich-vu',
      component: ServicesUser
    },
    {
      path: "/tai-khoan",
      component: Account,
    },
    {
      path: "/payment",
      component: CartPayment,
    },
    {
      path: "/lich-hen",
      component: Calendar,
    },
    {
      path: "/notifications",
      component: Notification,
    },
    {
      path: '/trang-thai-don-hang/',
      component: CartPaymentStatus
    },
    {
      path: "/mua-hang",
      component: BuyNow
    },
    {
      path: "/gio-hang",
      component: Carts
    },
    {
      path: "/chat",
      component: ChatAll
    }
  ];
  analytics.logEvent('page_view', {
    page_title: document.title,
    page_path: window.location.pathname,
    page_location: window.location.href
  });
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="homepage" />
        {routesPrivate.map((item, index) => (
          <PrivateRoute
            USER={USER}
            key={index}
            path={`${item.path}`}
            component={item.component}
          />
        ))}
        {routes.map((item, index) => (
          <RouterPage
            key={index}
            path={`${item.path}`}
            pageComponent={item.component}
          />
        ))}
      </Switch>
      <AssistantBtn />
      {USER?.USER && <ChatOrg />}
    </BrowserRouter>
  );
}

export default RouterConfig;
