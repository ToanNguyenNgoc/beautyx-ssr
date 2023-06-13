/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { extraParamsUrl } from 'utils'
import { ICON } from "constants/icon2";
import { Container } from "@mui/material";
import { AppContext } from "context/AppProvider";
import style from './search-result.module.css'
import { useDeviceMobile } from "hooks";
// import TabServiceGroup from "./TabServiceGroup";
// import TabServiceProductable from "./TabServiceProductable";
// import TabService from "./TabService";
// import TabServiceGroup from "./TabServiceGroup";
import TabProductProductable from "./TabProductProductable";
import TabBranch from "./TabBranch";
import TabServiceProductable from "./TabServiceProductable";
import { BackTopButton } from "components/Layout";
// import TabOrg from "./TabOrg";

function SearchResults() {
    const { t } = useContext(AppContext) as any
    const IS_MB = useDeviceMobile()
    const params = useParams();
    const paramsUrl: any = extraParamsUrl()
    const keyword = paramsUrl?.keyword ?? ''
    const province = paramsUrl?.province ?? ''
    const tab = params.tab ?? 'dich-vu'
    const links = [
        {
            link: "dich-vu", title: t('Mer_de.services'),
            icon: ICON.servicePurple, act_icon: ICON.serviceWhite, show: province ? false : true
        },
        // {
        //     link: "san-pham", title: t('Mer_de.products'),
        //     icon: ICON.barberPurple, act_icon: ICON.barberWhite, show: province ? false : true
        // },
        {
            link: "cua-hang", title: t('my_ser.business'),
            icon: ICON.orgPurple, act_icon: ICON.orgWhite, show: true
        },
    ]
    const onSwitchLink = (link: string) => {
        return {
            pathname: `/ket-qua-tim-kiem/${link}`,
            search: province ? `province=${province}` : `keyword=${keyword}`
        }
    }
    //
    // let tabService = <TabService keyword={keyword} />
    // if (IS_MB) tabService = <TabServiceGroup keyword={keyword} />
    let tabService = <TabServiceProductable keyword={keyword} />
    if (IS_MB) tabService = <TabServiceProductable keyword={keyword} />
    return (
        <>
            <Container>
                <div className={style.container}>
                    <div className={style.left_cnt}>
                        <ul className={style.list_link}>
                            {
                                links
                                    .filter(link => link.show)
                                    .map(link => (
                                        <li key={link.link} className={style.link_item_cnt}>
                                            <Link
                                                replace={true}
                                                className={tab === link.link ? `${style.link_item} ${style.link_item_act}` : style.link_item}
                                                to={onSwitchLink(link.link)} >
                                                <div style={tab === link.link ? {
                                                    backgroundColor: "var(--purple)"
                                                } : {}} className={style.link_item_icon}>
                                                    <img src={tab === link.link ? link.act_icon : link.icon} alt="" />
                                                </div>
                                                <span className={style.link_item_text}>{link.title}</span>
                                            </Link>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                    <div className={style.right_cnt}>
                        {tab === "dich-vu" && <>{tabService}</>}
                        {tab === "san-pham" && <TabProductProductable keyword={keyword} />}
                        {/* {tab === "cua-hang" && <TabOrg keyword={keyword} />} */}
                        {tab === "cua-hang" && <TabBranch keyword={keyword} />}
                    </div>
                </div>
            </Container>
            <BackTopButton/>
        </>
    );
}

export default SearchResults;