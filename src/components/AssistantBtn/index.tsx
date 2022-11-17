import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import icon from "../../constants/icon";
import { handleChat } from "../../utils/customChat";
import img from "../../constants/img";
import "./style.css";
import { useDeviceMobile } from "hooks";
// ==== api tracking ====
// end
// import useScript from "../../utils/useScript";

export default function AssistantBtn() {
    const location: any = useLocation();
    // const FLAT_FORM = EXTRA_FLAT_FORM();


    const viewDisable = ["/trang-thai-don-hang/", "/chat", "/map-box", "/ban-do"];
    let disable = false;
    if (viewDisable.includes(location.pathname)) {
        disable = true;
    }
    const [overLay, setOverLay] = useState(false);
    const is_mb = useDeviceMobile();
    const history = useHistory();

    const handleGoToHome = () => {
        history.push("/");
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
                refOverLay.current.classList.add("active_btn");
                refAssisBtn.current.classList.add("assistantBtn-wrap-hover");
                document.body.style.overflow = "hidden";
            } else {
                refOverLay.current.classList.remove("active_btn");
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
            {/* <Search /> */}
        </>
    );
}
