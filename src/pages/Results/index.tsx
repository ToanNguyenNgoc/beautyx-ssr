/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Container, Drawer } from '@mui/material';
import './style.css';
import FilterOrgs from '../../features/Filter/FilterOrgs';
import HeadTitle from '../../features/HeadTitle';
import Head from '../../features/Head';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { useDispatch, useSelector } from 'react-redux';
import { IOrganization } from '../../interface/organization';
import OrgItem from '../../features/ViewItemCommon/OrgItem';
import { STATUS } from '../../redux/status';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BackTopButton, EmptyRes } from 'components/Layout';
import Footer from '../../features/Footer';
import {
    fetchAsyncOrgsByFilter,
    onResetFilter,
    onSetFilterType,
    onSetOrgsEmpty
} from '../../redux/filter/filterSlice';
import HeadMobile from '../../features/HeadMobile';
import useFullScreen from '../../utils/useDeviceMobile';
import icon from '../../constants/icon';
import LoadingMore from '../../components/LoadingMore';
import { LoadingOrgs } from '../../components/LoadingSketion';
import { AppContext } from '../../context/AppProvider';
import Map from '../../components/Map';
import { useLocation } from 'react-router-dom';

function Result() {
    const IS_MB = useFullScreen();
    const params: any = extraParamsUrl();
    const [openMap, setOpenMap] = useState(false);
    const location = useLocation();
    // console.log(location);
    const dispatch = useDispatch();
    const { t } = useContext(AppContext);
    const {
        tags,
        sort,
        province,
        district,
        min_price,
        max_price
    } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const { TYPE_FILTER } = useSelector((state: any) => state.FILTER);
    const { orgs, status, page, totalItem, path_url } = useSelector((state: any) => state.FILTER.ORGS);
    let titleHeader: string = "";
    let type: string = ""
    if (params.tag) {
        titleHeader = params.tag;
        type = params.tag
    } else if (params.name) {
        titleHeader = params.name;
        type = params.province
    }
    const paramsFilter = {
        page: 1,
        tags: params?.tag ? [params?.tag, ...tags].join("|") : tags.join("|"),
        province_code: params?.province || province?.province_code,
        district_code: district?.district_code,
        min_price: min_price,
        max_price: max_price,
        sort: sort,
        path_url: location.pathname
    }
    // console.log(paramsFilter)
    const callOrgsByFilterTag = async () => {
        if (path_url !== location.pathname || type !== TYPE_FILTER) {
            dispatch(onResetFilter());
            dispatch(onSetOrgsEmpty());
            dispatch(fetchAsyncOrgsByFilter(paramsFilter))
            dispatch(onSetFilterType(type))
        }
    }
    useEffect(() => {
        callOrgsByFilterTag()
    }, [])
    const handleApplyByFilter = () => {
        dispatch(onSetOrgsEmpty())
        dispatch(fetchAsyncOrgsByFilter(paramsFilter))
    }
    const onViewMore = () => {
        if (orgs.length >= 15 && orgs.length < totalItem) {
            dispatch(fetchAsyncOrgsByFilter({
                ...paramsFilter,
                page: page + 1
            }))
        }
    }
    return (
        <>
            <HeadTitle title={`Kết quả tìm kiếm cho : ${titleHeader}`} />
            {
                IS_MB ?
                    <HeadMobile
                        title={titleHeader}
                        element={
                            <HeaderFilterMobile
                                handleApplyByFilter={handleApplyByFilter}
                            />}
                    />
                    :
                    <Head />
            }
            <Container className='result-cont' >
                <div className="result-cont">
                    <div className="result-cont__left">
                        <FilterOrgs
                            onApplyFilterOrgs={handleApplyByFilter}
                        />
                    </div>
                    <div className="result-cont__right">
                        {(status === STATUS.LOADING && page === 1) && <LoadingOrgs />}
                        {(status === STATUS.SUCCESS && orgs.length === 0) && <EmptyRes title={'Không tìm được kết quả phù hợp cho "' + titleHeader + '"'} />}
                        <InfiniteScroll
                            dataLength={orgs.length}
                            hasMore={true}
                            loader={<></>}
                            next={onViewMore}
                        >
                            <div className="result-cont-map">
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
                            </div>
                            <ul className="result-cont__right-list">
                                {
                                    orgs.map((org: IOrganization, index: number) => (
                                        <li
                                            key={index}
                                            className="result-cont__right-item"
                                        >
                                            <OrgItem org={org} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </InfiniteScroll>
                        {orgs.length === totalItem ? <></> : <LoadingMore />}
                    </div>
                </div>
            </Container>
            <Map
                data={orgs}
                open={openMap}
                setOpenMap={setOpenMap}
            />
            <BackTopButton />
            <Footer />
        </>
    );
}

export default Result;

function HeaderFilterMobile(props: any) {
    const { handleApplyByFilter } = props;
    const [open, setOpen] = useState(false);
    const onApplyFilterMb = () => {
        handleApplyByFilter()
        setOpen(false)
    }
    return (
        <>
            <button
                style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    padding: "8px"
                }}
                onClick={() => setOpen(true)}
            >
                <img src={icon.settingsSliders} alt="" />
            </button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="bottom"
            >
                <div className="result-cont__mobile">
                    <div className="filter-orgs-wrap">
                        <button
                            onClick={() => setOpen(false)}
                            className="filter-orgs-cnt__head-btn"
                        >
                            <img src={icon.lineGray} alt="" />
                        </button>
                        <FilterOrgs
                            onApplyFilterOrgs={onApplyFilterMb}
                        />
                    </div>
                </div>
            </Drawer>
        </>
    )
}