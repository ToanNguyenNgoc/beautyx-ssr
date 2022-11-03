import { Container } from "@mui/material";
import React, { useContext } from "react";
//import icon from '../../../constants/icon';
import { AppContext } from "../../../context/AppProvider";
import { IProvince } from "../../../interface/provinces";
import Head from "../../Head";
import HeadTitle from "../../HeadTitle";
import scrollTop from "../../../utils/scrollTop";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatRoundOrgCount } from "../../../utils/format";
import { onResetFilter } from "redux/filter-result";

function HomeListProvince(props: any) {
    const dispatch = useDispatch()
    const { t } = useContext(AppContext);
    const HOME = useSelector((state: any) => state.HOME);
    const { provinces_org } = HOME;
    const history = useHistory();
    const gotoResult = (province: IProvince) => {
        history.push({
            pathname: "/ket-qua-tim-kiem/cua-hang",
            search: `?province=${province.province_code}`,
        });
        dispatch(onResetFilter())
        scrollTop();
    };
    return (
        <>
            <Head />
            <HeadTitle title={t("home_2.places_you_are_interested_in")} />
            <div className="home-province">
                <Container>
                    <div className="flex-row-sp home-se-promo__header">
                    </div>
                    <div className="home-province_list">
                        {provinces_org?.map(
                            (item: IProvince, index: number) => (
                                <div
                                    onClick={() => gotoResult(item)}
                                    key={index}
                                    className="home-province_item"
                                >
                                    <img
                                        src={`${item.media[1].original_url}`}
                                        alt=""
                                    />
                                    <div className="province-item-cnt">
                                        <span>{item.name}</span>
                                        <span>
                                            {formatRoundOrgCount(item.organizations_count + item?.branches_count)}{" "}
                                            {t("home_2.beauty_places")}{" "}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
}

export default HomeListProvince;
