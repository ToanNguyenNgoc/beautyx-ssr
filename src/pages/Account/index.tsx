/* eslint-disable react-hooks/exhaustive-deps */
import { RouteComponentProps } from "@reach/router";
import { Switch } from "react-router-dom";
// import CheckNoti from "./components/CheckNotification";
import PaymentMethod from "./components/PaymentMethod/index";
import Information from "./components/Information/index";
import Head from "../../features/Head/index";
import "./account.css";
import SideBar from "./components/MenuSideBar";
import Orders from "../../features/Orders/index";
import Product from "./components/HistoryProduct";
import Service from "./components/HistoryService";
import ComboList from "./components/HistoryCombo/components/Combolist";
import OrderDetail from "../../features/OrderDetail";
import UserAddress from "./components/UserAddress/components/UserAddress";
import UserDiscounts from "./components/UserDiscounts";
import Footer from "../../features/Footer";
import HeadTitle from "../../features/HeadTitle";
import { useEffect } from "react";
import { fetchAsyncDiscountsUser } from "../../redux/USER/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../redux/status";
import AccountMobile from "../../featuresMobile/AccountPage";
import useDeviceMobile from "../../utils/useDeviceMobile";
const routes = [
    {
        path: `/tai-khoan/phuong-thuc-thanh-toan`,
        component: <PaymentMethod />,
    },
    {
        path: `/tai-khoan/thong-tin-ca-nhan`,
        component: <Information />,
    },
    {
        path: `/tai-khoan/san-pham`,
        component: <Product />,
    },
    {
        path: `/tai-khoan/goi-dich-vu`,
        component: <Service />,
    },
    {
        path: `/tai-khoan/combo`,
        component: <ComboList />,
    },
    {
        path: "/tai-khoan/lich-su-mua",
        component: <Orders />,
    },
    {
        path: "/tai-khoan/chi-tiet-don-hang",
        component: <OrderDetail />,
    },
    {
        path: "/tai-khoan/dia-chi",
        component: <UserAddress />,
    },
    {
        path: "/tai-khoan/ma-uu-dai",
        component: <UserDiscounts />,
    },
];
function Account() {
    const headerTitle = "Thông tin cá nhân";
    const RouterPage = (
        props: { pageComponent: JSX.Element } & RouteComponentProps
    ) => props.pageComponent;
    const dispatch = useDispatch();
    const { DISCOUNTS_USER } = useSelector((state: any) => state.USER);
    const { status_discount } = DISCOUNTS_USER;
    const callDiscountsUser = () => {
        if (status_discount !== STATUS.SUCCESS) {
            dispatch(fetchAsyncDiscountsUser({ page: 1 }));
        }
    };
    useEffect(() => {
        callDiscountsUser();
    }, []);
    const IS_MB = useDeviceMobile();
    return (
        IS_MB ?
            <AccountMobile />
            :
            <>
                {!IS_MB && <HeadTitle title={headerTitle} />}
                <Head />
                <div className="wrapper account_section">
                    <SideBar />
                    <div className="display_section">
                        <Switch>
                            {routes.map((item, index) => (
                                <RouterPage
                                    key={index}
                                    path={`${item.path}`}
                                    pageComponent={item.component}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
                <Footer />
            </>
    );
}
export default Account;
