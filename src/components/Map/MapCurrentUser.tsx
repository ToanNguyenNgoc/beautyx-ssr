import { Dispatch, useState } from 'react'
import { Switch, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { onSwitchValueCenter } from 'redux/org/orgMapSlice';
import icon from 'constants/icon';
import style from './map.module.css'

interface IProps {
    handleBackCurrentUser: () => void,
    setMapStyle?: Dispatch<React.SetStateAction<string>>
}

function MapCurrentUser(props: IProps) {
    const { getValueCenter } = useSelector((state: IStore) => state.ORGS_MAP)
    const dispatch = useDispatch()
    const { handleBackCurrentUser, setMapStyle } = props;
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
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={1400}
                onClose={() => setOpen(false)}
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
            <div className={style.map_style_ctrl}>
                <ul className={style.map_style_list}>
                    <li
                        onClick={() => setMapStyle && setMapStyle('mapbox://styles/mapbox/streets-v12')}
                        className={style.style_item}
                    >
                        <img src={icon.street} alt="" />
                    </li>
                    <li
                        onClick={() => setMapStyle && setMapStyle('mapbox://styles/mapbox/satellite-streets-v12')}
                        className={style.style_item}
                    >
                        <img src={icon.stateLlite} alt="" />
                    </li>
                </ul>
            </div>
        </>
    );
}

export default MapCurrentUser;

