import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import Slider from "react-slick";

export default function ServiceDetailLeft(props: any) {
    const { org, service } = props;
    const videoRef = useRef<any>();
    console.log(videoRef);
    const history = useHistory();
    const dispatch = useDispatch();
    const percent = service
        ? Math.round(100 - (service.special_price / service?.price) * 100)
        : null;
    const { USER } = useSelector((state: any) => state.USER);
    const onFavorite = async () => {
        if (USER) {
            const valueService = {
                org_id: org?.id,
                detail: service,
            };
            if (service.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };
    const setting = {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        // nextArrow: <NextButton />,
        // prevArrow: <PrevButton />,
        swipe: true,
        autoplaySpeed: 2000,
    }
    return (
        <div className="service-detail__left flex-column">
            <div className="detail-left__img">
                <Slider
                    {...setting}
                >
                    {
                        service?.video &&
                        <div className="detail-left__img-item detail-left__img-item-vd">
                            <video
                                className="detail-left__img-bg"
                                autoPlay={true}
                                loop
                                muted
                            >
                                <source src={service?.video_url} />
                            </video>
                            <video
                                webkit-playsinline="webkit-playsinline"
                                className="detail-left__img-item-video"
                                controls
                                autoPlay={true}
                                loop
                                muted
                            >
                                <source src={service?.video_url} />
                            </video>
                        </div>
                    }
                    <div className="detail-left__img-item">
                        <img
                            src={
                                service?.image_url ? service?.image_url : org?.image_url
                            }
                            alt=""
                            onError={(e) => onErrorImg(e)}
                        />
                    </div>
                </Slider>
            </div>
            {/* detail service mobile */}
            <div className="service-detail__mobile">
                <div className="service-detail__mobile-top">
                    <p className="service-detail__mobile-name">
                        {service.service_name}
                    </p>
                    <div
                        onClick={onFavorite}
                        className="service-detail__mobile-favorite"
                    >
                        <img
                            src={
                                service?.is_favorite ? icon.heart : icon.unHeart
                            }
                            alt=""
                        />
                    </div>
                </div>

                <div className="service-detail__mobile-mid">
                    <img src={icon.alarmClock} alt="" />
                    <p className="service-detail__mobile-duration">
                        {service.duration} phút
                    </p>
                </div>

                <div className="service-detail__mobile-bottom">
                    {service?.special_price > 0 && (
                        <div className="service-detail__mobile-percent">
                            Giảm {percent}%
                        </div>
                    )}
                    <div className="service-detail__mobile-price">
                        {service?.special_price > 0 ? (
                            <>
                                <span>
                                    {formatPrice(service?.special_price)}đ
                                </span>
                                <span>{formatPrice(service?.price)}đ</span>
                            </>
                        ) : (
                            <span>{formatPrice(service?.price)}đ</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
