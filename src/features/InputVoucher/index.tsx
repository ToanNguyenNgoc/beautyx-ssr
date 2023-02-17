import { Dialog } from "@mui/material";
import discountApi from "api/discountApi";
import { VoucherItem, XButton } from "components/Layout";
import icon from "constants/icon";
import { AppContext } from "context/AppProvider";
import { useDeviceMobile, useNoti } from "hooks";
import { IDiscountPar, IOrganization } from "interface";
import IStore from "interface/IStore";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import style from './ip-vc.module.css'

interface InputVoucherProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    organization: IOrganization, //organization applied voucher
    services_id: number[], 
    products_id: number[],
    cartAmount: number
    outDiscounts: IDiscountPar[]
}

export const InputVoucher = (props: InputVoucherProps) => {
    const {t} = useContext(AppContext)
    const IS_MB = useDeviceMobile();
    const { open, setOpen, organization, cartAmount, services_id, products_id, outDiscounts } = props;
    const { VOUCHER_APPLY } = useSelector((state: IStore) => state.carts)
    const [text, setText] = useState("");
    const [response, setResponse] = useState<IDiscountPar | any>()
    const { firstLoad, resultLoad, noti } = useNoti()
    const onInputChange = (e: any) => {
        if (text.length <= 25) {
            setText(e.target.value.toUpperCase())
            resultLoad('')
            setResponse(null)
        }
    }
    const getDiscountDetail = async () => {
        if (text !== "") {
            firstLoad()
            try {
                const res = await discountApi.getById({ id: text })
                setResponse(res.data.context)
                resultLoad('')
            } catch (error) {
                console.log(error)
                resultLoad(`Mã giảm giá ${text} không hợp lệ ! Bạn vui lòng kiểm tra lại mã nhé`)
            }
        }
    }
    const voucher: IDiscountPar = { ...response, coupon_code: text }

    let voucher_org: any
    if (text !== "" && response?.organizations?.length > 0) voucher_org = response?.organizations[0]

    return (
        <Dialog
            fullScreen={IS_MB}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={style.vc_container}>
                <div className={style.vc_header}>
                    <span className={style.vc_header_title}>
                        Beautyx {t('pm.promotion')}
                    </span>
                    {
                        IS_MB &&
                        <XButton
                            icon={icon.closeBlack}
                            onClick={() => setOpen(false)}
                            className={style.vc_header_btn}
                        />
                    }
                </div>
                <div className={style.vc_body}>
                    <div className={style.vc_body_input}>
                        <input
                            autoFocus={true}
                            value={text} onChange={onInputChange} type="text"
                        />
                        <XButton
                            style={text === "" ? {
                                backgroundColor: "var(--bg-color)",
                                cursor: "no-drop"
                            } : {}}
                            className={style.vc_body_input_btn}
                            title={t('contact_form.confirm')}
                            loading={noti.load}
                            onClick={getDiscountDetail}
                        />
                    </div>
                    {
                        noti.message !== '' &&
                        <div className={style.vc_cart_none}>
                            {noti.message}
                        </div>
                    }
                    <ul className={style.vc_cart_voucher_list}>
                        {
                            (outDiscounts?.length > 0 && organization) &&
                            outDiscounts?.map((item: IDiscountPar, index: number) => {
                                let discount_value = item?.discount_value
                                if (item?.discount_type === 'FINAL_PRICE') {
                                    discount_value = item.items[0]?.productable?.price - item?.discount_value
                                }
                                const voucher = { ...item, discount_value }
                                return (
                                    <li className={style.voucher_list_item} key={index} >
                                        <VoucherItem
                                            outDiscounts={outDiscounts}
                                            voucher={voucher}
                                            org={organization}
                                            showApplyBtn={true}
                                            totalAmount={cartAmount}
                                            services_id={services_id}
                                            products_id={products_id}
                                            VOUCHER_APPLY={VOUCHER_APPLY}
                                            activated
                                        />
                                    </li>
                                )
                            })
                        }
                        {
                            voucher_org &&
                            <span className={style.vc_cart_voucher_org}>
                                Áp dụng khi thanh toán cho cửa hàng <span>{voucher_org.name}</span>
                            </span>
                        }
                        {
                            organization && response && text !== "" &&
                            <li className={style.voucher_list_item} >
                                <VoucherItem
                                    outDiscounts={outDiscounts}
                                    voucher={voucher}
                                    org={organization}
                                    showApplyBtn={true}
                                    totalAmount={cartAmount}
                                    services_id={services_id}
                                    products_id={products_id}
                                    VOUCHER_APPLY={VOUCHER_APPLY}
                                />
                            </li>
                        }
                    </ul>
                    <div className={style.vc_bot}>
                        <XButton
                            onClick={() => setOpen(false)}
                            title="Đồng ý"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}