/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import "./bottom.css";
import { ICON } from "../../constants/icon2";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import scrollTop from "../../utils/scrollTop";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
//import { IServiceUser } from '../../interface/servicesUser'


function Bottom(props: any) {
    const { t } = useContext(AppContext);
    const location = useLocation();
    const pathname = location.pathname;
    //const { services } = useSelector((state: any) => state.ORDER.ORDER_SERVICES);
    //console.log(services);
    //const services_not_book = services.filter((i: IServiceUser) => i?.appointments?.length === 0);
    //console.log(services_not_book);
    const { ORDER_SERVICES_NOT_BOOK_COUNT } = useSelector((state: any) => state.ORDER);
    const Btns = [
        {
            id: 1,
            title: t("Home.location"),
            icon: ICON.home,
            iconAct: ICON.homeAct,
            path: "/homepage",
            params:"",
            badge: 0
        },
        // {
        //     id: 2,
        //     title: t("Home.trending"),
        //     icon: ICON.trend,
        //     iconAct: ICON.trendAct,
        //     path: "/beautyx-videos",
        // },
        {
            id: 3,
            title: t("Home.cate"),
            icon: ICON.cate,
            iconAct: ICON.cateAct,
            path: "/-danh-muc",
            params:"",
            badge: 0
        },
        {
            id: 4,
            title: t("Bottom.appointment"),
            icon: ICON.calendar,
            iconAct: ICON.calendarAct,
            path: "/lich-hen",
            params:"tab=2",
            badge: 0
        },
        // {
        //     id: 7,
        //     title: "Chat",
        //     icon: ICON.comments,
        //     iconAct: ICON.commentPurpleAct,
        //     path: "/chat",
        //     badge: 0
        // },
        {
            id: 5,
            title: t("Bottom.account"),
            icon: ICON.user,
            iconAct: ICON.userAct,
            path: "/tai-khoan/thong-tin-ca-nhan",
            params:"",
            badge: ORDER_SERVICES_NOT_BOOK_COUNT
        },
    ];
    const history = useHistory();
    const chooseBtn = (item: any) => {
        scrollTop();
        history.push({
            pathname:item.path,
            search:`${item.params}`
        });
    };
    return (
        <div className="bt">
            <div className="flex-row-sp bt-cnt">
                {Btns.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => chooseBtn(item)}
                        className="flex-column bt-cnt__item"
                    >
                        <img
                            src={
                                item.path === pathname
                                    ? item.iconAct
                                    : item.icon
                            }
                            alt=""
                        />
                        {
                            item.badge > 0 &&
                            <span className="bt-cnt__item-badge">
                                {/* {item.badge} */}
                            </span>
                        }
                        <span
                            style={
                                item.path === pathname
                                    ? {
                                        color: "var(--purple)",
                                        fontWeight: "700",
                                    }
                                    : {}
                            }
                            className="bt-cnt__item-title"
                        >
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bottom;
