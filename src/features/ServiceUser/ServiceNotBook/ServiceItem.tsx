import { Checkbox } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
//import formatPrice from "../../../utils/formatPrice";
import { IUser_Service, IServiceSold } from "../../../interface/servicesUser";
import onErrorImg from "../../../utils/errorImg";
import { useSelector } from "react-redux";
import { formatDate, checkTimeExpired } from "../../../utils/format";
import { IOrganization } from "../../../interface/organization";
import ServiceReview from "../ServiceReview";
//import { Appointment } from '../../../interface/appointment'

interface IProps {
  service: IUser_Service;
  handleServiceBook: any;
  order_id: number;
  service_sold: IServiceSold;
  org: IOrganization | undefined;
}

function ServiceItem(props: IProps) {
  const { t } = useContext(AppContext);
  const {
    service,
    handleServiceBook,
    order_id,
    org,
    //service_sold
  } = props;
  const [open, setOpen] = useState(false);
  const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
  //const { appointments } = useSelector((state: any) => state.APP.APPS);

  //const APPOINT_BY_ORDER_ID: Appointment = appointments.find((val: Appointment) => val.order_id === order_id);
  //const services_appointment = APPOINT_BY_ORDER_ID?.services;

  //const service_item_app = services_appointment?.filter((i: any) => i.id === service.id);


  const servicesBook = servicesBookSlice.servicesBook;
  const servicesBook_id = servicesBook.map((item: any) => item.ser_book_id);
  const dateExpired = checkTimeExpired(service?.time_expired)
  const handleAddService = () => {
    if (handleServiceBook && dateExpired === false) {
      handleServiceBook(service)
    }
  }
  const onOpenServiceReview = useCallback(() => {
    setOpen(true)
  }, [])
  return (
    <>
      <ServiceReview
        open={open}
        setOpen={setOpen}
        service={service}
        org={org}
      />
      <div>
        {
          service.remain_time === 0 &&
          <span
            onClick={onOpenServiceReview}
            className="treatment-ser-item__out"
            style={{ marginRight: "4px" }}
          >
            {t('order.Service used')} | {t('order.Review')}
          </span>
        }
        {/* {
          (service_item_app?.length > 0 && service.remain_time > 0) &&
          <span
            onClick={onOpenServiceReview}
            className="treatment-ser-item__out"
            style={{ marginRight: "4px" }}
          >
            Đang thực hiện
          </span>
        } */}
        {
          (dateExpired && service.remain_time > 0) &&
          <span
            style={{ backgroundColor: "var(--red-cl)", color: "var(--white)" }}
            className="treatment-ser-item__out"
          >
            {t('order.Service has expired')}
          </span>
        }
        <div
          // style={
          //   service.remain_time === 0 || dateExpired ? { opacity: 0.6 } : {}
          // }
          className="treatment-ser-item"
          onClick={handleAddService}
        >
          <Checkbox
            size='small'
            sx={{
              color: "#7161BA",
              "&.Mui-checked": {
                color: "#7161BA",
              },
              marginLeft: '-10px'
            }}
            checked={servicesBook_id.includes(parseInt(`${order_id}${service.id}`))}
          />
          <div className="treatment-ser-item__img">
            <img
              style={{ width: '100%', height: '100%' }}
              src={service?.image_url}
              onError={(e) => onErrorImg(e)}
              alt=""
            />
          </div>
          <div className="treatment-ser-item__cnt">
            <span className="ser-name">
              {service?.service_name}
            </span>
            <span className="ser-desc">
              {service.description !== null && service.description}
            </span>
            <div className="flex-row-sp">
              {
                service.time_expired &&
                <div className="quantity-text__time-ex">
                  {t('order.Expired')} | {formatDate(service.time_expired)}
                </div>
              }
              <div className="flex-row quantity">
                <div className="quantity-text">
                  {
                    service.unlimited === true ?
                      <span>{t('order.Unlimited')}</span>
                      :
                      <span>{t('order.Used')} {service.times - service.remain_time}/{service.times}</span>
                  }
                </div>
              </div>
              {/* {
              service?.time_expired?.slice(0, 5) > 0 &&
              <span className="date-time_expired">HSD:{formatDate(service?.time_expired)}</span>
            } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceItem;
