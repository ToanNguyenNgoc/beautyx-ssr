import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncUser } from "../../redux/USER/userSlice";
import { FLAT_FORM_TYPE } from "../flatForm";
import {
    loginAsyncMomo,
    loginAsyncTiki,
    loginAsyncMb,
} from "../../redux/loginFlatForm/loginFlatFrom";
import { pickBy, identity } from "lodash";
import MOMO from '../../api/_momoImport';
import { IUserConsentsData } from "../../api/momoApi";
// import momoAuthApi from '../../api/_momoAuthApi';
// import { AnyAaaaRecord } from 'dns';

function LoginFlatForm(props: any) {
    const dispatch = useDispatch();
    const { flatForm, params } = props;
    const TOKEN = sessionStorage.getItem("_WEB_TK");
    const onLoginFlatFormMomo = async () => {
        try {
            alert('onLoginFlatFormMomo')
            
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
                alert(JSON.stringify(data)+JSON.stringify(status))
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
            alert(JSON.stringify(err));
        }
    };
    const requestUserConsents = () => {
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
                    },
                    {
                        role: "email",
                    },
                ],
            },
            async ({ data, status }: any) => {
                alert(JSON.stringify(data)+JSON.stringify(status))
                if (data.phone) {
                    await dispatch(loginAsyncMomo(data));
                    await dispatch(fetchAsyncUser());
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
                    onLoginFlatFormMomo();
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
