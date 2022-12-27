import { Dialog } from "@mui/material";
import discountApi from "api/discountApi";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import { useDeviceMobile, useNoti } from "hooks";
import { IDiscountPar, IOrganization } from "interface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onClearApplyVoucher } from "redux/cart";
import { OpenVcProp } from "./CartBottom";
import { VoucherOrgItem } from "./CartGroupItem";
import OutDiscountItem from "./OutDiscountItem";

interface InputVoucherProps {
    open: OpenVcProp,
    setOpen: (open: OpenVcProp) => void,
    cart_confirm: any,
    organization?: IOrganization,
    services_id: number[],
    products_id: number[],
    cartAmount: number
    outDiscounts: IDiscountPar[]
}

export const CartInputVoucher = (props: InputVoucherProps) => {
    const dispatch = useDispatch();
    const IS_MB = useDeviceMobile();
    const { open, setOpen, cart_confirm, organization, cartAmount, services_id, products_id, outDiscounts } = props;
    // const { VOUCHER_APPLY } = useSelector((state: IStore) => state.carts)
    const [text, setText] = useState("");
    const [response, setResponse] = useState<IDiscountPar | any>()
    const { firstLoad, resultLoad, noti } = useNoti()
    const onInputChange = (e: any) => {
        if (text.length <= 25) {
            setText(e.target.value)
            resultLoad('')
            setResponse(null)
        }
    }
    const getDiscountDetail = async () => {
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
    const voucher: IDiscountPar = { ...response, coupon_code: text }

    let voucher_org: any
    if (text !== "" && response?.organizations?.length > 0) voucher_org = response?.organizations[0]

    return (
        <Dialog
            fullScreen={IS_MB}
            open={open.open}
            onClose={() => setOpen({ ...open, open: false })}
        >
            <div className="vc_container">
                <div className="vc_header">
                    <span className="vc_header_title">
                        Beautyx khuyến mại
                    </span>
                    <button
                        onClick={() => setOpen({ ...open, open: false })}
                        className="vc_header_btn"
                    >
                        <img src={icon.closeBlack} alt="" />
                    </button>
                </div>
                <div className="vc_body">
                    <div className="vc_body_input">
                        <input
                            autoFocus={true}
                            disabled={cart_confirm.length > 0 && false}
                            value={text} onChange={onInputChange} type="text"
                        />
                        <XButton
                            style={text === "" ? {
                                backgroundColor: "var(--bg-color)",
                                cursor: "no-drop"
                            } : {}}
                            className="vc_body_input_btn"
                            title="Xác nhận"
                            loading={noti.load}
                            onClick={getDiscountDetail}
                        />
                        {
                            text !== "" &&
                            <button
                                onClick={() => {
                                    setText("")
                                    setOpen({ ...open, voucher: "" })
                                    dispatch(onClearApplyVoucher())
                                }}
                                className="vc_body_input_del"
                            >
                                <img src={icon.closeBlack} alt="" />
                            </button>
                        }
                    </div>
                    {
                        noti.message !== '' &&
                        <div className="vc_cart_none">
                            {noti.message}
                        </div>
                    }
                    {
                        cart_confirm.length === 0 &&
                        <div className="vc_cart_none">
                            Chọn Dịch vụ / sản phẩm trong giỏ hàng để áp dụng Voucher
                        </div>
                    }
                    {
                        voucher_org && cart_confirm.length > 0 &&
                        <div className="vc_cart_voucher_org">
                            Áp dụng khi thanh toán cho cửa hàng <h3>{voucher_org.name}</h3>
                        </div>
                    }
                    <ul className="vc_cart_voucher_list">
                        {
                            outDiscounts?.length > 0 &&
                            outDiscounts?.map((item: IDiscountPar, index: number) => (
                                <li className="voucher_list_item" key={index} >
                                    <OutDiscountItem discount={item} />
                                </li>
                            ))
                        }
                        {
                            organization && response && text !== "" &&
                            <li className="voucher_list_item" >
                                <VoucherOrgItem
                                    outDiscounts={outDiscounts}
                                    voucher={voucher}
                                    org={organization}
                                    showApplyBtn={true}
                                    cartAmount={cartAmount}
                                    services_id={services_id}
                                    products_id={products_id}
                                />
                                {/* <VoucherItem
                                    outDiscounts={outDiscounts}
                                    voucher={voucher}
                                    org={organization}
                                    showApplyBtn={true}
                                    totalAmount={cartAmount}
                                    services_id={services_id}
                                    products_id={products_id}
                                    VOUCHER_APPLY={VOUCHER_APPLY}
                                /> */}
                            </li>
                        }
                    </ul>
                    <div className="vc_bot">
                        <XButton
                            onClick={() => setOpen({ ...open, open: false })}
                            title="Đồng ý"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}