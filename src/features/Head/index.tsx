/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import ButtonLoading from "components/ButtonLoading";
import img from "constants/img";
import icon from "constants/icon";
import { ICON } from "constants/icon2"
import style from "./head.module.css"
import { Container } from "@mui/material"
import { Link, useHistory } from "react-router-dom";

interface IProps {
    IN_HOME?: boolean,
    setCloseDialog?: (closeDialog?: boolean) => void,
    headerStyle?: any,
    handleCancelPayment?: () => void,
    prev_url?: string,
}

function Head(props: IProps) {
    const history = useHistory();

    return (
        <div className={style.container}>
            <Container>
                <div className={style.head_wrapper}>
                    <div className={style.head_top}>
                        <div className={style.head_top_left}>
                            <Link to={{ pathname: "/" }}>
                                <img className={style.head_top_left_img} src={img.beautyX} alt="" />
                            </Link>
                            <button className={style.head_top_left_search}>
                                <img className={style.head_search_icon} alt="" src={icon.searchPurple} />
                                <input
                                    className={style.head_search_input}
                                    type="text" placeholder="Bạn muốn tìm kiếm gì..."
                                />
                            </button>
                        </div>
                        <div className={style.head_top_right}>
                            <div className={style.head_top_right_auth}>
                                <ButtonLoading
                                    className={style.head_sign_btn} title="Đăng ký"
                                />
                                <ButtonLoading
                                    onClick={() => history.push("/sign-in?1")}
                                    className={style.head_sign_btn} title="Đăng nhập"
                                />
                            </div>
                            <button className={style.head_top_right_btn}>
                                <img src={ICON.calendarAct} alt="" />
                            </button>
                            <button className={style.head_top_right_btn}>
                                <img src={icon.Bell} alt="" />
                            </button>
                            <button className={style.head_top_right_btn}>
                                <img src={icon.Menu} alt="" />
                            </button>
                            <button className={style.head_top_right_btn}>
                                <span className={style.head_top_right_badge}>10</span>
                                <img src={icon.cartPurpleBold} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Head;
