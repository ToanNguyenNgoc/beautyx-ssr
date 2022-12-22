import dayjs from "dayjs"
import { AppointmentNoti } from "interface/appointment"
import IStore from "interface/IStore"
import { paramAppointment } from "params-query"
import { useSelector } from "react-redux"
import { useSwr } from "./useSwr"

export function useAppointment(time_start?: string) {
    const { USER } = useSelector((state: IStore) => state.USER)
    const appointment = useSwr("/appointments", USER, {
        ...paramAppointment,
        "filter[time_start]": time_start ? time_start : dayjs().format("YYYY-MM"),
    }).responseArray ?? []

    const appointment_today = appointment?.filter(
        (a: AppointmentNoti) =>
            dayjs(a.time_start).format("YYYY-MM-DD") ===
            dayjs().format("YYYY-MM-DD")
    );

    return { appointment, appointment_today }
}