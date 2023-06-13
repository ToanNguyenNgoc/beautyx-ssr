/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { Container, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./style.css";
import ServicesUser from "features/ServiceUser";
import icon from "constants/icon";
import { useHistory } from "react-router-dom";
import { extraParamsUrl } from "utils/extraParamsUrl";
import { AppContext } from "context/AppProvider";
import { ApointmentTab } from "pages/Apointment";

function Calendar() {
    const { t } = useContext(AppContext) as any;
    const history = useHistory();
    const params: any = extraParamsUrl();
    const tabList = [
        { value: "1", title: t("Bottom.appointment") },
        { value: "2", title: t("order.book") },
        { value: "3", title: t("my_ser.booking_his") },
    ];
    const [valueTab, setValueTab] = useState(params?.tab || "1");
    const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
        history.replace(`/lich-hen?tab=${newValue}`);
    };
    const onGoBack = () => history.goBack()
    return (
        <>
            <div className="cal-cnt">
                <div className="cal-cnt__tab-cnt">
                    <TabContext value={valueTab}>
                        <Container>
                            <div className="cal-cnt__tab-cnt-head">
                                <button onClick={onGoBack} className="back-btn">
                                    <img src={icon.chevronLeft} alt="" />
                                </button>
                                <TabList
                                    className="cal-cnt__tab-list"
                                    onChange={onChangeTab}
                                >
                                    {tabList.map((item, index) => (
                                        <Tab
                                            key={index}
                                            label={item.title}
                                            value={item.value}
                                        />
                                    ))}
                                </TabList>
                                <div
                                    style={{ width: "24px", height: "24px" }}
                                ></div>
                            </div>
                            <TabPanel value="1">
                                <ApointmentTab />
                            </TabPanel>
                            <TabPanel value="2">
                                <ServicesUser />
                            </TabPanel>
                        </Container>
                    </TabContext>
                </div>
            </div>
        </>
    );
}

export default Calendar;
