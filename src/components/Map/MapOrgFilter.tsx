import { StandaloneSearchBox } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import icon from '../../constants/icon';
import { fetchAsyncOrgsByFilter, onSetOrgsEmpty } from '../../redux/filter/filterSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from "lodash";
import { IOrganization } from '../../interface/organization';
import orgApi from '../../api/organizationApi';

function MapOrgFilter() {
    const [orgsFilter, setOrgsFilter] = useState<IOrganization[]>([])
    // const dispatch = useDispatch();
    // const location = useLocation()
    const callOrgsByFilter = async (keyword: string) => {
        try {
            const res = await orgApi.getAll({
                page: 1,
                limit: 5,
                distance: "distance",
                keyword: keyword
            })
            setOrgsFilter(res.data.context.data);
        } catch (error) {

        }
        // dispatch(onSetOrgsEmpty())
        // dispatch(fetchAsyncOrgsByFilter({
        //     page: 1,
        //     sort: "distance",
        //     path_url: location.pathname,
        //     keyword: keyword
        // }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDropDown = useCallback(
        debounce((nextValue) => {
            callOrgsByFilter(nextValue);
        }, 1000),
        []
    );

    const onChangeSearchBox = (e: any) => {
        const keyword = e.target.value;
        debounceDropDown(keyword)
    }
    console.log()

    return (
        <StandaloneSearchBox
        >
            <div className="map-filter-cnt">
                <div className="map-filter-cnt__left">
                    <div className="map-filter-cnt__input">
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên bản đồ"
                            onChange={onChangeSearchBox}
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                height: `32px`,
                                padding: `0 12px`,
                                paddingRight: "32px",
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                // position: "absolute",
                                // left: 0,
                                // zIndex: 100
                                // left: "50%",
                                // marginLeft: "-120px"
                            }}
                        />
                        <div className="map-filter-cnt__input-btn">
                            <button>
                                <img src={icon.closeBlack} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="map-filter-cnt__drop">
                        <ul className="map-filter-list-org">
                            {
                                orgsFilter.map((i: IOrganization, index: number) => (
                                    <li key={index} className="map-list-org__item">
                                        {i.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </StandaloneSearchBox>
    );
}

export default MapOrgFilter;