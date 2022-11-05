import React from "react";
import { useHistory } from "react-router-dom";
import onErrorImg from "../../../utils/errorImg";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useDispatch } from "react-redux";
import {
    fetchServiceByCateChild,
    onChooseTab,
    onSetFirstCateProducts,
} from "../../../redux/CateTree/cateTreeSlice";
import TabService from "./TabService";
//import TabProduct from './TabProduct';
import TabProduct2 from "./TabProduct2";
import { Link } from "react-router-dom";
// ==== api tracking ====
import tracking from "../../../api/trackApi";
import { formatRouterLinkOrg } from "../../../utils/formatRouterLink/formatRouter";
import { onResetFilter } from "redux/filter-result";
// end
function CateRight(props: any) {
    const { CATE, ORGS, catesChild, SERVICES, VALUE, PRODUCTS } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const gotoTagsResult = () => {
        dispatch(onResetFilter())
        history.push({
            pathname: "/ket-qua-tim-kiem/cua-hang",
            search: `keyword=${CATE.title}`,
        });
    };
    //const [value, setValue] = useState('SERVICE');
    const onChangeTab = (event: any, newValue: any) => {
        dispatch(onChooseTab(newValue));
    };
    const handleGetServicesBtCateChild = (cateChild: any) => {
        tracking.CATEGORY_TREE_ITEM_CLICK(cateChild.id);
        if (VALUE === "SERVICE") {
            const action = {
                page: 1,
                keyword: cateChild.title,
                CATE_CHILD: cateChild,
                CATE: CATE,
            };
            dispatch(fetchServiceByCateChild(action));
        } else if (VALUE === "PRODUCT") {
            dispatch(onSetFirstCateProducts(cateChild));
        }
    };
    const catesChildByTab = catesChild.filter(
        (item: any) => item.type === VALUE
    );

    let cateChildId: any;
    if (VALUE === "SERVICE") {
        cateChildId = SERVICES.CATE_CHILD?.id;
    } else if (VALUE === "PRODUCT") {
        cateChildId = PRODUCTS.CATE_CHILD?.id;
    }

    return (
        <div className="cate-tree-cnt__right">
            <div className="cate-tree-cnt__right-head">
                <ul className="cate-right-list">
                    {catesChildByTab.map((item: any, index: number) => (
                        <li
                            onClick={() => handleGetServicesBtCateChild(item)}
                            className="flex-column cate-right-list__item"
                            key={index}
                        >
                            <img
                                src={item.image}
                                alt=""
                                className="cate-right-list__item-img"
                            />
                            <span
                                style={
                                    item.id === cateChildId
                                        ? {
                                            color: "var(--hover)",
                                            fontWeight: "700",
                                        }
                                        : {}
                                }
                            >
                                {item.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="cate-tree-cnt__right-orgs">
                <ul className="cate-right-org-list">
                    {ORGS.orgs.slice(0, 12).map((item: any, index: number) => (
                        <li key={index} className="cate-org__item">
                            <Link
                                to={{
                                    pathname: formatRouterLinkOrg(item.subdomain),
                                    state: item,
                                }}
                            >
                                <img
                                    src={item.image_url}
                                    alt=""
                                    onError={(e) => onErrorImg(e)}
                                    className="cate-org__item-img"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
                {ORGS.totalItem >= 12 && (
                    <button onClick={gotoTagsResult}>
                        Xem thêm ({ORGS.totalItem}+) địa điểm khác
                    </button>
                )}
            </div>
            <div className="cate-tree-cnt__right-body">
                <div className="cate-tree-cnt__right-tab">
                    <TabContext value={VALUE}>
                        <TabList onChange={onChangeTab}>
                            <Tab label="Dịch vụ" value="SERVICE" />
                            <Tab label="Sản phẩm" value="PRODUCT" />
                        </TabList>
                        <TabPanel value="SERVICE">
                            <TabService CATE={CATE} catesChild={catesChild} />
                        </TabPanel>
                        <TabPanel value="PRODUCT">
                            {/* <TabProduct
                                catesChildByTab={catesChildByTab}
                            /> */}
                            <TabProduct2 catesChildByTab={catesChildByTab} />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </div>
    );
}

export default CateRight;
