import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
import { IOrganization } from "../../../interface/organization";
import {
    onDeleteFavoriteOrg,
    onFavoriteOrg,
} from "../../../redux/org/orgSlice";
import onErrorImg from "../../../utils/errorImg";
import { formatRouterLinkOrg } from "../../../utils/formatRouterLink/formatRouter";

interface IProps {
    org: IOrganization;
}

function DetailOrgCard(props: IProps) {
    const { t } = useContext(AppContext);
    const { org } = props;
    const ORG = useSelector((state: any) => state.ORG);
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const history = useHistory();
    const onFavoriteOrganization = async () => {
        if (USER) {
            if (org.is_favorite === false) {
                await dispatch(onFavoriteOrg(org));
            } else {
                await dispatch(onDeleteFavoriteOrg(org));
            }
        } else {
            history.push("/sign-in");
        }
    };
    return (
        <>
            <div className="detail-right__infoMer">
                <div className="infoMer-top">
                    <div className="infoMer-top__img">
                        <img
                            onError={(e) => onErrorImg(e)}
                            src={org.image_url}
                            alt=""
                        />
                    </div>
                    <div className="infoMer-top__right">
                        <p className="infoMer-top__name">{org.name}</p>
                        <p className="infoMer-top__address">
                            {org.address ? org.address : org.full_address}
                        </p>
                    </div>
                </div>

                <div className="infoMer-mid">
                    <div className="infoMer-item">
                        <div className="infoMer-item__wrap flexX-gap-4">
                            <p>{"4.5/5"}</p>
                            <img src={icon.star} alt="" />
                        </div>
                        <p className="infoMer-item__text">
                            {t("detail_item.evaluate")}
                        </p>
                    </div>
                    <div className="infoMer-item">
                        <div className="infoMer-item__wrap flexX-gap-4">
                            <p>{ORG.org?.favorites_count}</p>
                            <img src={icon.Favorite} alt="" />
                        </div>
                        <p className="infoMer-item__text">
                            {t("detail_item.favourite")}
                        </p>
                    </div>
                    <div className="infoMer-item">
                        <div className="infoMer-item__wrap flexX-gap-4">
                            <p>{"5"}</p>
                            <img src={icon.chatAll} alt="" />
                        </div>
                        <p className="infoMer-item__text">
                            {t("detail_item.comment")}
                        </p>
                    </div>
                </div>

                <div className="infoMer-bottom">
                    <button className="infoMer-bottom__left">
                        <Link
                            className="flex-row flexX-gap-4"
                            to={{ pathname: formatRouterLinkOrg(org.subdomain)}}
                        >
                            <img
                                style={{ width: "20px", height: "20px" }}
                                src={icon.archive}
                                alt=""
                            />
                            <p>{t("detail_item.seemore_spa")}</p>
                        </Link>
                    </button>
                    {org?.is_favorite === true ? (
                        <button
                            onClick={onFavoriteOrganization}
                            className="infoMer-bottom__right infoMer-bottom__right-active"
                        >
                            <p className="infoMer-bottom__right-active">
                                {t("detail_item.followed")}
                            </p>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={onFavoriteOrganization}
                                className="infoMer-bottom__right"
                            >
                                <img
                                    style={{ width: "20px" }}
                                    src={icon.rss}
                                    alt=""
                                />
                                <p>Theo Dõi</p>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailOrgCard;
