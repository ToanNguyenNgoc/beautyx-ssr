const now = new Date();
const today = now.getDay() + 1;
export interface IOrgTimeWork {
    day_week: string,
    status: string,
    from_time_opening: string,
    to_time_opening: string,
    todayAct: boolean
}
export const extraOrgTimeWork = (time_arr: any) => {
    let orgTimes: IOrgTimeWork[] = [];
    orgTimes = time_arr?.map((item: any, index: number) => {
        return {
            day_week: index + 2 === 8 ? 'Chủ nhật' : `Thứ ${index + 2}`,
            status: item?.time_opening,
            from_time_opening: item?.time_opening === "on" ? item?.from_time_opening : "-",
            to_time_opening: item?.time_opening === "on" ? item?.to_time_opening : "-",
            todayAct: index + 2 === today ?? false
        }
    })
    return orgTimes
}