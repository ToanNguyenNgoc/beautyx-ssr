import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import icon from "../../../constants/icon";
import dayjs from "dayjs";
function Month(props: any) {
    const { language } = useContext(AppContext) as any;
    const [, setLocale] = useState(language);
    const { handlePrev, handleNext, dayObj, thisMonth } = props;
    useEffect(() => {
        if (language === "vn") {
            setLocale("vi");
        } else if (language === "en") {
            setLocale("en");
        }
    }, [language]);

    return (
        <div className={props.Class}>
            <div
                style={{
                    padding: "16px 0",
                    borderBottom: "1px solid var(--purple)",
                }}
                className="calendar-mounth"
            >
                {thisMonth + 1 !== dayjs().month() + 1 ? (
                    <div onClick={handlePrev} className="calendar-mounth__prev">
                        <img
                            className="calendar-mounth__icon"
                            src={icon.pPrev}
                            alt=""
                        />
                    </div>
                ) : (
                    <div
                        style={{ pointerEvents: "none", opacity: "0.5" }}
                        className="calendar-mounth__prev"
                    >
                        <img
                            className="calendar-mounth__icon"
                            src={icon.pPrev}
                            alt=""
                        />
                    </div>
                )}

                <span className="calendar-mounth__time text-white-color text-capitalize">
                    {dayObj.locale("vi").format("MMMM - YYYY")}
                </span>
                <div onClick={handleNext} className="calendar-mounth__next">
                    <img
                        className="calendar-mounth__icon"
                        src={icon.pNext}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default Month;
