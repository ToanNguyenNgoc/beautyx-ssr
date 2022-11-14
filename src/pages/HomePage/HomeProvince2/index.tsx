import { AppContext } from "context/AppProvider";
import { IProvince } from "interface";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { formatRoundOrgCount, scrollTop } from "utils";
import HomeTitle from "../Components/HomeTitle";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export default function HomeProvince2() {
    const { t } = useContext(AppContext);
    const HOME = useSelector((state: any) => state.HOME);
    const { provinces_org } = HOME;
    return (
        <div className={style.home_province}>
            <div className={style.province_title_wrap}>
                <HomeTitle
                    onClick={scrollTop}
                    title={"Địa điểm"}
                    url={"/dia-diem-quan-tam"}
                    seemore={t("trending.watch_all") + " > "}
                />
            </div>

            <div className={style.home_province_list}>
                {provinces_org
                    ?.slice(0, 6)
                    .map((item: IProvince, index: number) => (
                        <Link
                            onClick={scrollTop}
                            key={index}
                            to={{
                                pathname: "/ket-qua-tim-kiem/cua-hang",
                                search: `?province=${item.province_code}`,
                            }}
                            className={style.home_province_item}
                        >
                            <div className={style.province_item_top}>
                                <div className={style.province_item_img}>
                                    <LazyLoadImage
                                        src={`${item?.media[1]?.original_url}`}
                                        alt=""
                                    />
                                </div>
                                <div className={style.province_item_content}>
                                    <p>
                                        {formatRoundOrgCount(
                                            item.organizations_count +
                                            item.branches_count
                                        )}
                                    </p>
                                    <p>{t("Home.location")}</p>
                                </div>
                            </div>
                            <div className={style.province_item_bottom}>
                                <p>{item?.name.replace("Thành phố", "")}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
