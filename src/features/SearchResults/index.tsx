/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Head from "../Head";
import HeadTitle from "../HeadTitle";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import "./search-results.css";
import { Container, Tab } from "@mui/material";
import TabService from "./components/TabService";
import Footer from "../Footer";
import TabOrgs from "./components/TabOrgs";
import icon from "../../constants/icon";
import { Drawer } from "@mui/material";
import TabProduct from "./components/TabProduct";
import { useDispatch, useSelector } from "react-redux";
import {
    onSetTabResult,
    fetchAsyncOrgsByFilter,
    fetchServicesByFilter,
    fetchProductsByFilter,
    onSetEmptyOrgs,
    onSetEmptyServices,
} from "../../redux/search/searchResultSlice";
import useFullScreen from "../../utils/useDeviceMobile";
import BackTopButton from "../../components/BackTopButton";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import Map from "../../components/Map";
import { STATUS } from "../../redux/status";
import FilterOrgs from "../Filter/FilterOrgs";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FilterService from "../Filter/FilterService";
import { ISortList } from "../Filter/FilterService";

function SearchResults(props: any) {
    const history = useHistory();
    const { t } = useContext(AppContext);
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const location: any = useLocation();
    const params: any = extraParamsUrl();

    const searchKey = params?.keyword;
    const { tab, RE_ORGS, RE_SERVICES, RE_PRODUCTS } = useSelector(
        (state: any) => state.SEARCH_RESULT
    );
    const valueTab = params.tab || tab

    const { FILTER_ORG } = useSelector((state: any) => state.FILTER);
    const FILTER_ORGS_VAL = {
        ...FILTER_ORG,
        tags: FILTER_ORG.tags.join("|"),
        province_code: FILTER_ORG.province?.province_code,
        district_code: FILTER_ORG.district?.district_code,
    };
    const [openMap, setOpenMap] = useState(false);

    let tabs = [
        {
            value: "1",
            title: t("Mer_de.services"),
            total: location.state?.servicesTotal,
        },
        {
            value: "2",
            title: t("Mer_de.products"),
            total: location.state?.productsTotal,
        },
        {
            value: "3",
            title: t("my_ser.business"),
            total: location.state?.orgsTotal,
        },
    ];
    if (location.state) {
        tabs = tabs.sort((a, b) => b.total - a.total);
    }
    //const [valueTab, setValueTab] = useState(params?.tab || "1");
    const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        //setValueTab(newValue);
        // history.push(`/lich-hen?tab=${newValue}`);
        history.push({
            pathname: "/ket-qua-tim-kiem/",
            search: `?keyword=${encodeURIComponent(searchKey)}?tab=${newValue}`,
        });
    };
    const callOrgsByKeyword = () => {
        if (RE_ORGS.status !== STATUS.SUCCESS) {
            dispatch(onSetTabResult(tabs[0].value));
            dispatch(
                fetchAsyncOrgsByFilter({
                    keyword: searchKey,
                    page: 1,
                })
            );
        }
    };
    const callServicesByKeyword = () => {
        if (RE_SERVICES.status !== STATUS.SUCCESS) {
            dispatch(
                fetchServicesByFilter({
                    page: 1,
                    keyword: searchKey,
                })
            );
        }
    };
    const callProductsByKeyword = () => {
        if (RE_PRODUCTS.status !== STATUS.SUCCESS) {
            dispatch(
                fetchProductsByFilter({
                    page: 1,
                    keyword: searchKey,
                })
            );
        }
    };

    useEffect(() => {
        callOrgsByKeyword();
        callServicesByKeyword();
        callProductsByKeyword();
    }, [searchKey]);
    const [openFilter, setOpenFilter] = useState(false);
    const onActiveTab = useCallback((tab) => {
        dispatch(onSetTabResult(tab.id));
    }, []);

    const handleApplyFilterOrgs = () => {
        setOpenFilter(false);
        dispatch(onSetEmptyOrgs());
        dispatch(
            fetchAsyncOrgsByFilter({
                ...FILTER_ORGS_VAL,
                page: 1,
                keyword: searchKey,
            })
        );
    };

    //
    const onGoBack = () => {
        history.goBack();
        dispatch(onToggleSearchCnt(true));
    };
    //open filter orgs mobile
    const onOpenFilterOrgs = useCallback(() => {
        if (valueTab === "3") {
            setOpenFilter(true)
        }
    }, [valueTab])
    //on filter services
    const { FILTER_PROMO } = useSelector((state: any) => state.FILTER)
    const handleFilterServices = (sort: ISortList) => {
        if (FILTER_PROMO.query !== sort.query) {
            dispatch(onSetEmptyServices())
            dispatch(
                fetchServicesByFilter({
                    page: 1,
                    keyword: searchKey,
                    sort: sort.query
                })
            );
        }
    }
    return (
        <>
            <HeadTitle
                title={`${t("Search_result.text_result")} : ${searchKey}`}
            />
            {IS_MB ? (
                // <HeadMobile
                //     element={
                //         valueTab === "3" && (
                //             <button onClick={() => setOpenFilter(true)}>
                //                 <img src={icon.settingsSliders} alt="" />
                //             </button>
                //         )
                //     }
                //     onBackFunc={onGoBack}
                //     title="Kết quả tìm kiếm"
                // />
                <div className="flex-row-sp se-re-header-mb">
                    <div className="flex-row-sp input">
                        <div className="flex-row">
                            <img onClick={() => history.push("/homepage")} src={icon.chevronLeft} alt="" />
                            <span onClick={onGoBack} >{searchKey}</span>
                        </div>
                        <img
                            onClick={onGoBack}
                            src={icon.closeBlack} alt=""
                        />
                    </div>
                    <button
                        onClick={onOpenFilterOrgs}
                        className="filter"
                    >
                        <img src={icon.filterBlack} alt="" />
                    </button>
                </div>
            ) : (
                <Head prev_url="/homepage" />
            )}
            <Container>
                <div className="se-re-cnt">
                    <TabContext value={valueTab}>
                        <div className="se-re-cnt__left">
                            {IS_MB === true ? (
                                <>
                                    <TabList
                                        orientation="horizontal"
                                        onChange={onChangeTab}
                                    >
                                        {tabs.map((item, index) => (
                                            <Tab
                                                key={index}
                                                label={item.title}
                                                value={item.value}
                                            />
                                        ))}
                                    </TabList>
                                </>
                            ) : (
                                <>
                                    <TabList
                                        orientation="vertical"
                                        onChange={onChangeTab}
                                    >
                                        {tabs.map((item, index) => (
                                            <Tab
                                                key={index}
                                                label={item.title}
                                                value={item.value}
                                            />
                                        ))}
                                    </TabList>
                                </>
                            )}
                            {valueTab === "3" && (
                                <>
                                    {IS_MB ? (
                                        <Drawer
                                            anchor="bottom"
                                            open={openFilter}
                                            onClose={() => setOpenFilter(false)}
                                        >
                                            <div className="result-cont__mobile">
                                                <div className="filter-orgs-wrap">
                                                    <button
                                                        onClick={() => setOpenFilter(false)}
                                                        className="filter-orgs-cnt__head-btn"
                                                    >
                                                        <img src={icon.lineGray} alt="" />
                                                    </button>
                                                    <FilterOrgs
                                                        onApplyFilterOrgs={handleApplyFilterOrgs}
                                                    />
                                                </div>
                                            </div>
                                        </Drawer>
                                    ) : (
                                        <FilterOrgs
                                            onApplyFilterOrgs={
                                                handleApplyFilterOrgs
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <div className="se-re-cnt__right">
                            <div className="cnt-right__top">
                                <span className="se-re-cnt-title">
                                    {t("se.search_results_for_keyword")} : "
                                    {searchKey}"
                                </span>

                                {valueTab === "3" && (
                                    <div
                                        onClick={() => {
                                            setOpenMap(true);
                                        }}
                                        className="open-map"
                                    >
                                        <div className="flexX-gap-4">
                                            <p>{t("pr.map")}</p>
                                            <img
                                                src={icon.mapPinRed}
                                                alt=""
                                                style={{ width: "16px" }}
                                            ></img>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <TabPanel value="1">
                                <FilterService
                                    onChangeFilter={handleFilterServices}
                                />
                                <TabService keyword={searchKey} />
                            </TabPanel>
                            <TabPanel value="2">
                                <TabProduct keyword={searchKey} />
                            </TabPanel>
                            {
                                // tab === 3 && (data?.orgs.length == 0) && <EmptyRes title={'Không tìm được kết quả phù hợp cho "' + searchKey + '"'} />
                            }
                            <TabPanel value="3">
                                <TabOrgs
                                    keyword={searchKey}
                                    FILTER_ORGS_VAL={FILTER_ORGS_VAL}
                                    changeStyle={true}
                                />
                            </TabPanel>
                        </div>
                    </TabContext>
                </div>
                {/* <div className="se-re-cnt">
                    <div className="se-re-cnt__left">
                        <div className="se-re-cnt__left-top">
                            <ul className="se-re-cnt__left-list">
                                {tabs.map((item) => (
                                    <li
                                        style={
                                            tab === item.id
                                                ? {
                                                      backgroundColor:
                                                          "var(--purple)",
                                                      color: "var(--bgWhite)",
                                                  }
                                                : {}
                                        }
                                        onClick={() => onActiveTab(item)}
                                        key={item.id}
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {tab === 3 &&
                            <>
                                {
                                    IS_MB ?
                                        <Drawer
                                            anchor="right"
                                            open={openFilter}
                                            onClose={() => setOpenFilter(false)}
                                        >
                                            <div
                                                style={{ width: "80vw", height: "100vh" }}
                                            >
                                                <FilterOrgs
                                                    onApplyFilterOrgs={handleApplyFilterOrgs}
                                                />
                                            </div>
                                        </Drawer>
                                        :
                                        <FilterOrgs
                                            onApplyFilterOrgs={handleApplyFilterOrgs}
                                        />
                                }
                            </>
                        }
                    </div>
                    <div className="se-re-cnt__right">
                        <div
                            style={{
                                paddingRight: "6px 12px",
                                paddingBottom: "6px",
                            }}
                            className="cnt-right__top"
                        >
                            <span className="se-re-cnt-title">
                                {t("se.search_results_for_keyword")} : "
                                {searchKey}"
                            </span>

                            {tab === 3 && (
                                <div
                                    onClick={() => {
                                        setOpenMap(true);
                                    }}
                                    className="open-map"
                                >
                                    <div className="flexX-gap-4">
                                        <p>{t("pr.map")}</p>
                                        <img
                                            src={icon.mapPinRed}
                                            alt=""
                                            style={{ width: "16px" }}
                                        ></img>
                                    </div>
                                </div>
                            }
                        </div>
                        <TabService keyword={searchKey} acTab={tab} />
                        <TabProduct keyword={searchKey} acTab={tab} />
                        <TabOrgs
                            acTab={tab}
                            keyword={searchKey}
                            FILTER_ORGS_VAL={FILTER_ORGS_VAL}
                        />
                    </div>
                </div> */}
            </Container>
            {RE_ORGS.orgs.length > 0 && (
                <Map
                    data={RE_ORGS.orgs}
                    open={openMap}
                    setOpenMap={setOpenMap}
                />
            )}
            <BackTopButton />
            <Footer />
        </>
    );
}

export default SearchResults;
