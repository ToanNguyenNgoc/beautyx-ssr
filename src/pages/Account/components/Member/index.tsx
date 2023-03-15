import { AppContext } from "context/AppProvider";
import IStore from "interface/IStore";
import { HeadTitle } from "pages/Account";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import style from "./member.module.css";

const tabContent = [
    {
        id: 1,
        title: "Member",
        price: "5.000.000 triệu",
        reduce: "5%",
        bonus: "5%",
        benefit: "giam 10% khi gioi thieu ban be",
    },
    {
        id: 2,
        title: "Silver",
        price: "15.000.000 triệu",
        reduce: "5%",
        bonus: "5%",
        benefit: "giam 10% khi gioi thieu ban be",
    },
    {
        id: 3,
        title: "Gold",
        price: "25.000.000 triệu",
        reduce: "5%",
        bonus: "5%",
        benefit: "giam 10% khi gioi thieu ban be",
    },
    {
        id: 4,
        price: "35.000.000 triệu",
        title: "Vlatinum",
        reduce: "5%",
        bonus: "5%",
        benefit: "giam 10% khi gioi thieu ban be",
    },
    {
        id: 5,
        title: "VVIP",
        price: "45.000.000 triệu",
        reduce: "5%",
        bonus: "5%",
        benefit: "giam 10% khi gioi thieu ban be",
    },
];
export default function Member() {
    const { USER } = useSelector((state: IStore) => state.USER);
    const { t } = useContext(AppContext) as any;
    const [tabActive, setTabActive] = useState(1);
    return (
        <>
            <HeadTitle title={t("Header.member")} />
            <div className={style.memberContainer}>
                <div className={style.member}>
                    <div className={style.memberTop}>
                        <p className={style.memberTitle}>
                            {t("Header.member")} <span>Bạc</span>
                        </p>
                        <p className={style.memberSeemore}>
                            {t("app.details")}
                        </p>
                    </div>
                    <div className={style.memberBot}>
                        <div className={style.memberInfoWrap}>
                            <div className={style.memberAvatar}>
                                <img src={USER?.avatar} alt="" />
                            </div>
                            <div className={style.memberInfo}>
                                <p className={style.memberName}>
                                    {USER?.fullname}
                                </p>
                                <p className={style.memberNumber}>
                                    {USER?.telephone}
                                </p>
                            </div>
                        </div>
                        <div className={style.memberProgress}>
                            <p className={style.memberProgressRank}>Vàng</p>
                            <div className={style.progressBar}>
                                <div className={style.progressPercent}></div>
                            </div>
                            <div className={style.memberProgressInfo}>
                                <p>
                                    {t("acc.targets")} <span>10.000.000</span>
                                </p>

                                <p>/15 triệu</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.memberRank}>
                    <p className={style.memberTitle}>
                        {t("acc.rank_information")} <span>thành viên</span>
                    </p>

                    <div className={style.memberTable}>
                        <div className={style.tableHeader}>
                            <p className={style.tableHeaderTitle}>
                                {t(
                                    "acc.go_to_the_next_level_to_get_extra_Extras"
                                )}
                            </p>
                        </div>
                        <ul className={style.tableTabList}>
                            {tabContent.map((item: any) => (
                                <li
                                    style={
                                        tabActive === item.id
                                            ? {
                                                  borderBottom:
                                                      "2px solid #f5c031",
                                              }
                                            : {}
                                    }
                                    onClick={() => setTabActive(item.id)}
                                    key={item.id}
                                    className={style.tableTabItem}
                                >
                                    <p
                                        style={
                                            tabActive === item.id
                                                ? {
                                                      color: "#f5c031",
                                                  }
                                                : {}
                                        }
                                        className={style.styleTabletTitle}
                                    >
                                        {item.title}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className={style.tableContent}>
                            <ul className={style.tableContentList}>
                                {tabContent.map((item: any) => (
                                    <li
                                        style={
                                            tabActive === item.id
                                                ? { display: "flex" }
                                                : { display: "none" }
                                        }
                                        className={style.contentItems}
                                    >
                                        <div className={style.contentItem}>
                                            <p className={style.itemTitle}>
                                                {t("acc.spending")}
                                                {": "}
                                                <span
                                                    className={style.itemText}
                                                >
                                                    {item.price}
                                                </span>
                                            </p>
                                        </div>

                                        <div className={style.contentItem}>
                                            <p className={style.itemTitle}>
                                                {t("acc.discount_on_bill")}
                                                {": "}
                                                <span
                                                    className={style.itemText}
                                                >
                                                    {item.reduce}
                                                </span>
                                            </p>
                                        </div>

                                        <div className={style.contentItem}>
                                            <p className={style.itemTitle}>
                                                {t("acc.bonus")}
                                                {": "}
                                                <span
                                                    className={style.itemText}
                                                >
                                                    {item.bonus}
                                                </span>
                                            </p>
                                        </div>

                                        <div className={style.contentItem}>
                                            <p className={style.itemTitle}>
                                                {t("acc.benefit")}
                                                {": "}
                                                <span
                                                    className={style.itemText}
                                                >
                                                    {item.benefit}
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
