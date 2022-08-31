import React from 'react';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from '../../../utils/errorImg';
import icon from '../../../constants/icon';
import { useHistory } from 'react-router-dom'

interface IProps {
    org: IOrganization,
    handleSetLocation: (org: IOrganization) => void
}

function OrgItemMap(props: IProps) {
    const history = useHistory();
    const { org, handleSetLocation } = props;
    const onHoveItem = () => {
        handleSetLocation(org)
    }
    const onDirect = () => {
        const url = `https://maps.google.com/?q=${org.latitude},${org.longitude}`;
        const newWindow = window.open(`${url}`, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    }
    const gotoDetail = () => {
        history.push({
            pathname: `/cua-hang/${org.subdomain}`,
            search: `${org.id}`,
            state: org,
        })
    }
    return (
        <div
            onMouseEnter={onHoveItem}
            className='map__org-item'
        >
            <img
                src={org.image_url}
                alt=""
                className="map__org-item-avt"
                onError={(e) => onErrorImg(e)}
            />
            <div className="content">
                <div>
                    <span className="org-name">
                        {org.name}
                    </span>
                    <div className="org_address">
                        <img src={icon.pinMap} alt="" />
                        <span>
                            {org?.full_address}
                        </span>
                    </div>
                </div>
                <div className="flex-row-sp org_bot">
                    <button onClick={gotoDetail} >Chi tiết</button>
                    <button
                        onClick={onDirect}
                    >
                        Chỉ đường
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrgItemMap;