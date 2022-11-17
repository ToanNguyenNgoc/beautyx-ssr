import React, { useContext } from "react";
import { Dialog, Slide } from "@mui/material";
import "./appointment-detail.css";
import { TransitionProps } from "@mui/material/transitions";
import formatPrice from "../../utils/formatPrice";
import onErrorImg from "../../utils/errorImg";
import { Service } from "../../interface/service";
import HeadMobile from "../HeadMobile";
import { AppContext } from "../../context/AppProvider";
import { useDeviceMobile } from "hooks";

const view = window.screen.width;
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return (
        <Slide direction={view < 768 ? "left" : "up"} ref={ref} {...props} />
    );
});

function AppointmentDetail(props: any) {
    const { openPopupDetail, setOpenPopupDetail, datingList } = props;
    const fullScreen = useDeviceMobile();
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    function handleClosePopupDetail() {
        setOpenPopupDetail(false);
    }
    const { services } = datingList;
    return (
        <Dialog
            fullScreen={fullScreen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClosePopupDetail}
            open={openPopupDetail}
        >
            {IS_MB && (
                <HeadMobile
                    onBack={() => setOpenPopupDetail(false)}
                    title={`${t("order.appo_detail")}`}
                />
            )}
            {openPopupDetail === true ? (
                <div className="app-de">
                    <div className="flex-row-sp app-de__head">
                        <div className="flex-row app-de__head-status">
                            <div className="flex-row app-de__head-status-it">
                                <span></span>
                                {datingList.status?.length === 0
                                    ? "Chưa xác nhận"
                                    : datingList.status}
                            </div>
                        </div>
                        <div className="flex-row">
                            <span className="flex-row app-de__head-date">
                                {`${t("booking.date")}`}:{" "}
                                <h4>{datingList.date}</h4>
                            </span>
                            <span className="flex-row app-de__head-time">
                                {`${t("booking.time")}`}{" "}
                                <h4>{datingList.time_start}</h4>
                            </span>
                        </div>
                    </div>
                    <div className="app-de__ser">
                        <span className="app-de__ser-head">
                            {t("Mer_de.services")}: ({services?.length}{" "}
                            {t("Mer_de.services")})
                        </span>
                        <ul className="app-de__ser-list">
                            {services?.map((item: Service, index: number) => (
                                <li key={index} className="app-de__ser-item">
                                    <div className="item">
                                        <img
                                            src={
                                                item.image
                                                    ? item?.image_url
                                                    : datingList?.organization
                                                        ?.image_url
                                            }
                                            onError={(e) => onErrorImg(e)}
                                            alt=""
                                            className="item-img"
                                        />
                                        <div className="item-content">
                                            <div className="item-content__name">
                                                {item.service_name}
                                            </div>
                                            <div className="flex-row-sp item-count__price">
                                                <span>
                                                    {formatPrice(
                                                        item.special_price < 0
                                                            ? item.price
                                                            : item.special_price
                                                    )}
                                                    <u>đ</u>
                                                </span>{" "}
                                                <span> x1</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="app-de__address">
                        <span className="app-de__ser-head">
                            {t("pm.address")}
                        </span>
                        <div className="app-de__address-txt">
                            {datingList.branch
                                ? datingList.branch?.full_address
                                : datingList.organization?.full_address}
                        </div>
                    </div>
                    <div className="app-de__address">
                        <span className="app-de__ser-head">{t("pm.note")}</span>
                        <div className="app-de__address-txt">
                            {datingList.note}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Dialog>
    );
}

export default AppointmentDetail;
