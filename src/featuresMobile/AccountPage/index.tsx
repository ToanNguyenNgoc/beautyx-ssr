import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import Bottom from "../Bottom";
import "./accountPage.css";
import AccountForm from "./Components/AccountForm";
import DialogChangeInfo from "./Components/DialogChangeInfo";
import OrderMb from "./Components/Orders";
import AccountGuide from "./Components/AccountGuide";
import { AppContext } from "../../context/AppProvider";
import { logoutUser } from "../../redux/USER/userSlice";
import { onClearApps } from "../../redux/appointment/appSlice";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";
import languages from "../../data/languages";
import i18next from "i18next";
import { onSetStatusServicesUser } from "../../redux/order/orderSlice";

export default function AccountMobile() {
    const { t } = useContext(AppContext);
    const { USER } = useSelector((state: any) => state.USER);
    const { ORDER_SERVICES_NOT_BOOK_COUNT } = useSelector(
        (state: any) => state.ORDER
    );
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const dispatch = useDispatch();
    const { setSign, language, setLanguage } = useContext(AppContext);
    const params: any = extraParamsUrl();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const openAcc = params?.address ? true : false;
    const openOrder = params?.order ? true : false;
    const openGuide = params?.guide ? true : false;
    const refUserGuide: any = useRef();
    const handleToggleUserGuide = () => {
        refUserGuide.current.classList.toggle("userGuid-active");
    };
    const gotoOrder = () => {
        history.push("/tai-khoan/lich-su-mua?order=true");
    };
    const gotoAppointment = () => {
        const prevUrl = "/tai-khoan/thong-tin-ca-nhan";
        history.push({
            pathname: "/lich-hen",
            state: { prevUrl },
        });
    };
    const gotoAddress = () => {
        history.push("/tai-khoan/thong-tin-ca-nhan?address=true");
    };
    const gotoAccountGuide = () => {
        history.push("/tai-khoan/thong-tin-ca-nhan?guide=true");
    };
    const handleSignOut = () => {
        setSign(false);
        dispatch(logoutUser());
        dispatch(onClearApps());
        dispatch(onSetStatusServicesUser())
        history.push("/homepage")
        localStorage.removeItem('_WEB_TK')
        window.sessionStorage.removeItem('_WEB_TK')
    }
    const onChangeLanguage = (item: any) => {
        setLanguage(item.code)
        i18next.changeLanguage(item.code);
    };
    return (
        <div className="accountMobile">
            {USER && <DialogChangeInfo USER={USER} open={open} setOpen={setOpen} />}
            {/* top */}
            <div className="accountMobile-top">
                <div className="accountMobile-top__img">
                    <img src={USER?.avatar} alt="" />
                </div>
                <div className="accountMobile-top__info">
                    <p className="accountMobile-top__name">{USER?.fullname}</p>
                    <div className="accountMobile-top__phone">
                        <img src={icon.phoneWhite} alt="" />
                        <span>{USER?.telephone}</span>
                    </div>
                    <div className="accountMobile-top__email">
                        <img src={icon.emailWhite} alt="" />
                        <span>{USER?.email}</span>
                    </div>
                </div>
                <div
                    onClick={() => setOpen(true)}
                    className="accountMobile-top__edit"
                >
                    <p>{t("se.edit")}</p>
                    <img src={icon.editWhiteAcc} alt="" />
                </div>
            </div>
            {/* mid */}
            <div className="accountMobile-mid">
                <ul className="accountMobile-mid__list">
                    <li
                        onClick={() => {
                            gotoOrder();
                        }}
                        className="accountMobile-mid__item"
                    >
                        <div className="item-left__wrap">
                            <div className="item-left">
                                <div>
                                    <img src={icon.boxAcc} alt="" />
                                </div>
                                <span>{t("order.order_his")}</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                    <li className="accountMobile-mid__item">
                        <div
                            onClick={gotoAppointment}
                            className="item-left__wrap"
                        >
                            <div className="item-left">
                                <div>
                                    <img src={icon.calendarAcc} alt="" />
                                </div>
                                <span>{t("Bottom.appointment")}</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                    <li className="accountMobile-mid__item">
                        {ORDER_SERVICES_NOT_BOOK_COUNT > 0 && (
                            <span className="accountMobile-mid__item-noti"></span>
                        )}
                        <div
                            onClick={() => history.push("/lich-hen?tab=2")}
                            className="item-left__wrap"
                        >
                            <div className="item-left">
                                <div>
                                    <img
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                        }}
                                        src={icon.servicesPurpleBold}
                                        alt=""
                                    />
                                </div>
                                <span>{t("app.my_services")}</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                    {/* <li className="accountMobile-mid__item">
                        <div className="item-left__wrap">
                            <div className="item-left">
                                <div>
                                    <img src={icon.Clock_purple} alt="" />
                                </div>
                                <span>Đang theo dõi</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li> */}
                    <li className="accountMobile-mid__item">
                        <div onClick={gotoAddress} className="item-left__wrap">
                            <div className="item-left">
                                <div>
                                    <img src={icon.markerAcc} alt="" />
                                </div>
                                <span>{t("acc.order_address")}</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                    <li className="accountMobile-mid__item">
                        <div
                            onClick={() => handleToggleUserGuide()}
                            className="item-left__wrap"
                        >
                            <div className="item-left">
                                <div>
                                    <img
                                        style={{ width: "18px" }}
                                        src={icon.settingPurple}
                                        alt=""
                                    />
                                </div>
                                <span>{t("Header.settings")}</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                        <div ref={refUserGuide} className="item-bot__wrap ">
                            {
                                languages.map((i, index) => (
                                    <div
                                        onClick={() => onChangeLanguage(i)}
                                        key={index} className="item-bot__item"
                                    >
                                        <img
                                            style={{ width: "32px" }}
                                            src={i.icon}
                                            alt=""
                                        />
                                        <span style={i.code === language ? { color: "var(--purple)" } : {}} >{i.title}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </li>
                    {FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX && (
                        <li className="accountMobile-mid__item">
                            <div
                                onClick={handleSignOut}
                                className="item-left__wrap"
                            >
                                <div className="item-left">
                                    <div>
                                        <img
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                            src={icon.SignOutPurple}
                                            alt=""
                                        />
                                    </div>
                                    <span>{t("Header.sign_out")}</span>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            {/* bot */}
            <div onClick={gotoAccountGuide} className="accountMobile-bot">
                <div className="accountMobile-bot__tutorial">
                    <img src={icon.book} alt="" />
                    <p>{t("se.guide")}</p>
                </div>
            </div>
            <Bottom />
            <AccountForm open={openAcc} />
            <OrderMb openOrder={openOrder} />
            <AccountGuide open={openGuide} />
        </div>
    );
}
