/* eslint-disable no-useless-escape */
//2021-12-24 08:43:39
import dayjs from "dayjs";
import locale from "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";

export const formatDateFromNow = (date: string) => {
    dayjs.extend(relativeTime);
    return dayjs(date).locale(locale.name).fromNow();
};
export const formatDateRevArr = (dateParams: any) => {
    const dateArr = dateParams?.split(" ");
    const date = dateArr[0]?.split("-");
    return date;
};

export const formatHourRevArr = (dateParams: any) => {
    const dateArr = dateParams?.split(" ");
    const date = dateArr[1]?.split(":");
    return date;
};

export const checkTimeExpired = (time_expired: any) => {
    let dateExpired = false;
    if (!time_expired || time_expired?.slice(0, 5) < 0)
        return (dateExpired = false);
    const now = dayjs().format("YYYY/MM/DD");
    const dateExNum = `${time_expired?.slice(0, 4)}${time_expired?.slice(
        5,
        7
    )}${time_expired?.slice(8, 10)}`;
    const nowNum = `${now.slice(0, 4)}${now.slice(5, 7)}${now.slice(8, 10)}`;
    if (dateExNum < nowNum) {
        dateExpired = true;
    }
    return dateExpired;
};
export const formatTime = (dateParams: any) => {
    const time = dayjs(dateParams).format("HH:mm");
    return time;
};

export const formatDistance = (distance?: number) => {
    let dis: string = "";
    if (distance) {
        dis =
            distance < 1000
                ? `${Math.round(distance)} m`
                : `${Math.round(distance / 1000)} km`;
    }
    return dis;
};
export const formatDistanceKM = (distance?: number) => {
    let dis: string = "";
    if (distance) {
        dis = `${Math.floor(distance * 10) / 10} km`;
    }
    return dis;
};
export const uniqueArr = (arr: any) => {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};
export const formatRoundOrgCount = (count: number) => {
    let countRound = "";
    if (count <= 5) {
        countRound = "5+";
    } else if (count > 5 && count <= 10) {
        countRound = "10+";
    } else if (count > 10 && count <= 100) {
        countRound = `${Math.ceil(count / 10) * 10}+`;
    } else if (count > 100 && count <= 1000) {
        countRound = `${Math.ceil(count / 100) * 100}+`;
    }
    return countRound;
};
export const fakeOrgStar = (count: number) => {
    let star;
    if (count >= 0 && count < 10) {
        star = `4.${count}`;
    } else if (count >= 10) {
        star = "5";
    }
    return star;
};
export const formatTelephone = (telephone: string) => {
    // const phone = `${telephone}`.slice(-9);
    console.log("phone", "+84" + telephone.toString().slice(1));
    return "+84" + telephone.toString().slice(1);
    // return `+84${phone}`
};
export const formatPhoneNumber = (phoneNumberString: string) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    let phone = "";
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = match[1] ? "+1 " : "";
        phone = [intlCode, "", match[2], " ", match[3], " ", match[4]].join("");
    }
    return phone;
};
export const linkify = (text: string) => {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
        return '<a class="linkify-chat" target="blank" href="' + url + '">' + url + "</a>";
    });
}
export const checkHTML = (text: string) => {
    var elem = document.createElement('div')
    elem.innerHTML = text;
    return !!elem.childElementCount;
}
const now = new Date();
const today = now.getDay() + 1;
export interface IOrgTimeWork {
    day_week: string,
    status: string,
    from_time_opening: string,
    to_time_opening: string,
    todayAct: boolean
}
export const formatOrgTimeWork = (time_arr: any) => {
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
    const orgTimeToday = orgTimes?.find(i => i.todayAct)
    return {orgTimes, orgTimeToday}
}