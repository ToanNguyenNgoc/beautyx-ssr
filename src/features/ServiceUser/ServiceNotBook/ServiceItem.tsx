import { Checkbox } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useSelector } from "react-redux";
import Review from "features/Review";
import dayjs from "dayjs";
import { IServiceSold, IUser_Service } from "interface/servicesUser";
import { IOrganization, ItemReviewed } from "interface";
import { AppContext } from "context/AppProvider";
import { checkTimeExpired, onErrorImg } from "utils";

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
  const itemsReviews: ItemReviewed[] = [
    { id: service.id, name: service.service_name, type: 'SERVICE', image_url: service.image_url }
  ]
  return (
    <>
      {
        org &&
        <Review
          open={open}
          setOpen={setOpen}
          itemsReviews={itemsReviews}
          org={org}
        />
      }
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
              marginLeft: '-16px'
            }}
            checked={servicesBook_id.includes(parseInt(`${order_id}${service.id}`))}
          />
          <div className="treatment-ser-item__img">
            <img
              style={{ width: '100%', height: '100%' }}
              src={service?.image_url ?? org?.image_url}
              onError={(e) => onErrorImg(e)}
              alt=""
            />
          </div>
          <div className="treatment-ser-item__cnt">
            <span className="ser-name">
              {service?.service_name}
            </span>
            <span className="ser-desc">
              {service.description !== null && service.description }
            </span>
            <div className="flex-row-sp">
              {
                service.time_expired &&
                <div
                  style={!dateExpired ? {
                    backgroundColor: 'var(--bg-white)'
                  } : {}}
                  className="quantity-text__time-ex"
                >
                  {t('order.Expired')} | {dayjs(service.time_expired).format('DD/MM/YYYY')}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceItem;
