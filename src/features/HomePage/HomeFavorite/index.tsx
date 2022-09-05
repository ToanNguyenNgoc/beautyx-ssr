/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { IOrganization } from "../../../interface/organization";
import OrgItem from "../../ViewItemCommon/OrgItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeFavorite.css";
import { fetchAsyncOrgsFavorite } from "../../../redux/home/homePageSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../../redux/status";
import { AppContext } from "../../../context/AppProvider";

export default function HomeFavorite() {
    const { ORGS_FAVORITE } = useSelector((state: any) => state.HOME_PAGE);
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { orgs, status } = ORGS_FAVORITE;
    const callOrgsFavorite = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(
                fetchAsyncOrgsFavorite({
                    page: 1,
                    isEcommerce: true,
                    // sort:"priority"
                    // include: "favorites_count",
                    sort:"-favorites_count"
                })
            );
        }
    };
    useEffect(() => {
        callOrgsFavorite();
    }, []);

    return (
        <div className="home-favorite">
            <HomeTitle title={t("home_2.favorite_places")} />
            <ul className="home-favorite__list">
                {
                    orgs
                        .map((item: IOrganization, index: number) => (
                            <li key={index} className="home-favorite__item">
                                <OrgItem org={item} />
                            </li>
                        ))}
            </ul>
        </div>
    );
}
