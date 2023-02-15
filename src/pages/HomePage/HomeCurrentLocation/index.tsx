import style from './current-location.style.module.css'
import { Link } from 'react-router-dom';
import { useFetch } from 'hooks';
import API_3RD from 'api/3rd-api';
import { useContext } from 'react';
import { AppContext } from 'context/AppProvider';
import icon from 'constants/icon';

function HomeCurrentLocation() {
    const { geo } = useContext(AppContext);
    const { response } = useFetch(
        geo,
        API_3RD.API_MAP_BOX(geo?.lat, geo?.long)
    )
    let place
    if (response && response?.features?.length > 0) {
        const context = response?.features[0]?.context
        const txt1 = context[0]?.text_vi ?? ''
        const txt2 = context[1]?.text_vi ?? ''
        const txt3 = context[2]?.text_vi ?? ''
        place = `: ${txt1},${txt2},${txt3}`
    }
    return (
        <Link
            className={style.container}
            to={{ pathname: '/ban-do' }}
        >
            <div className={style.ring_container}>
                <div className={style.ringring}></div>
                <div className={style.circle}></div>
            </div>
            <div className={style.text}>
                <span className={style.label}>Điểm làm đẹp gần</span>
                <span className={style.value}>
                    {geo === undefined && '...'}
                    {geo === null && 'bạn'}
                    {place}
                </span>
                <img src={icon.chevronRight} alt="" />
            </div>
        </Link>
    );
}

export default HomeCurrentLocation;