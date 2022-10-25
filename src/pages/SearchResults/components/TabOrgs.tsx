import React from "react";
import { IOrganization } from "../../../interface/organization";
import OrgItem from "../../../features/ViewItemCommon/OrgItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrgsByFilter } from "../../../redux/search/searchResultSlice";
import LoadingMore from "../../../components/LoadingMore";
import { LoadingOrgs } from "../../../components/LoadingSketion";
import { STATUS } from "../../../redux/status";
import { EmptyRes } from "components/Layout";

function TabOrgs(props: any) {
    const { keyword, FILTER_ORGS_VAL, changeStyle } = props;
    const dispatch = useDispatch();
    const { orgs, page, totalItem, status } = useSelector(
        (state: any) => state.SEARCH_RESULT.RE_ORGS
    );

    const onViewMore = () => {
        if (orgs.length >= 15 && orgs.length < totalItem) {
            dispatch(
                fetchAsyncOrgsByFilter({
                    ...FILTER_ORGS_VAL,
                    page: page + 1,
                    keyword: keyword,
                })
            );
        }
    };
    return (
        <>
            {page === 1 && status !== STATUS.SUCCESS && <LoadingOrgs />}
            {(status === STATUS.SUCCESS && orgs.length === 0)&&<EmptyRes title={'Không tìm được kết quả phù hợp!'} />}
            <InfiniteScroll
                dataLength={orgs.length}
                hasMore={true}
                loader={<></>}
                next={onViewMore}
            >
                <ul
                    className={
                        changeStyle
                            ? "re-ser-list re-ser-list__chage"
                            : "re-ser-list"
                    }
                >
                    {orgs.map((item: IOrganization, index: number) => (
                        <li key={index}>
                            <OrgItem org={item} changeStyle={true} />
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
            {orgs.length < totalItem && <LoadingMore />}
        </>
    );
}

export default TabOrgs;
