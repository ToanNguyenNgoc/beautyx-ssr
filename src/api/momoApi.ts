// // Case 1: User accept sharing some data
// {
//     "data": {
//         "name": "John Doe",
//         "phone": "09xxxxxxxx"
//     },
//     "status": {
//         "email": "denied",
//         "name": "granted",
//         "phone": "granted"
//     }
// }

import momoAuthApi from "./_momoAuthApi";
import MOMO from "./_momoImport";

// // Case 2: User cancelled sharing data
// {
//     "data" : {}
//     "status" : "cancelled"
// }

// // Case 3: AppId doesn’t have permission to request sharing data / Wrong appId. Go to developers.momoapp.vn to request permission
// {
//     "data" : {},
//     "status" : {}
// }

// import momoAuthApi from "./_momoAuthApi";
// import { MOMO } from "./_momoImport";

type IToastType = "success" | "failure";
export interface IUserConsentsData {
    // >>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
    phone?: string;
    name?: string;
    email?: string;
}
export interface IUserConsentsStatus {
    email: "denied";
    name: "granted";
    phone: "granted";
}
export interface IUserConsents {
    data: IUserConsentsData | {};
    status: IUserConsentsStatus | "cancelled" | {};
}
// end
class MOMO_API {
    initApp = () => {
        MOMO.init({
            appId: process.env.REACT_APP_MOMO_APP_ID,
            parnerCode: process.env.REACT_APP_MOMO_PARTNER_CODE,
        });
    };
    requestUserConsents = () => {
        MOMO.showLoading([""]);
        MOMO.requestUserConsents(
            {
                permissions: [
                    {
                        role: "name",
                        require: true,
                    },
                    {
                        role: "phone",
                        require: true,
                    },
                    {
                        role: "email",
                    },
                ],
            },
            async ({ data, status }: any) => {
                // alert(JSON.stringify(data))
                if (data.email && data.phone) {
                    // alert('in')
                    const res = await momoAuthApi.login(data);
                    // alert('res'+JSON.stringify(res))
                } else {
                    MOMO.showToast({
                        description: "có lỗi khi nhận thông tin từ momo",
                        type: "failure",
                        duration: 2000,
                    });
                    MOMO.hideLoading();
                }
                return { data: data };
            }
        );
    };
    getUserConsents = async () => {
        MOMO.showLoading([""]);
        const res = await MOMO.getUserConsents(
            {
                permissions: [
                    {
                        role: "name",
                    },
                    {
                        role: "phone",
                    },
                    {
                        role: "email",
                    },
                ],
            },
            async ({ data, status }: any) => {
                const dataOb: IUserConsentsData = {
                    email: data?.email,
                    name: data?.name,
                    phone: data?.phone,
                };
                // alert(JSON.stringify(dataOb))
                if (dataOb.email && dataOb.phone) {
                    const res = await momoAuthApi.login(data);
                    // alert('res'+JSON.stringify(res))
                    window.sessionStorage.setItem(
                        "_WEB_TK",
                        res.data.context.token
                    );
                } else {
                    this.requestUserConsents();
                    MOMO.showToast({
                        description: "có lỗi khi nhận thông tin từ momo",
                        type: "failure",
                        duration: 2000,
                    });
                    MOMO.hideLoading();
                }
                return { data: data };
            }
        );
        return res;
    };
    getLocation = () => {
        MOMO.getLocation((data: any) => {
            // alert(JSON.stringify([data]))
            return { data: data };
        });
    };
    showToast = (description: string, type: IToastType) => {
        MOMO.showToast({
            description: description,
            type: type,
            duration: 2000,
        });
    };
}
export const momoApi = new MOMO_API();
// export const momo = MOMO;
export default momoApi;
