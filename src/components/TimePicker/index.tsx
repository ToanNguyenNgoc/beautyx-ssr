import React, { useState } from "react";
import dayjs from "dayjs";
import TimeItem from "./components/TimeItem";
import "./timePicker.css";
import { IOrganization } from "../../interface/organization";
import { extraOrgTimeWork } from "../../pages/MerchantDetail/Functions/extraOrg";

interface IProps {
    onChange: (e: string) => void;
    disablePrev?: boolean;
    org?: IOrganization;
    bookTime: any;
}

function TimePicker(props: IProps) {
    const { onChange, disablePrev, org, bookTime } = props;
    const now = new Date();
    let today = now.getDay() + 1;
    if (now.getDay() + 1 === 1) {
        today = 8
    }
    const orgTimes = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
    const { from_time_opening, to_time_opening } = time_works_today;
    const timeOpen = from_time_opening.split(":");
    const timeClose = to_time_opening.split(":");
    // console.log("timeClose", timeClose);
    // let times = 25;
    const [t, setT] = useState();
    // var rows = [];
    let timeOpens = dayjs()
        .set("hour", timeOpen[0])
        .set("minute", timeOpen[1])
        .set("second", 0)
        .subtract(30, "minute");

    let timeCloses = dayjs()
        .set("hour", timeClose[0])
        .set("minute", timeClose[1])
        .set("second", 0);

    const arr: any = [];
    while (timeOpens < timeCloses) {
        timeOpens = timeOpens.add(30, "minute");
        arr.push(timeOpens);
    }

    // for (var i = 0; i <= times; i++) {
    //     if (i !== 8 && i !== 9) {
    //         rows.push(
    //             <TimeItem
    //                 key={i}
    //                 Time={timeOpens}
    //                 onChangeItem={(e) => onChange(e)}
    //                 disablePrev={disablePrev}
    //                 t={t}
    //                 setT={setT}
    //                 // Now={now}
    //                 // handleClick={handleTime}
    //                 // activeTime={activeTime}
    //                 // activeDate={activeDate}
    //             />
    //         );
    //     }
    //     timeOpens = timeOpens.add(30, "minute");
    // }
    // return <div className="time-pk">{rows}</div>;
    return (
        <div className="time-pk">
            {arr.map((item: any, i: number) => (
                <TimeItem
                    bookTime={bookTime}
                    key={i}
                    Time={item}
                    onChangeItem={(e) => onChange(e)}
                    disablePrev={disablePrev}
                    t={t}
                    setT={setT}
                // Now={now}
                // handleClick={handleTime}
                // activeTime={activeTime}
                // activeDate={activeDate}
                />
            ))}
        </div>
    );
}

export default TimePicker;
