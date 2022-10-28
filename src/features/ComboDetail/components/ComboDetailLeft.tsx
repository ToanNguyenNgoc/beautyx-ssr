import React from "react";
import icon from "../../../constants/icon";
import { Combo } from "../../../interface/combo";
import { IOrganization } from "../../../interface/organization";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";

interface IProps {
    combo: Combo;
    org: IOrganization;
}

function ComboDetailLeft(props: IProps) {
    const { combo, org } = props;
    const list_price = [combo?.price, combo?.use_value].sort((a, b) => b - a);
    const price = list_price[0];
    const special_price = list_price[1];
    const percent = Math.round(100 - (special_price / price) * 100);

    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            combo?.image_url ? combo?.image_url : org?.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                <div className="service-detail__mobile">
                    <div className="service-detail__mobile-top">
                        <p className="service-detail__mobile-name">
                            {combo?.name}
                        </p>
                        <div
                            //onClick={onFavorite}
                            className="service-detail__mobile-favorite"
                        >
                            <img src={icon.heart} alt="" />
                        </div>
                    </div>

                    {/* <div className="service-detail__mobile-mid">
                        <img src={icon.alarmClock} alt="" />
                        <p className="service-detail__mobile-duration">
                            {service.duration} phút
                        </p>
                    </div> */}

                    <div className="service-detail__mobile-bottom">
                        {combo?.use_value > 0 && (
                            percent && percent > 1 ?
                                <div className="service-detail__mobile-percent">
                                    Giảm {percent}%
                                </div> : ''
                        )}
                        <div className="service-detail__mobile-price">
                            {combo?.use_value > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(combo?.use_value)}đ
                                    </span>
                                    <span>{formatPrice(combo?.price)}đ</span>
                                </>
                            ) : (
                                <span>{formatPrice(combo?.price)}đ</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComboDetailLeft;
