/* eslint-disable react-hooks/exhaustive-deps */
import { useBranches } from 'features/Search/hook';
import { pramsBranchV3 } from 'params-query';
import { ParamBranchV3 } from 'params-query/param.interface';
import style from './search-result.module.css'
import { EmptyRes, XButton } from 'components/Layout';
import { clst } from 'utils';
import { IBranchV3 } from 'interface';
import { LoadGrid } from 'components/LoadingSketion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDeviceMobile } from 'hooks';
import { BranchV3Item } from 'components/Layout/BranchItem';
import { EventLocation, FilterLocation } from 'components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { onChangeFilterBranch } from 'redux/filter-result';
import icon from 'constants/icon';
import { useHistory } from 'react-router-dom';

function TabBranch({ keyword }: { keyword: string }) {
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const dispatch = useDispatch()
    const { BRANCH_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const PARAMS_BRANCH: ParamBranchV3 = {
        ...pramsBranchV3,
        ...BRANCH_PR,
        "limit": 15,
        "keyword": keyword,
        "district_code": BRANCH_PR.district_code === 'cur' ? '' : BRANCH_PR.district_code,
        'province_code': BRANCH_PR.province_code === 'cur' ? '' : BRANCH_PR.province_code
    }
    const { branches, totalBranch, onLoadMoreBranch } = useBranches(PARAMS_BRANCH, true)
    const onFilterLocation = (e: EventLocation) => {
        dispatch(onChangeFilterBranch({
            ...BRANCH_PR,
            "location": e.coords,
            "sort": "distance",
            "province_code": e.province?.province_code ?? "cur",
            "district_code": e.district?.district_code ?? "cur"
        }))
    }
    const onViewMore = () => {
        if (branches.length >= 10 && branches.length < totalBranch) {
            onLoadMoreBranch()
        }
    }
    return (
        <>
            <div className={style.filter_container}>
                <div className={style.filter_right}>
                    <FilterLocation
                        onChange={onFilterLocation}
                        province_code={BRANCH_PR.province_code}
                        district_code={BRANCH_PR.district_code}
                        showApplyBtn={IS_MB}
                    />
                </div>
                <div className={style.filter_left}>
                    {/* {
                        IS_MB ?
                            <>
                                <XButton
                                    icon={icon.settingsSliders}
                                    title="Bộ lọc"
                                    className={style.filter_btn}
                                    onClick={() => setOpenFilter(true)}
                                />
                                <Drawer
                                    open={openFilter} onClose={() => setOpenFilter(false)} anchor="bottom"
                                >
                                    <div className={style.filter_cnt_mt}>
                                        <FilterTags
                                            onChange={onChangeTag}
                                            value={ORG_PR["filter[tags]"] ?? ""}
                                        />
                                        <FilterSort
                                            type="ORG"
                                            onChange={onChangeSort}
                                            value={ORG_PR.sort}
                                        />
                                        <FilterPrice
                                            onChangePrice={onChangePrice}
                                            min_price={ORG_PR["filter[min_price]"]}
                                            max_price={ORG_PR["filter[max_price]"]}
                                        />
                                    </div>
                                </Drawer>
                            </>
                            :
                            <>
                                <FilterTags
                                    onChange={onChangeTag}
                                    value={ORG_PR["filter[tags]"] ?? ""}
                                />
                                <FilterSort
                                    type="ORG"
                                    onChange={onChangeSort}
                                    value={ORG_PR.sort}
                                />
                                <FilterPrice
                                    onChangePrice={onChangePrice}
                                    min_price={ORG_PR["filter[min_price]"]}
                                    max_price={ORG_PR["filter[max_price]"]}
                                />
                            </>
                    } */}
                </div>
            </div>
            <div className={style.result_body}>
                {totalBranch === 0 && <EmptyRes title="Không có doanh nghiệp phù hợp !" />}
                <InfiniteScroll
                    dataLength={branches.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className={clst([style.result_list, style.result_list_org])}>
                        {
                            branches.map((item: IBranchV3, index: number) => (
                                <li key={index} className={clst([style.result_list_item, style.result_list_item_org])}>
                                    <BranchV3Item changeStyle={IS_MB} branch={item} />
                                </li>
                            ))
                        }
                    </ul>
                    {branches.length < totalBranch && <>
                        <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />
                        <div className={style.load_bottom}>
                            <XButton title="" loading={true} />
                        </div>
                    </>}
                </InfiniteScroll>
            </div>
            <div className={style.bottom}>
                <XButton
                    icon={icon.pinMapGreen}
                    title='Bản đồ'
                    className={style.bottom_btn}
                    onClick={() => history.push({
                        pathname: '/ban-do'
                    })}
                />
            </div>
        </>
    );
}

export default TabBranch;