import React from 'react';
import dayjs from "dayjs";
import style from "./time.module.css"
import { extraOrgTimeWork } from 'features/MerchantDetail/components/Functions/extraOrg';
import { IOrganization } from 'interface/organization';

interface TimePickerProps {
    org?: IOrganization,
    disablePrev?: boolean,
    onChange?: (e: any) => void
    value?: any,
    datePicker?: string
}

export function TimePicker(props: TimePickerProps) {
    const { org, disablePrev, onChange, value, datePicker } = props;
    const orgTimes: any[] = extraOrgTimeWork(org?.opening_time)
    let hourOpen = 8
    let minuteOpen = 0
    let hourClose = 21
    let minuteClose
    if (orgTimes) {
        hourOpen = parseInt(orgTimes[0]?.from_time_opening?.slice(0, 2))
        minuteOpen = parseInt(orgTimes[0]?.from_time_opening?.slice(-2))

        hourClose = parseInt(orgTimes[0]?.to_time_opening?.slice(0, 2))
        minuteClose = parseInt(orgTimes[0]?.to_time_opening?.slice(-2))
    }
    let timeOpens = dayjs()
        .set("hour", hourOpen)
        .set("minute", minuteOpen)
        .set("second", 0)
        .subtract(30, "minute");

    let timeCloses = dayjs()
        .set("hour", hourClose)
        .set("minute", minuteClose ?? 0)
        .set("second", 0);

    const arr: any = [];
    while (timeOpens < timeCloses) {
        timeOpens = timeOpens.add(30, "minute");
        arr.push(timeOpens);
    }
    const onCheckDisable = (time: any) => {
        let disable = false
        const timeNowNum = parseInt(`${dayjs().format("HH")}${dayjs().format("mm")}`)
        const timeItemNum = parseInt(`${time.format("HH")}${time.format("mm")}`)
        const dayPick = datePicker !== "" && dayjs(datePicker).format("YYYYMMDD")
        const dayPickerNum = dayPick && parseInt(dayPick)
        const todayNum = parseInt(dayjs().format("YYYYMMDD"))
        if (disablePrev && timeItemNum < timeNowNum && datePicker && dayPickerNum <= todayNum) {
            disable = true
        }
        return disable

    }
    const onTimeItemClick = (e: any) => onChange && onChange(e)
    return (
        <div className={style.container}>
            <div className={style.header}>
                <span>Thời gian : {value !== "" && value}</span>
            </div>
            <div className={style.body}>
                <ul className={style.time_list}>
                    {
                        arr.map((item: any, index: number) => {
                            const disable = onCheckDisable(item)
                            return (
                                <li
                                    key={index}
                                    className={style.time_list_item}
                                >
                                    <div
                                        onClick={() => onTimeItemClick(item)}
                                        style={value === item.format("HH:mm") ? {
                                            border: "solid 1px var(--purple)"
                                        } : {}}
                                        className={`${style.item} ${disable && style.item_dis}`}
                                    >
                                        {item.format("HH:mm")}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}