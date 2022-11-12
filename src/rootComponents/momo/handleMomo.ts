import { IUserConsentsData } from "../../api/momoApi";
import momoAuthApi from "../../api/_momoAuthApi";
import { MOMO } from "../../api/_momoImport";
import momoApi from "../../api/momoApi";

export const handleGetUserInfoMomo = (props?: any) => {
    const { fetchAsyncUserAndinitApp, setLoad } = props;
    getUserConsents(fetchAsyncUserAndinitApp, setLoad);
};
export const getUserConsents = async (callBack?: any, loading?: any) => {
    try {
        // alert('getUserConsents')

        momoApi.getLocation();
        momoApi.showToast("truy cập momo", "success");
        MOMO.showLoading([""]);

        MOMO.getUserConsents({
            "permissions": [
                {
                    "role": "name"
                },
                {
                    "role": "phone"
                },
                {
                    "role": "email"
                },
            ]
        }, async ({ data, status }: any) => {
            // alert(JSON.stringify(data)+JSON.stringify(status));
            const dataOb: IUserConsentsData = {
                email: data?.email,
                name: data?.name,
                phone: data?.phone
            }
            if (dataOb.phone) {
                const res = await momoAuthApi.login(dataOb)
                window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
                callBack&&callBack()
            }
            else {
                requestUserConsents(callBack,loading);
            }
            return { data: data }
        })
    } catch (err) {
        // alert(JSON.stringify(err));
        loading && loading(false);
    }
};
export const requestUserConsents = (callBack?: any, loading?: any) => {
    // alert('requestUserConsents')
    MOMO.showLoading([""]);
    MOMO.requestUserConsents({
        "permissions": [
            {
                "role": "name",
                "require": true
            },
            {
                "role": "phone",
                "require": true
            },
            {
                "role": "email",
            }
        ]
    }, async ({ data, status }: any) => {
        // alert(JSON.stringify(data)+JSON.stringify(status));
        if (data.phone) {
            const res = await momoAuthApi.login(data)
            // alert('res' + JSON.stringify(res))
            let status = res.data.status;
            let context = res.data.context;
            if(status === 200 && context && context.token){
                window.sessionStorage.setItem("_WEB_TK", context.token)
                callBack&&callBack();
            }
        }
        else {
            MOMO.showToast({
                description: "có lỗi khi nhận thông tin từ momo",
                type: "failure",
                duration: 2000
            });
            loading&&loading(false)
            MOMO.hideLoading()
        }
        return { data: data }
    })
};
