/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import TabOrderCancel from "./components/TabOrderCancel";
import TabOrderPaid from "./components/TabOrderPaid";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { HeadTitle } from "pages/Account";
import { AppContext } from "context/AppProvider";
import "./order.css";

function Orders() {
  const { t } = useContext(AppContext);
  const [tab, setTab] = useState('PAID')
  const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
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
                <Tab label={t('acc.pain')} value="PAID" />
                <Tab label={t('acc.all')} value="CANCEL" />
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
