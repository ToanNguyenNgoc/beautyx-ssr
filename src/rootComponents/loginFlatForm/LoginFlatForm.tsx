import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncUser } from "../../redux/profile/userSlice";
import { FLAT_FORM_TYPE } from "../flatForm";
import {
    loginAsyncMomo,
    loginAsyncTiki,
    loginAsyncMb,
} from "../../redux/loginFlatForm/loginFlatFrom";
import { pickBy, identity } from "lodash";
import MOMO from "api/_momoImport"
import momoApi, { IUserConsentsData } from "api/momoApi";
import { useHistory } from "react-router-dom";

function LoginFlatForm(props: any) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { flatForm, params } = props;
    const TOKEN = sessionStorage.getItem("_WEB_TK");
    const onLoginFlatFormMomo = async () => {
        try {
            // alert('onLoginFlatFormMomo')
            momoApi.initApp();
            MOMO.showLoading([""]);
            MOMO.getUserConsents({
                "permissions": [
                    {
                        "role": "name",
                    },
                    {
                        "role": "phone"
                    },
                    {
                        "role": "email",
                    },
                ]
            }, async ({ data, status }: any) => {
                // alert(JSON.stringify(data)+JSON.stringify(status))
                const dataOb: IUserConsentsData = {
                    email: data?.email,
                    name: data?.name,
                    phone: data?.phone
                }
                if (dataOb.phone) {
                    await dispatch(loginAsyncMomo(dataOb))
                    await dispatch(fetchAsyncUser())
                }
                else {
                    requestUserConsents();
                }
                return { data: data }
            })
        } catch (err) {
            console.log(err);
            // alert(JSON.stringify(err));
        }
        // if (params.requestId) {
        //     history.replace(`/thanh-toan-momo/${params.requestId}`)
        // }
    };
    const requestUserConsents = () => {
        MOMO.showLoading([""]);
        MOMO.requestUserConsents(
            {
                permissions: [
                    {
                        "role": "name",
                        "require": true
                    },
                    {
                        "role": "phone",
                        "require": true
                    },
                    {
                        role: "email",
                    },
                ],
            },
            async ({ data, status }: any) => {
                if (data.phone) {
                    await dispatch(loginAsyncMomo(data));
                    await dispatch(fetchAsyncUser());
                    // if (params.requestId) {
                    //     history.replace(`/thanh-toan-momo/${params.requestId}`)
                    // }
                } else {
                    MOMO.showToast({
                        description: "có lỗi khi nhận thông tin từ momo",
                        type: "failure",
                        duration: 3000,
                    });
                    MOMO.hideLoading();
                }
                return { data: data };
            }

        );
    };
    const onLoginFlatFormMomowithParams = async () => {
        const PARAMS = {
            fullname: params?.fullname,
            email: params?.email,
            phone: params?.telephone,
        };
        await dispatch(loginAsyncMomo(PARAMS));
        await dispatch(fetchAsyncUser());
        if (params.requestId) {
            history.replace(`/thanh-toan-momo/${params.requestId}`);
        }
    };
    const onLoginFlatFormTiki = async () => {
        const PARAMS_OB = {
            customerId: params?.customerId,
            avatar: params?.avatar,
            email: params?.email,
            name: params?.name,
            phone: params?.telephone,
            authCode: params?.authCode,
        };
        const PARAMS = pickBy(PARAMS_OB, identity);
        await dispatch(loginAsyncTiki(PARAMS));
        await dispatch(fetchAsyncUser());
    };
    const onLoginFlatFormMB = async () => {
        try {
            // const $:any = window;
            // $["ReactNativeWebView"].postMessage(JSON.stringify({
            //     type: "GET_CONTACT",
            //   }));

            await dispatch(
                loginAsyncMb({
                    token: params.loginToken,
                })
            );
            await dispatch(fetchAsyncUser());
        } catch (err) {
            console.warn(err);
        }
    };
    const handleLoginFlatform = () => {
        if (params || flatForm === FLAT_FORM_TYPE.MOMO) {
            switch (flatForm) {
                case FLAT_FORM_TYPE.MOMO:
                    //[TEMPLE]: login with params URL
                    if (params) {
                        onLoginFlatFormMomowithParams();
                    } else {
                        onLoginFlatFormMomo();
                    }
                    break;
                case FLAT_FORM_TYPE.TIKI:
                    onLoginFlatFormTiki();
                    break;
                case FLAT_FORM_TYPE.MB:
                    onLoginFlatFormMB();
                    break;
                default:
                    break;
            }
        }
    };
    useEffect(() => {
        if (!TOKEN) {
            handleLoginFlatform();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div></div>;
}

export default LoginFlatForm;
