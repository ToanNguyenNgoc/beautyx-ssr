import React, { useContext } from "react";
import { IOrganization } from "../../interface/organization";
import { Link } from "react-router-dom";
import { onToggleSearchCnt, addHistory } from "../../redux/search/searchSlice";
import { useDispatch } from "react-redux";
import { onSetTabResult } from "../../redux/search/searchResultSlice";
import { AppContext } from "../../context/AppProvider";
// ==== api tracking ====
 import tracking from "../../api/trackApi";
import { formatRouterLinkOrg } from "../../utils/formatRouterLink/formatRouter";
// end
function SectionOrgs(props: any) {
    const { t } = useContext(AppContext);
    const { ORGS, onGotoFilterResult, keyword } = props;
    const location_user = `${sessionStorage.getItem("USER_LOCATION")}`;

    const handleOnclickItem = (item: any) => {
        const values = {
            TYPE: "ORG",
            id: item.id,
            item: item,
        };
        const result = {
            store_id: ORGS.id,
        };
        tracking.SEARCH_RESULT_ITEM_CLICK(
            keyword,
            result,
            'doanh nghiệp',
            location_user
        );
        dispatch(addHistory(values));
        dispatch(onToggleSearchCnt(false));
    };

    const onViewMore = () => {
        if (onGotoFilterResult) {
            onGotoFilterResult();
            dispatch(onSetTabResult(3));
            dispatch(onToggleSearchCnt(false));
        }
    };

    const dispatch = useDispatch();

    return ORGS.orgs.length > 0 ? (
        <div className="search-section-item">
            <div className="flex-row-sp search-section-item__title">
                {t("my_ser.business")}
                <span onClick={onViewMore}>{t("trending.watch_all")}</span>
            </div>
            <div className="search-empty-item__list">
                <ul className="list">
                    {ORGS.orgs
                        .slice(0, 6)
                        .map((item: IOrganization, index: number) => (
                            <li
                                onClick={() => handleOnclickItem(item)}
                                key={index}
                            >
                                <Link
                                    to={{
                                        pathname: formatRouterLinkOrg(item.subdomain),
                                    }}
                                    className="flex-column search-empty-item__list-item"
                                >
                                    <img src={item.image_url} alt="" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default SectionOrgs;
