import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../interface/discount";
import { IOrganization } from "../../../interface/organization";
import onErrorImg from "../../../utils/errorImg";
import DetailNameMb from "../DetailNameMb/index";
interface IProps {
    discount: IDiscountPar;
}

function DetailLeft(props: IProps) {
    const { discount } = props;
    const { t } = useContext(AppContext);
    const org: IOrganization = discount?.organizations[0];
    const discount_item_child: IITEMS_DISCOUNT = discount?.items[0];
    const [value, setValue] = React.useState("1");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className="product-cnt__left">
            <img
                src={
                    discount_item_child?.productable?.image
                        ? discount_item_child?.productable?.image_url
                        : org?.image_url
                }
                onError={(e) => onErrorImg(e)}
                alt=""
                className="product-cnt__left-img"
            />

            <div className="product-cnt__left-tabs">
                <div className="product-cnt__tab-wrapper">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab
                                        label={t("pr.description")}
                                        value="1"
                                    />
                                    <Tab
                                        label={t("Mer_de.feedback")}
                                        value="2"
                                    />

                                    <Tab
                                        label={t("pr.merchant_detail")}
                                        value="3"
                                    />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <>
                                    <DetailNameMb
                                        discount={discount}
                                        is_type={discount.discount_type}
                                    />
                                </>
                            </TabPanel>
                            <TabPanel value="2">
                                
                            </TabPanel>
                            <TabPanel value="3">
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default DetailLeft;
