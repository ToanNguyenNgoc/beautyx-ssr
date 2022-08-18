import React from 'react'
import icon from '../../constants/icon';
import { GET_LOCATION_BEAUTY } from '../../api/authLocation';
import { useGeolocated } from "react-geolocated";

interface IProps {
    handleBackCurrentUser: () => void
}

function MapCurrentUser(props: IProps) {
    // const { coords, isGeolocationAvailable, isGeolocationEnabled} =
    //     useGeolocated({
    //         positionOptions: {
    //             enableHighAccuracy: false,
    //         },
    //         userDecisionTimeout: 5000,
    //     });
    const { handleBackCurrentUser } = props;
    const onClickGetCurrent = async () => {
        handleBackCurrentUser()
    }
    return (
        <div className='map-current-user'>
            <button onClick={onClickGetCurrent} className="map-current-user__btn">
                <img src={icon.pinMapRedGoogle} alt="" />
            </button>
        </div>
    );
}

export default MapCurrentUser;