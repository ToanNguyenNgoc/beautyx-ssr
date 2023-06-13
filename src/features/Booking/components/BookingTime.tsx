import React, { useContext } from "react";
import { Dialog } from "@mui/material";
import { useDeviceMobile } from "hooks";
import style from '../booking.module.css'
import { DatePicker, XButton } from "components/Layout";
import { Transition } from "utils";
import HeadMobile from "features/HeadMobile";
import TimePicker from "components/TimePicker";
// import DatePicker from "components/DatePicker";
import { AppContext } from "context/AppProvider";

function BookingTime(props: any) {
    const { t } = useContext(AppContext) as any
    const { open, setOpen, bookTime, setBookTime, org } = props;
    const IS_MB = useDeviceMobile();
    const onChangeDatePicker = (e: any) => {
        setBookTime({ ...bookTime, date: e, time: null });
    };
    const onChangeTimePicker = (time: string) => {
        setBookTime({ ...bookTime, time: time });
    };
    return (
        <Dialog
            fullScreen={IS_MB}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            {IS_MB && (
                <HeadMobile onBack={setOpen} title={t('my_ser.time_select')} />
            )}
            <div className={style.book_time_cnt}>
                <div className={style.book_time_top}>
                    <div className={style.book_time_top_left}>
                        <DatePicker disablePrev onChange={(e) => onChangeDatePicker(e)} />
                    </div>
                    <div className={style.book_time_top_right}>
                        <TimePicker
                            bookTime={bookTime}
                            org={org}
                            onChange={(e) => onChangeTimePicker(e)}
                            disablePrev
                        />
                    </div>
                </div>
                <div className={style.book_time_bot}>
                    <XButton
                        className={style.book_time_bot_btn}
                        title={t('my_ser.confirm_time')}
                        onClick={() => setOpen(false)}
                        style={
                            (bookTime.date && bookTime.time) ? {opacity:1}:{opacity:0.4}
                        }
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default BookingTime;
