import React from "react";
import DatePicker from "../../../components/DatePicker/index";
import TimePicker from "../../../components/TimePicker";
import { Dialog } from "@mui/material";
import HeadMobile from "../../HeadMobile";
import { Transition } from "../../../utils/transition";
import { useDeviceMobile } from "hooks";

function BookingTime(props: any) {
    const { open, setOpen, bookTime, setBookTime, org } = props;
    const IS_MB = useDeviceMobile();
    const onChangeDatePicker = (e: any) => {
        setBookTime({ ...bookTime, date: e });
    };
    const onChangeTimePicker = (time: string) => {
        setBookTime({ ...bookTime, time: time });
    };
    return (
        <Dialog
            fullScreen={IS_MB ? true : false}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <div className="flex-column book-time-cnt">
                {IS_MB && (
                    <HeadMobile onBack={setOpen} title="Chọn thời gian" />
                )}
                <div className="flex-row-sp book-time-cnt__wrap">
                    <div className="book-time__date">
                        <DatePicker onChange={(e) => onChangeDatePicker(e)} />
                    </div>
                    <div className="book-time__time">
                        <TimePicker
                            bookTime={bookTime}
                            org={org}
                            onChange={(e) => onChangeTimePicker(e)}
                        />
                    </div>
                </div>
                {bookTime.date && bookTime.time && (
                    <button
                        onClick={() => setOpen(false)}
                        className="book-time__btn"
                    >
                        Xác nhận thời gian
                    </button>
                )}
            </div>
        </Dialog>
    );
}

export default BookingTime;
