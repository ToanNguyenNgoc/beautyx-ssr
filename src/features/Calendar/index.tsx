/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import HeadTitle from "../HeadTitle";
import Head from "../Head";
import { Container, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./style.css";
import HomeLoggedCalendar from "../Apointment/HomeLoggedCalendar";
import ServicesUser from "../ServiceUser";
import icon from "../../constants/icon";
import { clearAllServices } from "../../redux/servicesBookSlice";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import Bottom from "../../featuresMobile/Bottom";
import { AppContext } from "../../context/AppProvider";
import Footer from "../Footer";
import useDeviceMobile from "../../utils/useDeviceMobile";

function Calendar() {
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const dispatch = useDispatch();
    const history = useHistory();
    const location: any = useLocation();
    const params: any = extraParamsUrl();
    const tabList = [
        { value: "1", title: t("Bottom.appointment") },
        { value: "2", title: t("Đặt lịch") },
        { value: "3", title: t("my_ser.booking_his") },
    ];
    const [valueTab, setValueTab] = useState(params?.tab || "1");
    const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
        history.push(`/lich-hen?tab=${newValue}`);
    };
    useEffect(() => {
        dispatch(clearAllServices());
        console.log(params.tab);
        (params.tab)&&(params.tab !== valueTab)&&setValueTab(params.tab);
    }, []);
    useEffect(()=>{(params.tab)&&(params.tab !== valueTab)&&setValueTab(params.tab);},[params.tab]);
    const onGoBack = () => {
        if (location.state?.prevUrl) {
            history.goBack(`${location.state?.prevUrl}`);
        } else {
            history.push("/");
        }
    };
    console.log('render');
    return (
        <>
            <HeadTitle title="Lịch hẹn" />
            {!IS_MB && <Head />}
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
                        </Container>
                        <TabPanel value="1">
                            <HomeLoggedCalendar />
                        </TabPanel>
                        <TabPanel value="2">
                            <ServicesUser />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
            <Bottom />
            <Footer />
        </>
    );
}

export default Calendar;
