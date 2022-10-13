import React, { useContext, useState } from 'react';
import moment from 'moment/moment';
import dayjs from 'dayjs';
import { paramAppointment } from "params-query"
import icon from 'constants/icon';
import { Appointment, AppointmentTime, NewAppointments } from 'interface/appointment';
import { unique, useDeviceMobile, useSwrInfinite } from 'utils';
import { useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { formatTime } from 'utils/format';
import { DatePicker } from 'components/Layout';
import { AppContext } from 'context/AppProvider';

import style from "./app.module.css";
import AppDetail from './AppDetail';

const getDaysInWeek = (dayObj: any) => {
  const days: any = [];
  [1, 2, 3, 4, 5, 6, 7].map((i, index) =>
    days.push(dayjs(dayObj.day(index)).format("YYYY-MM-DD"))
  );
  return days;
};

export function ApointmentTab() {
  const { USER } = useSelector((state: IStore) => state.USER)
  const [params, setParams] = useState(paramAppointment)
  const [datePick, setDatePick] = useState(dayjs().format("YYYY-MM-DD"))
  const [daysWeek, setDayWeeks] = useState(getDaysInWeek(dayjs()))
  const STATUS_LIST = [
    { title: "Đã xác nhận", img: icon.Exclude },
    { title: "Chưa xác nhận xác nhận", img: icon.Exclude2 },
    { title: "Hoàn thành", img: icon.Exclude3 },
    { title: "Hủy", img: icon.Exclude4 },
  ]
  const handleChangeParams = (month: string) => {
    setParams({
      ...params,
      "filter[time_start]": month
    })
  }
  const data: Appointment[] = useSwrInfinite(USER, "/appointments", params).resData
  const dataTime: AppointmentTime[] = data.map(i => {
    return {
      ...i,
      short_time: moment(i.time_start).format("YYYY-MM-DD"),
      short_month_year: moment(i.time_start).format("MM-YYYY"),
      start_at: parseInt(formatTime(i.time_start).slice(0, 2))

    }
  })
  const date_time_start = unique(data.map(i => moment(i.time_start).format("YYYY-MM-DD")));
  const new_appointments: NewAppointments[] = date_time_start.map(date => {
    return {
      date_start: date,
      year_month: moment(date).format("YYYY-MM"),
      month_day: moment(date).format("MM-DD"),
      apps: dataTime.filter(i => i.short_time === date)
    }
  })
  //handle date picker
  const handleSetDatePicker = (date: any) => {
    const dayObj = dayjs(date)
    setDatePick(date)
    getFirstDayOfW(dayObj)
    getLastDayOfW(dayObj)
    const newWeek = getDaysInWeek(dayObj)
    setDayWeeks(newWeek)
  }
  const getFirstDayOfW = (dayObj: any) => {
    if (dayObj.startOf("week").month() !== dayObj.month()) {
      // console.log(
      //     "đầu tuần của tuần đầu trong tháng",
      //     dayObj.startOf("month").startOf("week").date()
      // );
      return dayObj.startOf("month");
    }
    // console.log(`đầu tuần`, dayObj.startOf("week").date());
    return dayObj.startOf("week");
  };
  // lấy ngày cuối cùng trong tuần
  const getLastDayOfW = (dayObj: any) => {
    if (dayObj.day() === 6) {
      // console.log("click ngày cuối tuần", dayObj.endOf("week").date());
      return dayObj;
    }
    if (
      dayObj.endOf("week").add(1, "day").month() !== dayObj.month()
    ) {
      // console.log(
      //     "cuối tuần của tuần cuối trong tháng",
      //     dayObj.endOf("month").date()
      // );
      return dayObj.endOf("month");
    }
    // console.log(`cuối tuần`, dayObj.endOf("week").date());
    return dayObj.endOf("week");
  };

  return (
    <div className={style.cal_cnt}>
      <div className={style.cal_left_cnt}>
        <div className={style.cal_left_date}>
          <DatePicker
            onChangeMonth={handleChangeParams}
            appointments={new_appointments}
            onChange={handleSetDatePicker}
          />
        </div>
        <div className={style.cal_left_status}>
          <span className={style.cal_left_status_title}>
            Trạng thái đặt hẹn
          </span>
          <ul className={style.list_status}>
            {
              STATUS_LIST.map(item => (
                <li key={item.title} className={style.status_item}>
                  <img
                    src={item.img} alt=""
                    width={18} height={18}
                  />
                  <span className={style.status_item_text}>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={style.cal_right_cnt}>
        <AppointmentWeek
          days={daysWeek}
          datePick={datePick}
          new_appointments={new_appointments}
        />
      </div>
    </div>
  );
}

interface AppointmentWeekProps {
  days: string[],
  new_appointments: NewAppointments[]
  datePick: string
}

const AppointmentWeek = (props: AppointmentWeekProps) => {
  const { days, new_appointments, datePick } = props;
  const { t } = useContext(AppContext);
  const IS_MB = useDeviceMobile();
  const weekDays = [
    { d: t("Home.Sunday"), date: days[0] },
    { d: t("Home.Monday"), date: days[1] },
    { d: t("Home.Tuesday"), date: days[2] },
    { d: t("Home.Wednesday"), date: days[3] },
    { d: t("Home.Thursday"), date: days[4] },
    { d: t("Home.Friday"), date: days[5] },
    { d: t("Home.Saturday"), date: days[6] },
  ];
  let week_apps = days.map(d => {
    return {
      day: d,
      apps: new_appointments.filter(a => a.date_start === d)
    }
  })
  let appointment_week = week_apps
  if (IS_MB) {
    appointment_week = week_apps.filter(i => i.day === datePick)
  }


  return (
    <div className={style.cal_app_week}>
      <div className={style.week_cont}>
        {
          weekDays.map((d => (
            <div
              style={d.date === datePick ? { color: "var(--purple)" } : {}}
              key={d.d} className={style.week_day_item}
            >
              <h3>{dayjs(d.date).format("D")}</h3>
              <span
                style={d.date === datePick ? { color: "var(--purple)" } : {}}
              >{d.d}</span>
            </div>
          )))
        }
      </div>
      <div className={style.week_apps_cnt}>
        {
          appointment_week.map((app => (
            <div key={app.day} className={style.week_app_item}>
              <ul className={style.week_day_list_app}>
                {
                  app.apps.map((a, index: number) => (
                    <li key={index} className={style.week_day_item_app}>
                      {
                        a.apps
                          .sort((a, b) => a.start_at - b.start_at)
                          .map((item: AppointmentTime, i: number) => (
                            <AppointmentCardItem
                              item={item}
                              key={i}
                            />
                          ))
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          )))
        }
      </div>
    </div>
  )
}
const AppointmentCardItem = ({ item }: { item: AppointmentTime }) => {
  const [open, setOpen] = useState(false)
  const [openQr, setOpenQr] = useState(false)
  return (
    <>
      <AppDetail
        app={item}
        open={open}
        setOpen={setOpen}
      />
      <div className={style.app_item}>
        <span className={style.app_item_status}>
          {item.status}
        </span>
        <div className={style.app_item_info}>
          <h3>{formatTime(item.time_start)}</h3>
          <h5>{dayjs(item.time_start).format("DD/MM/YYYY")}</h5>
        </div>
        <div className={style.app_item_detail}>
          <span className={style.app_item_time}>
            {formatTime(item.time_start)}-{formatTime(item.time_end)}
          </span>
          <span className={style.app_item_org}>
            {item.organization?.name}
          </span>
          <span className={style.app_item_address}>
            {item.branch?.full_address ?? item.organization?.full_address}
          </span>
          <div className={style.app_item_bottom}>
            <button onClick={() => setOpenQr(true)}>
              Quét mã QR
            </button>
            <button onClick={() => setOpen(true)}>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </>
  )
}