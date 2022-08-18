import React from "react";
import ProductItem from "./ProductItem";
import { ORDER_SHIP_STATUS, IORDER_SHIP_STATUS } from '../../../../utils/formatRouterLink/fileType'

function ProductsTab(props: any) {
  const { products, tab_id, org, open } = props;
  const origin_id = 0;
  const stepOrigin = ORDER_SHIP_STATUS.find(i => i.id === origin_id) || ORDER_SHIP_STATUS[0];
  // console.log(stepOrigin);
  return (
    <div
      className="order-list-item__wrap"
      style={tab_id === 1 ? { display: "block" } : { display: "none" }}
    >
      <div className="order-de-ship-status">
        <span className="title">
          Trạng thái giao nhận
        </span>
        <div className="order-de-ship-status__time-line">
          {
            stepOrigin.id !== 4 ?
              <>
                <div className="line">
                  <div style={{ width: `${stepOrigin.process}%` }} className="child"></div>
                </div>
                <ul className="flex-row-sp">
                  {
                    ORDER_SHIP_STATUS
                      .filter((i: IORDER_SHIP_STATUS) => i.id !== 4)
                      .map((i: IORDER_SHIP_STATUS) => (
                        <li key={i.id}>
                          <div
                            style={(stepOrigin?.id >= i.id) ? { color: "var(--orange" } : {}}
                            className="flex-column status-item">
                            <span
                              style={(stepOrigin?.id >= i.id) ? { backgroundColor: "var(--orange" } : {}}
                              className="ship-status-item__step"
                            >
                              {i.id}
                            </span>
                            <span className="ship-status-item__title">
                              {i.title}
                            </span>
                            {/* <span className="ship-status-item__time">
                              4 th07 20:30
                            </span> */}
                          </div>
                        </li>
                      ))
                  }
                </ul>
              </>
              :
              <>
                <div className="ship-cancel-status">
                  {stepOrigin.title}{" "}(5 Th06 20:00)
                </div>
              </>
          }
        </div>
      </div>
      <ul className="order-item-list">
        {products?.map((item: any, index: number) => (
          <ProductItem open={open} key={index} productItem={item} org={org} />
        ))}
      </ul>
    </div>
  );
}

export default ProductsTab;
