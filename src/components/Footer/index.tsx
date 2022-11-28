import React, { useContext } from "react";
import "./footer.css";
import { Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import slugify from "../../utils/formatUrlString";
import scrollTop from "../../utils/scrollTop";
import img, { paymentMethod, social } from "../../constants/img";
import icon from "../../constants/icon";
import { AppContext } from "../../context/AppProvider";

function Footer() {
    const url_map = `https://goo.gl/maps/dnGMKnfdeB91xCj7A`;
    const { t } = useContext(AppContext);
    const data_footer = [
        {
            id: 1,
            title: `${t("footer.customer_support")}`,
            items: [
                {
                    id: 11,
                    title: `${t(
                        "footer.consultation_call_center"
                    )}: 0899310908`,
                    type: "NUMBER",
                    url: "0899310908",
                },
                {
                    id: 12,
                    title: `${t(
                        "footer.customer_care_call_center"
                    )} : 02899959938`,
                    type: "NUMBER",
                    url: "0289 9959 938",
                },
                {
                    id: 13,
                    title: "sales@myspa.vn",
                    type: "EMAIL",
                    url: "sales@myspa.vn",
                },
                {
                    id: 14,
                    title: "support@myspa.vn",
                    type: "EMAIL",
                    url: "support@myspa.vn",
                },
                {
                    id: 15,
                    title: `${t("footer.privacy_policy")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 16,
                    title: `${t("footer.return_and_refund")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 17,
                    title: `${t("footer.protect_the_interests_of_customers")}`,
                    type: "URL",
                    url: "/",
                },
            ],
        },
        {
            id: 2,
            title: `${t("footer.myspa_company")}`,
            items: [
                {
                    id: 20,
                    title: `${t("footer.operating_regulations")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 21,
                    title: `${t("footer.general_rules")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 22,
                    title: `${t("footer.commodity_trading_regulations")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 23,
                    title: `${t("footer.payment_process")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 24,
                    title: `${t("footer.secure_transaction")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 26,
                    title: `${t("footer.responsibility")}`,
                    type: "URL",
                    url: "/",
                },
                {
                    id: 27,
                    title: `${t("footer.terms_and_commitments")}`,
                    type: "URL",
                    url: "/",
                },
            ],
        },
    ];
    const social_list: any = [
        {
            id: 1,
            img: social.facebook,
            type: "SOCIAL",
            url: "https://www.facebook.com/beautyxdatlichlamdep/",
        },
        {
            id: 2,
            img: social.instagram,
            type: "SOCIAL",
            url: "https://www.instagram.com/myspa.vn_phanmemquanlyspa/",
        },
        {
            id: 3,
            img: social.tiktok,
            type: "SOCIAL",
            url: "https://www.tiktok.com/@beautyx.vn",
        },
        {
            id: 4,
            img: social.youtube,
            type: "SOCIAL",
            url: "https://www.youtube.com/channel/UCAWXbDX56x8OhJyA1cjIFRA",
        },
    ];
    const downList = [
        {
            id: 1,
            type: "DOWN",
            img: img.playStore,
            url: "https://play.google.com/store/apps/details?id=com.myspa.beautyx",
        },
        {
            id: 2,
            type: "DOWN",
            img: img.appStore,
            url: "https://apps.apple.com/vn/app/beautyx/id1614767784?l=vi",
        },
    ];
    const payment = [
        // {
        //     id: 1,
        //     img: paymentMethod.tikiPay,
        // },
        // {
        //     id: 2,
        //     img: paymentMethod.visa,
        // },
        // {
        //     id: 3,
        //     img: paymentMethod.masterCard,
        // },
        // {
        //     id: 4,
        //     img: paymentMethod.jcb,
        // },
        // {
        //     id: 5,
        //     img: paymentMethod.atm,
        // },
        {
            id: 6,
            img: paymentMethod.momoPayment,
        },
        // {
        //     id: 7,
        //     img: paymentMethod.zaloPay,
        // },
        // {
        //     id: 8,
        //     img: paymentMethod.mocaGrap,
        // },
        // {
        //     id: 9,
        //     img: paymentMethod.phonePay,
        // },
        // {
        //     id: 10,
        //     img: paymentMethod.vnPay,
        // },
        {
            id: 11,
            img: paymentMethod.handPay,
        },
        // {
        //     id: 12,
        //     img: icon.payon,
        // },
    ];
    const app = [
        {
            id: 1,
            img: icon.momo,
            type: "APP",
            url: "bit.ly/myspamomo",
        },
        {
            id: 2,
            img: paymentMethod.tikiPay,
            type: "APP",
            url: "https://ti.ki/beautyx12 ",
        },
    ];
    const history = useHistory();
    const gotoPolicy = (item: any) => {
        scrollTop();
        switch (item.type) {
            case "NUMBER":
                return window.open(`tel:${item.url}`, "_seft");
            case "EMAIL":
                return window.open(`mailto:${item.url}`);
            case "URL":
                return history.push({
                    pathname: `/chinh-sach/${slugify(item.title)}?id=${item.id}`,
                    state: item,
                });
            case "SOCIAL":
                return window.open(
                    `${item.url}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            case "DOWN":
                return window.open(
                    `${item.url}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            case "APP":
                return window.open(
                    `${item.url}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            default:
                break;
        }
    };
    return (
        <div className="footer">
            <Container>
                <div className="footer-cnt">
                    <div className="footer-left">
                        {data_footer.map((item, index) => (
                            <div key={index} className="wrap">
                                <div className="footer-cnt__item">
                                    <div className="footer-cnt__item-title">
                                        {item.title}
                                    </div>
                                    <ul>
                                        {item.items.map((a: any, i: number) => (
                                            <li
                                                onClick={() => gotoPolicy(a)}
                                                key={i}
                                            >
                                                {a.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="footer-right">
                        <div className="wrap">
                            <>
                                <div className="footer-cnt__item-title">
                                    {t("footer.payment_method")}
                                </div>
                                <div
                                    style={{ marginTop: "16px" }}
                                    className="social-list"
                                >
                                    {payment.map((item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="social-item__method social-item"
                                        >
                                            <div className="social-item__img">
                                                <img src={item.img} alt="" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    style={{ marginTop: "24px" }}
                                    className="footer-cnt__item-title"
                                >
                                    {t("footer.beautyx_is_on")}
                                </div>
                                <div className="social-list">
                                    <div className="flexX-gap-16">
                                        {app.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                onClick={() => gotoPolicy(item)}
                                                className="social-item__img cursor-pointer"
                                            >
                                                <img src={item.img} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        </div>
                        <div className="wrap">
                            <>
                                <div className="footer-cnt__item-title">
                                    {t("footer.contact_width_me")}
                                </div>
                                <div className="social-list">
                                    {social_list.map(
                                        (item: any, index: number) => (
                                            <div
                                                key={index}
                                                onClick={() => gotoPolicy(item)}
                                                className="social-item"
                                            >
                                                <div className="social-item__img">
                                                    <img
                                                        src={item.img}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div
                                    style={{ marginTop: "24px" }}
                                    className="footer-cnt__item-title"
                                >
                                    {t("footer.download_app")}
                                </div>
                                <div className="down-app">
                                    <div className="down-app__qr">
                                        <img src={img.qrCode} alt="" />
                                    </div>
                                    <div className="down-app__wrap">
                                        {downList.map(
                                            (item: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="down-app__btn"
                                                >
                                                    <img
                                                        onClick={() =>
                                                            gotoPolicy(item)
                                                        }
                                                        src={item.img}
                                                        alt=""
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
                <div
                    className="address"
                    onClick={() =>
                        window.open(
                            `${url_map}`,
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                >
                    {t("footer.address_company")}
                </div>
                <div className="footer-copy-right">
                    {t("footer.policy")}
                </div>
                <div className="footer-copy-right">
                    © 2018 Copyright Myspa | ProductX teams.
                </div>
            </Container>
        </div>
    );
}

export default Footer;
