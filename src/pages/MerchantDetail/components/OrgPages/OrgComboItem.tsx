import icon from 'constants/icon';
import { Combo, IOrganization } from 'interface';
import React from 'react';
import { Link } from 'react-router-dom'
import { onErrorImg, scrollTop, slugify } from 'utils';
import formatPrice from 'utils/formatPrice';
import { analytics, logEvent } from '../../../../firebase';

interface IProps {
    org: IOrganization,
    combo: Combo
}

function OrgComboItem(props: IProps) {
    const { org, combo } = props;
    return (
        <Link
            to={{
                pathname: `/combo-detail/${combo.id}_${org.id}_${slugify(combo?.name)}`,
                state: { org_state: org, combo_state: combo }
            }}
            onClick={() => {
                scrollTop();
                logEvent(analytics, 'detail_combo', {
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
                        {
                            combo?.special_price_momo > 0 ?
                                <>
                                    <span className="item-price__special">
                                        {formatPrice(combo?.special_price_momo)}đ
                                    </span>
                                    <span className="item-price__old">
                                        {formatPrice(combo?.use_value)}đ
                                    </span>
                                </>
                                :
                                <span className="item-price__special">
                                    {formatPrice(combo?.use_value)}đ
                                </span>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default OrgComboItem;