/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import TabOrderCancel from "./components/TabOrderCancel";
import TabOrderPaid from "./components/TabOrderPaid";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  onSetTab
} from "redux/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { HeadTitle } from "pages/Account";
import { AppContext } from "context/AppProvider";
import "./order.css";

function Orders() {
  const { t } = useContext(AppContext);
  const { tab } = useSelector((state: any) => state.ORDER);
  const dispatch = useDispatch();
  const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(onSetTab(newValue))
  }
  return (
    <>
      <HeadTitle title={t("order.order_his")} />
      <div className="order">
        <div className="order-list">
          <div className="order-list-tab">
            <TabContext value={tab}>
              <TabList
                onChange={onChangeTab}
              >
                <Tab label="Đã thanh toán" value="PAID" />
                <Tab label="Tất cả" value="CANCEL" />
              </TabList>
              <TabPanel value="PAID" >
                <TabOrderPaid />
              </TabPanel>
              <TabPanel value="CANCEL" >
                <TabOrderCancel />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
