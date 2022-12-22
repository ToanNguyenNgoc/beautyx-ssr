/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import "./bottom.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import scrollTop from "utils/scrollTop";
import { AppContext } from "context/AppProvider";
import { ICON } from "constants/icon2";
import IStore from "interface/IStore";

const paths = [
    "/TIKI",
    "/MOMO",
    "/TIKI/",
    "/MOMO/",
    "/MBBANK",
    "/",
    "/homepage/",
    "/homepage",
    "/tai-khoan",
    "/lich-hen",
    "/-danh-muc"
];

export function Bottom() {
    const { t,appointment_today,order_app } = useContext(AppContext);
    const location = useLocation();
    const { USER } = useSelector((state: IStore) => state.USER)
    const Btns = [
        {
            id: 1,
            title: t("Home.location"),
            icon: ICON.home,
            iconAct: ICON.homeAct,
            path: "/homepage",
            params: "",
            badge: 0
        },
        // {
        //     id: 2,
        //     title: t("Home.trending"),
        //     icon: ICON.trend,
        //     iconAct: ICON.trendAct,
        //     path: "/xu-huong",
        //     params: "",
        //     badge: 0
        // },
        {
            id: 3,
            title: t("Home.cate"),
            icon: ICON.cate,
            iconAct: ICON.cateAct,
            path: "/-danh-muc",
            params: "",
            badge: 0
        },
        {
            id: 4,
            title: t("Bottom.appointment"),
            icon: ICON.calendar,
            iconAct: ICON.calendarAct,
            path: "/lich-hen",
            params: "tab=1",
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
            icon: USER?.avatar ?? ICON.user,
            iconAct: USER?.avatar ?? ICON.userAct,
            path: "/tai-khoan",
            params: "",
            badge: appointment_today?.concat(order_app)?.length
        },
    ];
    const history = useHistory();
    const chooseBtn = (item: any) => {
        scrollTop();
        history.push({
            pathname: item.path,
            search: `${item.params}`
        });
    };
    const pathname = location.pathname;
    let show = false;
    if (paths.includes(pathname)) show = true;
    return (
        show ?
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
            :
            <></>
    );
}
