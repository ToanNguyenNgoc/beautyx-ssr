/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Map from '../../components/Map';
import { fetchOrgsMapFilter } from '../../redux/org/orgMapSlice';
import { STATUS } from '../../redux/status';

function HomeMap() {
    const dispatch = useDispatch();
    const { orgs, status } = useSelector((state: any) => state.ORGS_MAP.orgsMap)
    const location = useLocation()
    const callOrgsByDistance = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchOrgsMapFilter({
                page: 1,
                sort: "distance",
                path_url: location.pathname
            }))
        }
    }
    useEffect(() => {
        callOrgsByDistance()
    }, [])
    return (
        <div>
            <Map
                open={true}
                data={orgs}
            />
        </div>
    );
}

export default HomeMap;