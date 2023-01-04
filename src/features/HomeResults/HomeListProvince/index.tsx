import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onResetFilter } from "redux/filter-result";
import { AppContext } from "context/AppProvider";
import { IProvince } from "interface";
import { formatRoundOrgCount, scrollTop } from "utils";
import { useDeviceMobile, useSearchKeyword } from "hooks";
import { Input, XButton } from "components/Layout";
import icon from "constants/icon";
import style from './list-province.module.css'
import { Masonry } from "@mui/lab";

function HomeListProvince() {
    const [value, setValue] = useState('')
    const IS_MB = useDeviceMobile()
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
    const provinces = useSearchKeyword(value, provinces_org)
    const list = value === '' ? provinces_org : provinces
    return (
        <>
            {
                IS_MB &&
                <div className={style.head}>
                    <XButton
                        onClick={() => history.goBack()}
                        icon={icon.chevronLeft}
                        iconSize={28}
                    />
                    <Input
                        classNamePar={style.head_input}
                        className={style.head_input_child}
                        icon={icon.searchPurple}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Tìm kiếm tỉnh thành...."
                    />
                </div>
            }
            <Container>
                <div className={style.container}>
                    <Masonry columns={IS_MB ? 2 : 4} spacing={IS_MB ? 1 : 2}>
                        {list?.map(
                            (item: IProvince, index: number) => (
                                <div
                                    onClick={() => gotoResult(item)}
                                    key={index}
                                    className={style.province}
                                >
                                    <img src={`${item.media[1].original_url}`} alt="" />
                                    <div className={style.province_item}>
                                        <span>{item.name}</span>
                                        <span>
                                            {formatRoundOrgCount(item.organizations_count + item?.branches_count)}{" "}
                                            {t("home_2.beauty_places")}{" "}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </Masonry>
                </div>
            </Container>
        </>
    );
}

export default HomeListProvince;
