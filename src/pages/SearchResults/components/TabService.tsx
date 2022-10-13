import React from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import useFullScreen from "../../../utils/useDeviceMobile";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesByFilter } from "../../../redux/search/searchResultSlice";
import { STATUS } from "../../../redux/status";
import { LoadingServices } from "../../../components/LoadingSketion";
import LoadingMore from "../../../components/LoadingMore";
import EmptyRes from "../../../features/EmptyRes";
import { SerProItem } from "components/Layout";

function TabService(props: any) {
    const { keyword } = props;
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const { services, page, totalItem, status } = useSelector(
        (state: any) => state.SEARCH_RESULT.RE_SERVICES
    );
    const onViewMore = () => {
        if (services.length >= 30 && services.length < totalItem) {
            dispatch(
                fetchServicesByFilter({
                    page: page + 1,
                    keyword: keyword,
                })
            );
        }
    };

    return (
        <div>
            {page === 1 && status !== STATUS.SUCCESS && <LoadingServices />}
            {(status === STATUS.SUCCESS && services.length === 0) && <EmptyRes title={'Không tìm được kết quả phù hợp!'} />}
            <InfiniteScroll
                dataLength={services.length}
                hasMore={true}
                loader={<></>}
                next={onViewMore}
            >
                <ul className="re-ser-list">
                    {services.map((item: IServicePromo, index: number) => (
                        <li className="re-ser-list__item" key={index}>
                            <SerProItem changeStyle={IS_MB} item={item} type="SERVICE" />
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
            {services.length < totalItem && <LoadingMore />}
        </div>
    );
}

export default TabService;
