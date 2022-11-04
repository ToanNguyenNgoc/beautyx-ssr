import React from "react";
import icon from "../../../../../constants/icon";

export default function ServiceItem() {
  return (
    <div className="service-item">
      <div className="service-item__img">
        <img src="https://source.unsplash.com/random" alt="" />
      </div>
      <div className="service-item__content">
        <div>
          <span className="title">
            Liệu trình trẻ hóa da công nghệ Thermage
          </span>
          <span className="name">Kanessa Beauty & Spa</span>
        </div>
        <div className="infor">
          <div className="infor-item">
            <img src={icon.Tumer} alt="" />
            <div className="infor-item__wrap">
              <span>Thời gian</span>
              <span>02 giờ</span>
            </div>
          </div>
          <div className="infor-item">
            <img src={icon.DeskAlt} alt="" />
            <div className="infor-item__wrap">
              <span>Số lượng chưa dùng</span>
              <span>2/3 gói</span>
            </div>
          </div>
        </div>

        <div className="price">
          <span>
            12.000.000<u>đ</u>
          </span>
          <div className="prive-booking">
            <div className="payment">
              <span>Thanh toán</span>
            </div>
            <div className="payment">
              <span>Đặt hẹn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
