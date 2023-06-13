import { callApiFromTiki } from "../rootComponents/tiki/doPostMessageTiki";
import { openUrlIn_Mb } from "../rootComponents/mb/doPostMessageMBbank";
import openUrlIn_Tiki from "../rootComponents/tiki/test";
import { MOMO } from "../api/_momoImport";
import { PLF_TYPE } from "constants/plat-form";
import { phoneSupport } from "constants/index";
// export const handleSubiz = () => {
//     let $: any = window;
//     let su_widget = document.querySelector(
//         "#cprhliqipldavybercftg .widget-container.widget-container--right"
//     );
//     !su_widget &&
//         (su_widget = document.getElementById("cprhliqipldavybercftg"));
//     // eslint-disable-next-line no-undef
//     su_widget?.classList.add("myspa_subiz_widget");
//     // eslint-disable-next-line no-undef
//     $.subiz("expandWidget");
//     // eslint-disable-next-line no-undef
//     $.subiz("checkPushNotification", function (status: any) {
//         console.log(status);
//     });
// };
export const handleChat = () => {
    const FLAT_FORM = sessionStorage.getItem("FLAT_FORM");
    const deepLinkMessenger = "https://m.me/beautyxdatlichlamdep/";
    switch (FLAT_FORM) {
        case PLF_TYPE.TIKI:
            // callApiFromTiki("openNativeAppStore", {
            //     googlePlayId: "com.facebook.orca",
            //     appleStoreId: "454638411",
            // });
            // handleSubiz();
            openUrlIn_Tiki(deepLinkMessenger);
            // window.open(deepLinkMessenger, "_blank");
            break;
        case PLF_TYPE.MOMO:
            MOMO.openURL(deepLinkMessenger);
            // alert(deepLinkMessenger)
            break;
        case PLF_TYPE.MB:
            const $: any = window;
            $["ReactNativeWebView"].postMessage(
                JSON.stringify({
                    type: "OPEN_BROWSER",
                    link: deepLinkMessenger,
                })
            );
            openUrlIn_Mb("messenger", deepLinkMessenger);
            window.open(deepLinkMessenger, "_blank");
            // handleSubiz();
            break;
        default:
            window.open(deepLinkMessenger, "_blank");
            break;
    }
};
export const handleCallingPhone = () => {
    const FLAT_FORM = sessionStorage.getItem("FLAT_FORM");
    const phoneNumber = `tel:${phoneSupport}`;
    switch (FLAT_FORM) {
        case PLF_TYPE.TIKI:
            // callApiFromTiki("openNativeAppStore", {
            //     googlePlayId: "com.facebook.orca",
            //     appleStoreId: "454638411",
            // });
            callApiFromTiki('makePhoneCall', {
                number: phoneSupport
            })
            window.open(phoneNumber, "_blank");
            break;
        case PLF_TYPE.MOMO:
            MOMO.openURL(phoneNumber);
            // alert(phoneNumber)
            break;
        case PLF_TYPE.MB:
            openUrlIn_Mb("messenger", phoneNumber);
            const $: any = window;
            $["ReactNativeWebView"].postMessage(
                JSON.stringify({
                    type: "TEL",
                    data: {
                        tel: phoneNumber,
                    },
                })
            );
            break;
        default:
            window.open(phoneNumber, "_blank");
            break;
    }
};