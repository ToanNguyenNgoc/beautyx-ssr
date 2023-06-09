import React, { useContext, useState } from "react";
import { IServiceUser, IUser_Items } from "interface/servicesUser";
import ServiceSoldItem from "./ServiceSoldItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppContext } from "context/AppProvider";
import { XButton } from "components/Layout";
import dayjs from "dayjs";
import { useDeviceMobile } from "hooks";

interface IProps {
    card_items: IServiceUser,
    checkTimeExpired: (items: IUser_Items[]) => boolean
}

function TreatmentCardItem(props: IProps) {
    const history = useHistory();
    const IS_MB = useDeviceMobile()
    const { card_items, checkTimeExpired } = props;
    const org = card_items.organization;
    const { t } = useContext(AppContext) as any;
    const [enableCart, setEnableCart] = useState(true);
    const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
    const servicesBook = servicesBookSlice.servicesBook;
    const order_id = servicesBookSlice?.order_id;
    const handleNextStep = () => {
        if (servicesBook.length > 0) {
            const services = servicesBook.map((item: any) => {
                return {
                    service: item,
                    quantity: 1,
                };
            });
            history.push({
                pathname: "/dat-hen",
                state: { org, services, order_id },
            });
        }
    };
    return (
        <div 
            style={(
                card_items.appointments?.length === 0 && checkTimeExpired(card_items.items) && IS_MB
            ) ? {
                backgroundColor:'var(--grey)'
            }:{}}
            className='treat-card-item'
        >
            {(card_items.appointments?.length === 0 && checkTimeExpired(card_items.items)) &&
                <div className='treat-card-item__dot'></div>
            }
            <div className="treat-card-item__head">
                <span className="org-name">{org?.name}</span>
                <div className="head_detail">
                    <div className="time">
                        {`${t("acc.date_created")}:`}
                        <span>{dayjs(card_items?.created_at).format('DD/MM/YYYY')}</span>{" "}
                        <span>{dayjs(card_items?.created_at).format('HH:mm')}</span>
                    </div>
                    <div className="code">
                        {`${t("pm.code_orders")}: `}
                        <span>
                            {card_items?.payment_gateway?.transaction_uuid}
                        </span>
                    </div>
                </div>
            </div>
            <span className="flex-row-sp treat-card-item__ser-count">
                <span className="title">{`${t("pm.service_list")}`}</span>
                {enableCart && <div style={{ color: "var(--red-cl)" }} className="title">{t("pr.end_of_use")}</div>}
            </span>
            {card_items?.items?.map((items: IUser_Items, index: number) => (
                <ServiceSoldItem
                    key={index}
                    setEnableCart={setEnableCart}
                    card_items={card_items}
                    org={org}
                    service_sold={items.services_sold}
                />
            ))}
            <div
                style={
                    order_id === card_items?.id && servicesBook.length > 0 ?
                        { height: '32px' } : {}
                }
                className='treatment_card_item_bot'>
                <XButton
                    onClick={handleNextStep}
                    title={t("detail_item.booking_now")}
                    className='treatment_card_item_bot_btn'
                />
            </div>
        </div>
    );
}

export default TreatmentCardItem;
