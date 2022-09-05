//2021-12-24 08:43:39
import dayjs from "dayjs";

export const formatDate = (dateParams: any) => {
    const dateArr = dateParams?.split(' ');
    const date = dateArr[0]?.split('-')?.reverse().join('/')
    return date
}
export const formatDateRevArr = (dateParams: any) => {
    const dateArr = dateParams?.split(' ');
    const date = dateArr[0]?.split('-')
    return date
}

export const formatHourRevArr = (dateParams: any) => {
    const dateArr = dateParams?.split(' ');
    const date = dateArr[1]?.split(':')
    return date
}

export const checkTimeExpired = (time_expired: any) => {
    let dateExpired = false
    if (!time_expired || time_expired?.slice(0, 5) < 0) return dateExpired = false
    const now = dayjs().format('YYYY/MM/DD')
    const dateExNum = `${time_expired?.slice(0, 4)}${time_expired?.slice(5, 7)}${time_expired?.slice(8, 10)}`
    const nowNum = `${now.slice(0, 4)}${now.slice(5, 7)}${now.slice(8, 10)}`
    if (dateExNum < nowNum) {
        dateExpired = true
    }
    return dateExpired
}
export const formatTime = (dateParams: any) => {
    const dateArr = dateParams?.split(' ');
    const time = dateArr[1]?.slice(0, 5);
    return time
}

export const formatDistance = (distance?: number) => {
    let dis: string = '';
    if (distance) {
        dis = distance < 1000 ? `${Math.round(distance)} m` : `${Math.round(distance / 1000)} km`;
    }
    return dis;
}
export const uniqueArr = (arr: any) => {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
export const formatRoundOrgCount = (count: number) => {
    let countRound = ""
    if (count <= 5) {
        countRound = "5+"
    } else if (count > 5 && count <= 10) {
        countRound = "10+"
    } else if (count > 10 && count <= 100) {
        countRound = `${Math.ceil(count / 10) * 10}+`
    } else if (count > 100 && count <= 1000) {
        countRound = `${Math.ceil(count / 100) * 100}+`
    }
    return countRound
}
export const fakeOrgStar = (count: number) => {
    let star;
    if (count >= 0 && count <10) {
        star = `4.${count}`
    } else if (count >= 10) {
        star = '5'
    }
    return star
}