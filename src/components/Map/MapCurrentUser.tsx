import React, { useState } from 'react'
import icon from '../../constants/icon';
import { Switch, Snackbar, Alert } from '@mui/material';
import { onSwitchValueCenter } from '../../redux/org/orgMapSlice';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../interface/IStore';

interface IProps {
    handleBackCurrentUser: () => void
}

function MapCurrentUser(props: IProps) {
    const { getValueCenter } = useSelector((state: IStore) => state.ORGS_MAP)
    const dispatch = useDispatch()
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
    const [open, setOpen] = useState(getValueCenter);
    const onChangeSwitch = (e: any) => {
        dispatch(onSwitchValueCenter(e.target.checked))
        setOpen(true)
    }
    return (
        <>
            <Snackbar
                open={open}
                anchorOrigin={{vertical:"top", horizontal:"center"}}
                autoHideDuration={1400}
                onClose={()=>setOpen(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {!getValueCenter && "Tắt"} cập nhật khi di chuyển bản đồ
                </Alert>
                </Snackbar>
            <div className='map-current-user'>
            <button className="flex-row map-current-user__btn">
                <Switch
                    size="small"
                    onChange={onChangeSwitch}
                    checked={getValueCenter}
                />
            </button>
            <button onClick={onClickGetCurrent} className="map-current-user__btn">
                <img src={icon.pinMapRedGoogle} alt="" />
            </button>
        </div>
        </>
    );
}

export default MapCurrentUser;

