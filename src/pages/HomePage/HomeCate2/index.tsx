import { XButton } from "components/Layout";
import icon from "constants/icon";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { onChooseTab } from "redux/cate-tree/cateTreeSlice";
import { onResetFilter } from "redux/filter-result";
import { useDeviceMobile } from "hooks";
import HomeLocation from "../HomeLocation";
import style from "./style.module.css";

function HomeCate2() {
    const IS_MB = useDeviceMobile();
    const dispatch = useDispatch();
    const history = useHistory();
    const cates = [
        { title: "Sản phẩm", icon: icon.cateSanpham, link: `product` },
        {
            title: "Spa",
            icon: icon.cateSpa,
            link: `/ket-qua-tim-kiem/dich-vu?keyword=spa`,
        },
        {
            title: "Nail",
            icon: icon.cateNail,
            link: `/ket-qua-tim-kiem/dich-vu?keyword=nail`,
        },
        {
            title: "Salon",
            icon: icon.cateSalon,
            link: `/ket-qua-tim-kiem/dich-vu?keyword=salon`,
        },
        {
            title: "Nha khoa",
            icon: icon.cateClinic,
            link: `/ket-qua-tim-kiem/dich-vu?keyword=Nha khoa`,
        },
        {
            title: "Thẩm mỹ viện",
            icon: icon.cateSpa,
            link: `/ket-qua-tim-kiem/dich-vu?keyword=Thẩm mỹ viện`,
        },
    ];
    const onCateClick = (cate: any) => {
        if (cate.link === "product") {
            dispatch(onChooseTab("PRODUCT"));
            history.push("/-danh-muc");
        } else {
            dispatch(onResetFilter());
            history.push(cate.link);
        }
    };
    return (
        <div className={style.home_cate2}>
            <div className={style.wrapper}>
                <div className={style.container}>
                    {cates.map((item) => (
                        <div
                            onClick={() => onCateClick(item)}
                            key={item.title}
                            className={style.item_cnt}
                        >
                            <XButton
                                icon={IS_MB ? item.icon : ""}
                                title={IS_MB ? "" : item.title}
                                className={style.item_btn}
                            />
                            <span className={style.item_title}>
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <HomeLocation />
        </div>
    );
}

export default HomeCate2;
