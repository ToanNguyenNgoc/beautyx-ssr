import React from 'react'
import icon from '../../constants/icon';

interface IProps {
    handleBackCurrentUser: () => void
}

function MapCurrentUser(props: IProps) {
    const { handleBackCurrentUser } = props;
    const onClickGetCurrent = () => {
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