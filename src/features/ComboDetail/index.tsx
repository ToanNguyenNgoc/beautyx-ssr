/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { shareLink } from "../../utils/formatUrlString";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import HeadTitle from "../HeadTitle";
import Head from "../Head";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { AppContext } from "../../context/AppProvider";
import { STATUS } from '../../redux/status';
import { fetchAsyncComboDetail, fetchAsyncCommentsCombo } from '../../redux/org_combos/comboSlice';
import ComboDetailLeft from "./components/ComboDetailLeft";
import ComboDetailRight from "./components/ComboDetailRight";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import Review from "../Reviews";
import '../ServiceDetail/serviceDetail.css';
import "./style.css";
import "../ProductDetail/product.css";

function ComboDetail() {
    const { t } = useContext(AppContext);
    const params: any = shareLink();
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { COMBO, COMMENTS } = useSelector((state: any) => state.COMBO);

    const callOrgDetail = () => {
        if (parseInt(params.org_id) !== ORG.org?.id || ORG.status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrg(params.org_id))
        }
    }
    const callComboDetail = () => {
        if (parseInt(params.id) !== COMBO.combo.id || COMBO.status !== STATUS.SUCCESS) {
            const values = {
                com_id: params.id,
                org_id: params.org_id
            }
            dispatch(fetchAsyncComboDetail(values))
        }
    }
    const callComboComments = () => {
        if (parseInt(params.id) !== COMMENTS.combo_id || COMMENTS.status !== STATUS.SUCCESS) {
            const values = {
                type: "TREATMENT_COMBO",
                page: 1,
                id: params.id,
                org_id: params.org_id
            }
            dispatch(fetchAsyncCommentsCombo(values))
        }
    }
    useEffect(() => {
        callOrgDetail()
        callComboDetail()
        callComboComments()
    }, []);

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
    ];
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        setValue(value);
    }
    const org = ORG.org;
    const combo = COMBO.combo;

    return (
        <div className="product">
            <Head />
            <HeadTitle
                title={combo?.name ? combo?.name : "Loading..."}
            />
            <Container>
                <div className="service-detail">
                    <div className="service-detail__head">
                        <ComboDetailLeft org={org} combo={combo} />
                        <ComboDetailRight org={org} combo={combo} />
                    </div>
                    <div className="service-detail__body">
                        <div className="service-detail__tab">
                            <TabContext value={value}>
                                <TabList onChange={handleChange}>
                                    {tabs.map((item: any, i: number) => (
                                        <Tab
                                            key={i}
                                            label={item.title}
                                            value={item.id}
                                        />
                                    ))}
                                </TabList>
                                <div className="service-detail__tabitem">
                                    <TabPanel value={value}>
                                        {/* {onSwitchTab(value)} */}
                                        <div className="service-detail__description">
                                            <p>
                                                Đang cập nhật
                                            </p>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div className="service-detail__comment">
                                            <Review
                                                comments={COMMENTS.comments}
                                                totalItem={COMMENTS.totalItem}
                                                commentable_type={"TREATMENT_COMBO"}
                                                id={ORG.org?.id}
                                                detail_id={combo?.id}
                                            />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div className="org-information-cnt">
                                            <div className="service-detail__org">
                                                {
                                                    ORG.status === STATUS.SUCCESS &&
                                                    <OrgInformation org={org} />
                                                }
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <>tab 3</>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ComboDetail;
