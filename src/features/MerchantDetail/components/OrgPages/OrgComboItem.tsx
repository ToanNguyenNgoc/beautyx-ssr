import React from 'react';
import icon from '../../../../constants/icon';
import formatPrice from '../../../../utils/formatPrice';
import onErrorImg from '../../../../utils/errorImg';
import { Combo } from '../../../../interface/combo';
import { IOrganization } from '../../../../interface/organization';
import { Link } from 'react-router-dom'
import slugify from '../../../../utils/formatUrlString';
import scrollTop from '../../../../utils/scrollTop';
import { analytics } from '../../../../firebase';

interface IProps {
    org: IOrganization,
    combo: Combo
}

function OrgComboItem(props: IProps) {
    const { org, combo } = props;
    return (
        <Link
            to={{
                pathname: `/combo-detail/${slugify(combo?.name)}`,
                search: `org_id=${org?.id}&id=${combo?.id}`,
                state: { org_state: org, combo_state: combo }
            }}
            onClick={() => {
                scrollTop();
                analytics.logEvent('detail_combo', {
                    service: combo.name,
                    merchant: org.name
                })
            }}
        >
            <div
                className="org-special-item"
            >
                <div className="org-special-item__img">
                    <div className="org-special-item__rate">
                        <div className="flex-row rate-item">
                            <img src={icon.cartCheckPurple} alt="" />
                            <span className="rate-item__count">112+</span>
                        </div>
                    </div>
                    <img
                        src={combo?.images ? `${combo?.image_url}` : `${org?.image_url}`}
                        onError={(e) => onErrorImg(e)}
                        alt=""
                    />
                </div>
                <div className="org-special-item__detail">
                    <div className="item-head">
                        <span className="item-head__name">{combo?.name}</span>
                        {/* <span className="item-head__desc">{service?.description}</span> */}
                    </div>
                    <div className="item-price">
                        <span className="item-price__special">
                            {formatPrice(combo?.price)}đ
                        </span>
                        <span className="item-price__old">
                            {formatPrice(combo?.use_value)}đ
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default OrgComboItem;