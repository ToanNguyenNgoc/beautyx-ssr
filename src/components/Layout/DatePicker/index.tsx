/* eslint-disable dot-location */
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import range from "lodash-es/range";
import style from "./date.module.css"
import { AppContext } from 'context/AppProvider';
import { NewAppointments } from 'interface/appointment';
import icon from 'constants/icon';

interface DatePickerProps {
    onChange?: (e: string) => void;
    onGetDate?: any,
    onChangeMonth?: (e: any) => void,
    disablePrev?: boolean;
    appointments?: NewAppointments[]
}
const todayObj = dayjs();
// const curMonth = todayObj.format("MM")
export function DatePicker(props: DatePickerProps) {
    const { t } = useContext(AppContext) as any;
    const {
        onChange,
        onChangeMonth,
        appointments,
        onGetDate,
        disablePrev
    } = props;

    const [dayObj, setDayObj] = useState(dayjs());
    const checkDisableDayPrev = (day: string) => {
        let disable = false
        const month = dayObj.locale("vi").format("MM")
        const year = dayObj.format('YYYY')
        if (!disablePrev) disable = false
        if (disablePrev &&
            parseInt(`${year}${month}${day}`) < parseInt(`${todayObj.format('YYYY')}${todayObj.format("MM")}${todayObj.format("DD")}`)) {
            disable = true
        }
        return disable
    }


    const weekDays = [
        `${t("Home.su")}`,
        `${t("Home.mo")}`,
        `${t("Home.tu")}`,
        `${t("Home.we")}`,
        `${t("Home.th")}`,
        `${t("Home.fr")}`,
        `${t("Home.sa")}`,
    ];
    let thisYear = dayObj.year();
    let thisMonth = dayObj.month();
    let daysInMonth = dayObj.daysInMonth();
    let dayObjOfFirstMonth = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    let weekDayOfFirst = dayObjOfFirstMonth.day();
    let dayObjOfLastMonth = dayjs(
        `${thisYear}-${thisMonth + 1}-${daysInMonth}`
    );
    let weekDayOfLast = dayObjOfLastMonth.day();
    const [, setChooseMonth] = useState(dayjs().format("YYYY-MM"));
    const handlePrev = () => {
        setDayObj(dayObj.subtract(1, "month"));
        setChooseMonth(dayObj.subtract(1, "month").format("YYYY-MM"));
        if (onChangeMonth) {
            onChangeMonth(dayObj.subtract(1, "month").format("YYYY-MM"))
        }
    };
    const handleNext = () => {
        setDayObj(dayObj.add(1, "month"));
        setChooseMonth(dayObj.add(1, "month").format("YYYY-MM"));
        if (onChangeMonth) {
            onChangeMonth(dayObj.add(1, "month").format("YYYY-MM"))
        }
    };
    // hander pick active calendar
    const [datepick, setdatepick] = useState({
        date: todayObj.date(),
        month: todayObj.month(),
        year: todayObj.year(),
    });
    const handleGetDate = (date: any, thisMonth: any, thisYear: any) => {
        const day = `0${date + 1}`.slice(-2)
        const disable = checkDisableDayPrev(day)
        if (!disable) {
            setdatepick({
                date: date + 1,
                month: thisMonth,
                year: thisYear,
            });
            const timeBook = {
                year: `${thisYear}`,
                month:
                    thisMonth + 1 < 10 ? `0${thisMonth + 1}` : `${thisMonth + 1}`,
                date: date + 1 < 10 ? `0${date + 1}` : `${date + 1}`,
            };
            if (onChange) {
                onChange(`${timeBook.year}-${timeBook.month}-${timeBook.date}`);
            }
            if (onGetDate) {
                onGetDate(thisYear)
            }
        }
    };
    return (
        <div className={style.date_cnt}>
            <div
                className={style.date_month_cnt}
            >
                <button onClick={handlePrev} className={style.date_btn_month}>
                    <img
                        src={icon.pPrev}
                        alt=""
                        width={22} height={22}
                    />
                </button>
                <span className={style.date_month_text}>
                    {dayObj.locale("vi").format("MM - YYYY")}
                </span>
                <button onClick={handleNext} className={style.date_btn_month}>
                    <img
                        src={icon.pNext}
                        alt=""
                        width={22} height={22}
                    />
                </button>
            </div>
            <div className={style.date_day_cnt}>
                <div className={style.week_container}>
                    {weekDays.map((d: any) => (
                        <div className={style.week_cell} key={d}>
                            {d}
                        </div>
                    ))}
                </div>
                <div className={style.day_container}>
                    {range(weekDayOfFirst).map((i: number) => {
                        return (
                            <div
                                onClick={handlePrev}
                                className={`${style.day_cell_item} ${style.day_fade}`} key={i}
                            >
                                {dayObjOfFirstMonth
                                    .subtract(weekDayOfFirst - i, "day")
                                    .date()}
                            </div>
                        )
                    })}
                    {range(daysInMonth).map((i: number) => {
                        const day = `0${i + 1}`.slice(-2)
                        const disable = checkDisableDayPrev(day)
                        const day_apps = appointments?.
                            find(app => app.date_start === `${dayObj.format("YYYY-MM")}-${day}`)
                        return (
                            <div
                                onClick={() =>
                                    handleGetDate(i, thisMonth, thisYear)
                                }
                                key={i}
                                className={`${style.day_cell_item} ${(
                                    i + 1 === dayjs().date() && thisMonth === dayjs().month() && thisYear === dayjs().year()
                                ) && style.day_current}`}
                                style={
                                    (i + 1 === datepick.date && datepick.month + 1 === parseInt(dayObj.format("MM"))) ?
                                        { border: "solid 1px var(--purple)" }
                                        :
                                        {}
                                }
                            >
                                {disable && <div className={style.day_cell_item_dis}></div>}
                                {i + 1}
                                {day_apps &&
                                    <div className={style.list_dots}>
                                        {
                                            day_apps.apps.
                                                slice(0, 3).
                                                map((app => (
                                                    <span key={app.id} className={style.list_dots_item}></span>
                                                )))
                                        }
                                        {
                                            day_apps.apps?.length >= 4 &&
                                            <span className={style.list_dots_item_plus}>+</span>
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })}
                    {range(13 - weekDayOfLast).map((i: number) => {
                        const day_apps = appointments?.
                            find(app => app?.date_start === dayObjOfLastMonth.add(i + 1, "day").format("YYYY-MM-DD"))
                        return (
                            <div
                                onClick={handleNext}
                                className={`${style.day_cell_item} ${style.day_fade}`} key={i}
                            >
                                {dayObjOfLastMonth.add(i + 1, "day").date()}
                                {day_apps &&
                                    <div className={style.list_dots}>
                                        {
                                            day_apps.apps.
                                                slice(0, 3).
                                                map((app => (
                                                    <span key={app.id} className={style.list_dots_item}></span>
                                                )))
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}