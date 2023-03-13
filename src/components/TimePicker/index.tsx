import React, { useState } from "react";
import dayjs from "dayjs";
import TimeItem from "./components/TimeItem";
import "./timePicker.css";
import { IOrganization } from "interface";
import { extraOrgTimeWork } from "pages/MerchantDetail/Functions/extraOrg";

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
    // const { from_time_opening, to_time_opening } = time_works_today;
    const from_time_opening = time_works_today?.from_time_opening ?? ''
    const to_time_opening = time_works_today?.to_time_opening ?? ''
    // const from_time_opening = ''
    // const to_time_opening = ''
    const timeOpen = from_time_opening.split(":").filter(Boolean);
    const timeClose = to_time_opening.split(":").filter(Boolean);
    const [t, setT] = useState();
    let timeOpens = dayjs()
        .set("hour", timeOpen.length > 0 ? parseInt(timeOpen[0]) : 8)
        .set("minute", timeOpen.length > 0 ? parseInt(timeOpen[1]) : 0)
        .set("second", 0)
        .subtract(30, "minute");

    let timeCloses = dayjs()
        .set("hour", timeOpen.length > 0 ? parseInt(timeClose[0]) : 21)
        .set("minute", timeClose.length > 0 ? (parseInt(timeClose[1])) : 0)
        .set("second", 0);

    const arr: any = [];
    while (timeOpens < timeCloses) {
        timeOpens = timeOpens.add(30, "minute");
        arr.push(timeOpens);
    }
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
                />
            ))}
        </div>
    );
}

export default TimePicker;
