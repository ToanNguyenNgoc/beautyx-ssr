import React, { useContext, useState } from "react";
import { IServiceUser, IUser_Items } from "interface/servicesUser";
import ServiceSoldItem from "./ServiceSoldItem";
import { formatDate, formatTime } from "utils/format";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppContext } from "context/AppProvider";
import { XButton } from "components/Layout";

interface IProps {
    card_items: IServiceUser,
}

function TreatmentCardItem(props: IProps) {
    const history = useHistory();
    const { card_items } = props;
    const org = card_items.organization;
    const { t } = useContext(AppContext);
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
        <div className='treat-card-item'>
            <div className="treat-card-item__head">
                <span className="org-name">{org?.name}</span>
                <div className="head_detail">
                    <div className="time">
                        {`${t("acc.date_created")}:`}
                        <span>{formatDate(card_items?.created_at)}</span>{" "}
                        <span>{formatTime(card_items?.created_at)}</span>
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
                {enableCart === false ? (
                    <div className="title">
                        {`${t("pr.quantity")}: `}{" "}
                        <span>{card_items?.items_count}</span>
                    </div>
                ) : (
                    <div style={{ color: "var(--red-cl)" }} className="title">
                        {t("pr.end_of_use")}
                    </div>
                )}
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
                        {height:'32px'}:{}
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
