import React from "react";
import dayjs from "dayjs";

interface IProps {
    onChangeItem: (e: string) => void;
    Time: any;
    disablePrev?: boolean;
    t: any;
    setT: (t: any) => void;
    bookTime: any;
}

function TimeItem(props: IProps) {
    const { Time, onChangeItem, disablePrev, setT, t, bookTime } = props;
    let disableItem = disablePrev;
    const timePicNew = bookTime.date.split("-");
    const dayPickNumber = parseInt(`${timePicNew[0]}${timePicNew[1]}${timePicNew[2]}`)
    const todayNumber = parseInt(dayjs().format('YYYYMMDD'))

    if (dayPickNumber > todayNumber) {
        disableItem = false
    }
    if (
        dayPickNumber === todayNumber &&
        parseInt(Time.format('HHmm')) >= parseInt(dayjs().format('HHmm')) + 10
    ) {
        disableItem = false
    }


    const chooseTimeClick = () => {
        if (disableItem === false) {
            onChangeItem(Time.format("HH:mm"));
            setT(Time.format("HH:mm"));
        }
    };

    return (
        <div onClick={chooseTimeClick} className="date-pk__item">
            <div
                style={
                    disableItem === true
                        ? {
                            backgroundColor: "var(--text-hover)",
                            color: "var(--bgWhite)",
                            border: "1px solid transparent",
                            cursor: "not-allowed",
                        }
                        : {}
                }
                className={
                    Time.format("HH:mm") === t
                        ? "date-pk__item-box time-act"
                        : "date-pk__item-box"
                }
            >
                {Time.format("HH:mm")}
            </div>
        </div>
    );
}

export default TimeItem;
