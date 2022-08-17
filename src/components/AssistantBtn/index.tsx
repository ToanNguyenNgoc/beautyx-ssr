import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import icon from "../../constants/icon";
import Search from "../../features/Search";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import { handleChat } from "../../utils/customChat";
import img from "../../constants/img";
import "./style.css";
// ==== api tracking ====
import tracking from "../../api/trackApi";
// end
import useDeviceMobile from "../../utils/useDeviceMobile";
// import useScript from "../../utils/useScript";

export default function AssistantBtn() {
    const dispatch = useDispatch();
    const location: any = useLocation();
    const FLAT_FORM = EXTRA_FLAT_FORM();


    const viewDisable = ["/trang-thai-don-hang/", "/chat", "/map-box", "/ban-do"];
    let disable = false;
    if (viewDisable.includes(location.pathname)) {
        disable = true;
    }
    const { open } = useSelector((state: any) => state.SEARCH);
    const [overLay, setOverLay] = useState(false);
    const is_mb = useDeviceMobile();
    const history = useHistory();

    const handleOpenSearch = () => {
        const action = open ? false : true;
        tracking.SEARCH_CLICK();
        dispatch(onToggleSearchCnt(action));
    };
    const handleGoToHome = () => {
        history.push("/homepage");
    };

    const refOverLay: any = useRef();
    const refAssisBtn: any = useRef();
    const handleClickOverlay = () => {
        if (is_mb === true) {
            setOverLay(!overLay);
        }
    };

    const handleHover = () => {
        if (is_mb === false) {
            refAssisBtn.current.classList.add("assistantBtn-wrap-hover");
        }
    };
    const handleHoverLeave = () => {
        if (is_mb === false) {
            refAssisBtn.current.classList.remove("assistantBtn-wrap-hover");
        }
    };
    // () =>

    useEffect(() => {
        if (is_mb === true) {
            if (overLay === true) {
                refOverLay.current.classList.add("active");
                refAssisBtn.current.classList.add("assistantBtn-wrap-hover");
                document.body.style.overflow = "hidden";
            } else {
                refOverLay.current.classList.remove("active");
                refAssisBtn.current.classList.remove("assistantBtn-wrap-hover");
                document.body.style.overflow = "unset";
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overLay]);
    // const response = useGetMessageTiki();
    // useMemo(() => {
    //     alert(JSON.stringify(response))
    // }, [response])
    const checkoutPageSearch = location.pathname === "/ket-qua-tim-kiem/";
    return disable === true ? (
        <></>
    ) : (
        <>
            <div
                ref={refOverLay}
                onTouchStart={() => handleClickOverlay()}
                className="assistantBtn"
            >
                <div
                    onMouseEnter={() => handleHover()}
                    onMouseLeave={() => handleHoverLeave()}
                    ref={refAssisBtn}
                    className="assistantBtn-wrap"
                >
                    {location.pathname ===
                        "/ket-qua-tim-kiem/" ? null : is_mb === true ? (
                            <div
                                onTouchStart={() => handleOpenSearch()}
                                className="btn2 buttons"
                            >
                                <div className="btn-img">
                                    <img src={icon.search} alt="" />
                                </div>
                            </div>
                        ) : (
                        <div
                            onClick={() => handleOpenSearch()}
                            className="btn2 buttons"
                        >
                            <div className="btn-img">
                                <img
                                    style={{ width: "20px" }}
                                    src={icon.search}
                                    alt=""
                                />
                            </div>
                        </div>
                    )}

                    {is_mb === true ? (
                        <div
                            onTouchStart={() => handleChat()}
                            className="btn1 buttons"
                        >
                            <div className="btn-img">
                                <img
                                    style={{ width: "20px" }}
                                    src={icon.chatWhite}
                                    alt=""
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => handleChat()}
                            className="btn1 buttons"
                        >
                            <div className="btn-img">
                                <img
                                    style={{ width: "20px" }}
                                    src={icon.chatWhite}
                                    alt=""
                                />
                            </div>
                        </div>
                    )}

                    {is_mb === true ? (
                        <div
                            style={
                                checkoutPageSearch ? { bottom: "192px" } : {}
                            }
                            onTouchStart={handleGoToHome}
                            className="btn3 buttons"
                        >
                            <div className="btn-img">
                                <img
                                    style={{ width: "20px" }}
                                    src={icon.homeWhite}
                                    alt=""
                                />
                            </div>
                        </div>
                    ) : (
                        <div onClick={handleGoToHome} className="btn3 buttons">
                            <div className="btn-img">
                                <img
                                    style={{ width: "20px" }}
                                    src={icon.homeWhite}
                                    alt=""
                                />
                            </div>
                        </div>
                    )}
                    <div id="floating-button">
                        <div className="plus">
                            <img src={img.beautyx} alt="" />{" "}
                        </div>
                        <img alt="" className="edit" src={icon.xWhite}></img>
                    </div>
                </div>
            </div>
            <Search />
        </>
    );
}
