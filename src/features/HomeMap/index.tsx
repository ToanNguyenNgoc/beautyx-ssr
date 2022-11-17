/* eslint-disable react-hooks/exhaustive-deps */
import { useDeviceMobile } from "hooks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { LoadingMapOrg } from "../../components/LoadingSketion/LoadOrg";
// import Map from '../../components/Map';
import MapContent from "../../components/Map/MapContent";
import icon from "../../constants/icon";
import { fetchOrgsMapFilter } from "../../redux/org/orgMapSlice";
import { STATUS } from "../../redux/status";

function HomeMap() {
    const dispatch = useDispatch();
    const { orgs, status, mountNth } = useSelector(
        (state: any) => state.ORGS_MAP.orgsMap
    );
    const location = useLocation();
    const history = useHistory();
    const callOrgsByDistance = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(
                fetchOrgsMapFilter({
                    page: 1,
                    sort: "distance",
                    path_url: location.pathname,
                    mountNth: 2,
                })
            );
        }
    };
    const IS_MB = useDeviceMobile();
    const platform = EXTRA_FLAT_FORM();
    useEffect(() => {
        callOrgsByDistance();
    }, []);
    const handleClose = () => {
        history.push("/");
    };
    return (
        <div
            style={
                platform === "BEAUTYX" && IS_MB === true
                    ? {
                          width: "100vw",
                          height: "90vh",
                      }
                    : { width: "100vw", height: "100vh" }
            }
            className="map"
        >
            <div onClick={handleClose} className="dialog-map__close">
                <div className="dialog-map__close-img">
                    <img src={icon.closeCircleWhite} alt="" />
                </div>
            </div>
            {mountNth === 2 ? <MapContent orgs={orgs} /> : <LoadingMapOrg />}
        </div>
    );
}

export default HomeMap;
