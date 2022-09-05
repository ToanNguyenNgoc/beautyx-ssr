import React, { useContext, useState } from "react";
import "./orderDetail.css";
import ButtonCus from "../../components/ButtonCus";
import formatPrice from "../../utils/formatPrice";
import TabOrder from "./components/TabOrder";
import { Dialog, Slide } from "@mui/material";
import icon from "../../constants/icon";
import { TransitionProps } from "@mui/material/transitions";
//import slugify from "../../utils/formatUrlString";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import scrollTop from "../../utils/scrollTop";
import onErrorImg from "../../utils/errorImg";
import formatDate from "../../utils/formatDate";
import useFullScreen from "../../utils/useDeviceMobile";
import { IOrderV2 } from '../../interface/orderv2';
import HeadMobile from "../HeadMobile";

const view = window.screen.width;
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction={view < 767 ? "left" : "up"} ref={ref} {...props} />;
});


function OrderDetail(props: any) {
  const history = useHistory();
  const IS_MB = useFullScreen();
  const { t } = useContext(AppContext);
  const { open, setOpen, org, countItem } = props;
  const order: IOrderV2 = props.order;

  const [acTab, setAcTab] = useState();
  const handleDetailMerchant = () => {
    scrollTop();
    history.push({
      pathname: `/cua-hang/${org.subdomain}`,
      search: `${org.id}`,
      state: org,
    });
  };
  const handleBack = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleBack}
      fullScreen={IS_MB}
      TransitionComponent={Transition}
    >
      {IS_MB && <HeadMobile onBackFunc={handleBack} title="Chi tiết đơn hàng" />}
      <div className="order-de">
        <div className="flex-row-sp order-de__head">
          <span className="flex-row order-de__head-title">
            <img onClick={handleBack} src={icon.chevronLeft} alt="" />
            {t("order.order_de")}
          </span>
          <div className="flex-row order-de__head-date">
            <span className="flex-row date">
              {t("booking.date")} Order: <h4>{formatDate(order?.created_at)}</h4>
            </span>
            <span className="flex-row time">
              {t("order.time")}: <h4>{order?.created_at?.split(' ')[1]}</h4>
            </span>
          </div>
        </div>
        <div className="order-de__count">
          <span className="flex-row count">
            {t("pr.total")}:
            <h4>
              {" "}
              {formatPrice(order?.payment_gateway?.amount)}đ ({countItem} item)
            </h4>
          </span>
        </div>
        <div className="flex-row order-de__org">
          <img
            src={org?.image_url}
            alt=""
            className="order-de__org-img"
            onError={(e) => onErrorImg(e)}
          />
          <div className="order-de__org-cnt">
            <span className="name">{org?.name}</span>
            <span className="address">{org?.full_address}</span>
            <ButtonCus
              onClick={handleDetailMerchant}
              text={t("order.view_org")}
              backColor="var(--purple)"
              padding="6px 8px"
              color="var(--bgWhite)"
              borderRadius="14px"
              width="fit-content"
            />
          </div>
        </div>
        <TabOrder
          org={org}
          order={order}
          acTab={acTab}
          setAcTab={setAcTab}
          open={open}
        />
      </div>
    </Dialog>
  );
}

export default OrderDetail;
