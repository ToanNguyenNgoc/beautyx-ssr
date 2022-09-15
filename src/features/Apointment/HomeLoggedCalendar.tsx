/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import SectionTitle from "../SectionTitle/index";
import dayjs from "dayjs";
import HomeLoggedCalendarComponent from "./HomeLoggedCalendarComponent";
import HomeLoggedCalendarChooseMonth from "./HomeLoggedCalendarChooseMonth";
import HomeLoggedCalendarStatus from "./HomeLoggedCalendarStatus";
import HomeLoggedCalendarList from "./HomeLoggedCalendarList";
import { Container } from "@mui/material";
import { AppContext } from "../../context/AppProvider";
import { cleanup } from "@testing-library/react";
import { fetchAsyncApps } from "../../redux/appointment/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from '../../redux/status';
import ModalLoad from "../../components/ModalLoad";
import '../../assets/styles/main.css'

const todayObj = dayjs();
export default function HomeLoggedCalendar() {
  const [datingList, setdatingList] = useState([]);
  const [dotAppoint, setdotAppoint] = useState([]);
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state: any) => state.APP.APPS);
  //const { dayObj } = useSelector((state: any) => state.APP);
  const { t, dayObj, setDayObj } = useContext(AppContext);
  const weekDays = [
    t("Home.su"),
    t("Home.mo"),
    t("Home.tu"),
    t("Home.we"),
    t("Home.th"),
    t("Home.fr"),
    t("Home.sa"),
  ];

  // dayjs(year-mouth-day) -> tạo ra 1 ngày (format of dayjs)
  // lấy time hiện tại (year-mouth-day,...)
  //const dayObj = dayjs();
  let thisYear = dayObj.year();
  // (tháng 1 -> [0], tháng 12 -> [11])
  let thisMonth = dayObj.month();
  // lấy số ngày trong tháng hiện tại (VD: T1: 31days T2: 28days)
  let daysInMonth = dayObj.daysInMonth();
  // lấy ngày đầu tiên của tháng hiện tại (format of dayjs)
  let dayObjOfFirstMonth = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  // lấy thứ của ngày đầu tiên của tháng (Sunday -> 0, Saturday -> 6)
  let weekDayOfFirst = dayObjOfFirstMonth.day();
  // lấy ngày cuối cùng của tháng hiện tại
  let dayObjOfLastMonth = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  // lấy thứ của ngày cuối cùng của tháng
  let weekDayOfLast = dayObjOfLastMonth.day();


  const callAppointments = () => {
    if (status !== STATUS.SUCCESS) {
      const time = dayjs().format("YYYY-MM")
      dispatch(fetchAsyncApps(time))
    }
  }

  useEffect(() => {
    callAppointments();
    return () => {
      cleanup();
    };
  }, []);

  const dataAppoint: any = [];
  for (var item of appointments) {
    const dateTimeStartString = item.time_start.split(" ");
    const dateTimeEndString = item.time_end.split(" ");
    const date = dateTimeStartString[0].split("-").reverse().join("/");
    const timeStart = dateTimeStartString[1].slice(0, 5);
    const timeEnd = dateTimeEndString[1].slice(0, 5);

    const app = {
      ...item,
      id: item.id,
      date: date,
      org_id: item.organization_id,
      branch_id: item.branch_id,
      status: item.status,
      note: item.note,
      time_start: timeStart,
      time_end: timeEnd,
    };
    dataAppoint.push(app);
  }
  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"));
    const time = dayObj.subtract(1, "month").format("YYYY-MM");
    dispatch(fetchAsyncApps(time))
  };
  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
    const time = dayObj.add(1, "month").format("YYYY-MM");
    dispatch(fetchAsyncApps(time))
  };
  // hander pick active calendar
  const [datepick, setdatepick] = useState({
    date: todayObj.date(),
    month: todayObj.month(),
    year: todayObj.year(),
  });

  function handleGetDate(date: any, thisMonth: any, thisYear: any) {
    setdatepick({
      date: date + 1,
      month: thisMonth,
      year: thisYear,
    });
    handleAppoint(date, thisMonth, thisYear, false);
  }

  console.log(datepick)

  // hander Appoint
  function handleAppoint(
    date: any,
    thisMonth: any,
    thisYear: any,
    istoday: boolean
  ) {
    let newdate = date;
    if (!istoday) {
      newdate = date + 1;
    }
    let newmonth = thisMonth + 1;

    // const firstDateOfWeek = selectedDay.startOf("week").date();
    // const lastDateOfWeek = selectedDay.endOf("week").date();
    // const datesInSameWeek = (parts: any) => {
    //   if (firstDateOfWeek < lastDateOfWeek) {
    //     // giua thang
    //     return (
    //       newdate > firstDateOfWeek &&
    //       newdate < lastDateOfWeek &&
    //       newmonth == parts[1] &&
    //       thisYear == parts[2]
    //     );
    //   } else {
    //     // dau thang
    //     return (
    //       ((newdate < firstDateOfWeek && newdate < lastDateOfWeek) ||
    //         (newdate > firstDateOfWeek && newdate > lastDateOfWeek)) &&
    //       newmonth == parts[1] + 1 &&
    //       thisYear == parts[2]
    //     );
    //   }
    // };
    const dateList: any = dataAppoint.filter((data: any) => {
      var parts = data.date.split("/");
      // return datesInSameWeek(parts);
      return (
        // eslint-disable-next-line eqeqeq
        newdate == parts[0] && newmonth == parts[1] && thisYear == parts[2]
      );
    });
    setdatingList(dateList);

  }

  // hiển thị status ở calendar dựa api
  async function handleAppointDot() {
    let appointList: any = [];
    await dataAppoint.map((date: any) => {
      let objIndex = appointList.findIndex((obj: any) => {
        // eslint-disable-next-line eqeqeq
        if (obj.date == date.date && obj.status == date.status) {
          return true;
        }
        return false;
      });
      if (objIndex !== -1) {
        appointList[objIndex] = {
          ...appointList[objIndex],
          count: appointList[objIndex].count + 1,
          status: appointList[objIndex].status,
        };
      } else
        appointList.push({ date: date.date, count: 1, status: date.status });
    });
    setdotAppoint(appointList);
  }
  // lấy ngày tháng năm hiện tại
  const selectedDay = dayjs(
    `${datepick.year}-${datepick.month + 1}-${datepick.date}`
  );
  console.log(selectedDay, datepick)

  // lấy ngày đầu tiên trong tuần
  const getFirstDayOfW = (selectedDay: any) => {
    // console.log(selectedDay)
    // T2 -> [0] , CN -> [6]
    // console.log(`(T2 -> 0, CN -> 6) `, selectedDay);
    if (selectedDay.startOf("week").month() !== selectedDay.month()) {
      console.log(
        "đầu tuần của tuần đầu trong tháng",
        selectedDay.startOf("month").startOf("week").date()
      );
      return selectedDay.startOf("month");
    }
    console.log(`đầu tuần`, selectedDay.startOf("week").date());
    return selectedDay.startOf("week");
  };

  // lấy ngày cuối cùng trong tuần
  const getLastDayOfW = (selectedDay: any) => {
    if (selectedDay.day() === 6) {
      // console.log("click ngày cuối tuần", selectedDay.endOf("week").date());
      return selectedDay;
    }
    if (
      selectedDay.endOf("week").add(1, "day").month() !== selectedDay.month()
    ) {
      // console.log(
      //   "cuối tuần của tuần cuối trong tháng",
      //   selectedDay.endOf("month").date()
      // );
      return selectedDay.endOf("month");
    }
    // console.log(`cuối tuần`, selectedDay.endOf("week").date());
    return selectedDay.endOf("week");
  };

  const getDaysInWeek = (selectedDay: any) => {
    const days: any = [];
    [1, 2, 3, 4, 5, 6, 7].map((i, index) =>
      days.push(selectedDay.day(index).date())
    );
    return days;
  };

  useEffect(() => {
    if (dataAppoint[0]?.id) {
      let today = todayObj.date();
      handleAppoint(today, thisMonth, thisYear, true);
      handleAppointDot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments]);
  return (
    <div className="homelogged-calendar">
      {
        status !== STATUS.SUCCESS && <ModalLoad />
      }
      <Container>
        <div className="homelogged-calendar__content">
          <SectionTitle title={t("Home.my_appointment")} textAlign="left" />
          <div className="homelogged-calendar__wrap">
            <div className="homelogged-calendar__left">
              <div className="calendar-choosedate">
                <HomeLoggedCalendarChooseMonth
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  dayObj={dayObj}
                  Class={""}
                />
                <HomeLoggedCalendarComponent
                  weekDays={weekDays}
                  weekDayOfFirst={weekDayOfFirst}
                  weekDayOfLast={weekDayOfLast}
                  thisYear={thisYear}
                  thisMonth={thisMonth}
                  daysInMonth={daysInMonth}
                  dayObjOfFirstMonth={dayObjOfFirstMonth}
                  dayObjOfLastMonth={dayObjOfLastMonth}
                  dotAppoint={dotAppoint}
                  handleAppoint={handleAppoint}
                  datepick={datepick}
                  handleGetDate={handleGetDate}
                />
              </div>
              <HomeLoggedCalendarStatus />
            </div>
            {

            }
            <HomeLoggedCalendarList
              weekDays={weekDays}
              weekDayOfFirst={weekDayOfFirst}
              weekDayOfLast={weekDayOfLast}
              thisYear={thisYear}
              thisMonth={thisMonth}
              daysInMonth={daysInMonth}
              dayObjOfFirstMonth={getFirstDayOfW(selectedDay)}
              dayObjOfLastMonth={getLastDayOfW(selectedDay)}
              datepick={datepick}
              handleGetDate={handleGetDate}
              datingList={datingList}
              daysInWeek={getDaysInWeek(selectedDay)}
              dotAppoint={dotAppoint}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
