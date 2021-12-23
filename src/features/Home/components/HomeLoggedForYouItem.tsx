import React from "react";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";

export default function HomeLoggedForYouItem(props: any) {
  const { products } = props;
  console.log(products);
  return (
    <div className="homelogged-product__item">
      <div className="item-img">
        <img src="https://source.unsplash.com/random" alt="" />
      </div>
      <div className="item-content">
        <span className="item-content__title">{products.product_name}</span>
        <div className="item-content__info">
          <span className="item-content__info-name">{}</span>
          <div className="price-rate__wrap">
            <div className="price">
              <span>{formatPrice(products.retail_price)}</span>
              <span>
                {formatPrice(products.origin_price)}
                <u>đ</u>
              </span>
            </div>
            <div className="rate">
              <span>4.5</span>
              <img src={icon.star} alt="" />
            </div>
          </div>
          <div className="dead-line">
            <span>HSD:</span>
            <span>17 - 9 - 2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}
