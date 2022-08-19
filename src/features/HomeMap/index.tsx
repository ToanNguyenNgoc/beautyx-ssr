/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// import Map from '../../components/Map';
import MapContent from '../../components/Map/MapContent';
import icon from '../../constants/icon';
import { fetchOrgsMapFilter } from '../../redux/org/orgMapSlice';
import { STATUS } from '../../redux/status';

function HomeMap() {
    const dispatch = useDispatch();
    const { orgs, status, mountNth } = useSelector((state: any) => state.ORGS_MAP.orgsMap)
    const location = useLocation()
    const history = useHistory();
    const callOrgsByDistance = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchOrgsMapFilter({
                page: 1,
                sort: "distance",
                path_url: location.pathname,
                mountNth: 2
            }))
        }
    }
    useEffect(() => {
        callOrgsByDistance()
    }, [])
    const handleClose = () => {
        history.push("/");
    }
    console.log(mountNth)
    return (
        <div className="map">
            <div onClick={handleClose} className="dialog-map__close">
                <div className="dialog-map__close-img">
                    <img src={icon.closeCircleWhite} alt="" />
                </div>
            </div>
            {
                (mountNth === 2) &&
                <MapContent
                    orgs={orgs}
                />
            }
        </div>
    );
}

export default HomeMap;