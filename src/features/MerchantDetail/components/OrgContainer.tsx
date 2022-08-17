import React, { useContext, useEffect, useRef } from "react";
import { IOrganization } from "../../../interface/organization";
import { onActiveTab } from "../../../redux/org/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import OrgDealHot from "./OrgPages/OrgDealHot";
import OrgServices from "./OrgPages/OrgServices";
import OrgProducts from "./OrgPages/OrgProducts";
import OrgCombos from "./OrgPages/OrgCombos";
import OrgInformation from "./OrgPages/OrgInformation";
import OrgReviews from "./OrgPages/OrgReviews";
import OrgGalleries from "./OrgPages/OrgGalleries/OrgGalleries";
import useFullScreen from "../../../utils/useDeviceMobile";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AppContext } from "../../../context/AppProvider";

interface IProps {
    org: IOrganization;
    tab: any;
}
interface ITabs {
    id: number;
    title: string;
}

function OrgContainer(props: IProps) {
    const is_mb = useFullScreen();
    const { t } = useContext(AppContext)
    const { totalItem } = useSelector((state: any) => state.ORG_COMMENTS);
    const { org, tab } = props;
    const dispatch = useDispatch();
    let tabs = [
        { id: 1, title: "Deal Hot" },
        { id: 2, title: t("Mer_de.services") },
        { id: 3, title: t("Mer_de.products") },
        { id: 4, title: "Combo" },
        { id: 5, title: is_mb ? t("app.details") : t("pr.merchant_detail") },
        { id: 6, title: `${t("Mer_de.feedback")} (${totalItem > 30 ? "30+" : totalItem})` },
        { id: 7, title: t("Mer_de.galleries") },
    ];
    // special merchant 
    const SPECIAL_MERCHANT_ID = '1626'
    if (SPECIAL_MERCHANT_ID == org.id.toString()) {
        tabs = [
            { id: 1, title: "Deal Hot" },
            // { id: 2, title: t("Mer_de.services") },
            { id: 2, title: t("Mer_de.products") },
            { id: 3, title: "Combo" },
            { id: 4, title: is_mb ? t("app.details") : t("pr.merchant_detail") },
            { id: 5, title: `${t("Mer_de.feedback")} (${totalItem > 30 ? "30+" : totalItem})` },
            { id: 6, title: t("Mer_de.galleries") },
        ]
    }
    // end 
    if (is_mb === false) {
        tabs = tabs.filter((item: any) => item.id !== 6);
    }
    let refMap = useRef<any>();
    let refReview = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        dispatch(onActiveTab(value));
        let top;
        switch (value) {
            case 5:
                top = is_mb && 0;
                break;
            case 6:
                top = refReview?.current?.offsetTop + 180;
                break;
            default:
                break;
        }
        if (is_mb) {
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    };
    function handleScroll() {
        if (tab === 5 || tab === 6) {
            if (window.scrollY - 170 <= scrollReview) {
                dispatch(onActiveTab(5));
            } else if (window.scrollY >= scrollMap) {
                dispatch(onActiveTab(6));
            }
        }
    }
    const onSwitchTab = (value: any) => {
        if (SPECIAL_MERCHANT_ID == org.id.toString()) {
            switch (value) {
                case 1:
                    return <OrgDealHot />;
                case 2:
                    return <OrgProducts org={org} />;
                case 3:
                    return <OrgCombos org={org} />;
                case 4:
                    return (
                        <div className="org-information-cnt">
                            <OrgInformation refMap={refMap} org={org} />
                            <OrgReviews refReview={refReview} org={org} />
                        </div>
                    );
                case 5:
                    return (
                        <div className="org-information-cnt">
                            <OrgInformation refMap={refMap} org={org} />
                            <OrgReviews refReview={refReview} org={org} />
                        </div>
                    );
                case 6:
                    return <OrgGalleries />;
            }
        } else {
            switch (value) {
                case 1:
                    return <OrgDealHot />;
                case 2:
                    return <OrgServices org={org} />;
                case 3:
                    return <OrgProducts org={org} />;
                case 4:
                    return <OrgCombos org={org} />;
                case 5:
                    return (
                        <div className="org-information-cnt">
                            <OrgInformation refMap={refMap} org={org} />
                            <OrgReviews refReview={refReview} org={org} />
                        </div>
                    );
                case 6:
                    return (
                        <div className="org-information-cnt">
                            <OrgInformation refMap={refMap} org={org} />
                            <OrgReviews refReview={refReview} org={org} />
                        </div>
                    );
                case 7:
                    return <OrgGalleries />;
            }
        }
    };
    useEffect(() => {
        if (is_mb) {
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll, false);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    return (
        <>
            <div className="org-container">
                <div className="org-container__tab-cnt">
                    <TabContext value={tab}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            {tabs.map((item: ITabs, i: number) =>
                                <Tab
                                    key={i}
                                    label={item.title}
                                    value={item.id}
                                />
                            )}
                        </TabList>
                        <TabPanel value={tab}>{onSwitchTab(tab)}</TabPanel>
                    </TabContext>
                </div>
            </div>
        </>
    );
}

export default OrgContainer;
