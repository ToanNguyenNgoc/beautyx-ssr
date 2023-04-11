import React from "react";
import range from "lodash-es/range";
import dayjs from "dayjs";
function Calendar(props: any) {
    const {
        weekDays,
        weekDayOfFirst,
        weekDayOfLast,
        thisYear,
        thisMonth,
        daysInMonth,
        dayObjOfFirstMonth,
        dayObjOfLastMonth,
        datepick,
        handleGetDate,
    } = props;
    return (
        <>
            <div className="calendar">
                <div className="week-container">
                    {weekDays.map((d: any) => (
                        <div className="week-cell" key={d}>
                            {d}
                        </div>
                    ))}
                </div>

                <div className="day-container">
                    {range(weekDayOfFirst).map((i: number) => (
                        <div className="day-cell day-cell--faded" key={i}>
                            {dayObjOfFirstMonth
                                .subtract(weekDayOfFirst - i, "day")
                                .date()}
                        </div>
                    ))}
                    {range(daysInMonth).map((i: number) => (
                        <div
                            // click active
                            onClick={() =>
                                handleGetDate(i, thisMonth, thisYear)
                            }
                            className={`day-cell day-cell--in-month dot-active ${
                                i + 1 === datepick.date &&
                                thisMonth === datepick.month &&
                                thisYear === datepick.year
                                    ? "  day-cell--today-cur"
                                    : ""
                            } 
                            ${
                                i + 1 < dayjs().date() &&
                                thisMonth === dayjs().month() &&
                                thisYear === dayjs().year()
                                    ? " day-cell--faded"
                                    : " "
                            } 
                            ${
                                i + 1 === dayjs().date() &&
                                thisMonth === dayjs().month() &&
                                thisYear === dayjs().year()
                                    ? " day-cell--today"
                                    : ""
                            }`}
                            key={i}
                        >
                            {i + 1}
                        </div>
                    ))}
                    {range(13 - weekDayOfLast).map((i: number) => (
                        <div className="day-cell day-cell--faded" key={i}>
                            {dayObjOfLastMonth.add(i + 1, "day").date()}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Calendar;
