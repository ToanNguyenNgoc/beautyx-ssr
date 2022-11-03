/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import SectionTitle from "../SectionTitle/index";
import { AppContext } from "../../context/AppProvider";
import { IPaymentMethod } from "../../interface/paymentMethod";
import { fetAsyncPaymentMethod } from '../../redux/payments/paymentSlice';
import { STATUS } from '../../redux/status'
import { useDispatch, useSelector } from "react-redux";
import './cartPayment.css';

interface IProps {
    e: any,
    onPaymentMethodChange: (e: any) => void
}

function PaymentMethodCpn(props: IProps) {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { status } = useSelector((state: any) => state.PAYMENT.PAYMENT);
    const { PAYMENT_METHOD } = useSelector((state: any) => state.PAYMENT);
    const { e, onPaymentMethodChange } = props;
    const [value, setValue] = useState('');
    const callPaymentMethodOnline = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetAsyncPaymentMethod())
        }
    }
    useEffect(() => {
        callPaymentMethodOnline()
    }, [])
    const handleOnChange = useCallback((event: any) => {
        setValue(event.target.value);
    }, [])

    return (
        <div>
            <SectionTitle title={t("pm.choose_payment_method")} />
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleOnChange}
            >
                <ul className="payment-method">
                    {PAYMENT_METHOD?.map((item: any) => (
                        <li className="flex-column" key={item.id}>
                            <div className="flex-row payment-method-head">
                                <FormControlLabel
                                    value={item.method}
                                    control={
                                        <Radio
                                            sx={{ "&.Mui-checked": { color: "var(--purple)" } }}
                                        />
                                    }
                                    label={item.title}
                                />
                                <img src={item.img} alt="" />
                            </div>
                            <div
                                style={
                                    value === item.method
                                        ? { display: "block" }
                                        : { display: "none" }
                                }
                                className="pm-method_child"
                            >
                                <ul>
                                    {item.method_list?.filter((item: IPaymentMethod) => item?.name_key === "MOMO")
                                        .map((item: IPaymentMethod) => (
                                            <li
                                                className="pm-method_child-item"
                                                key={item.id}
                                                onClick={() => onPaymentMethodChange(item)}
                                            >
                                                <div
                                                    className="pm-method_child-item_box"
                                                    style={
                                                        e === item
                                                            ? {
                                                                backgroundColor: "#7161BA",
                                                                color: "white",
                                                            }
                                                            : {
                                                                backgroundColor: "",
                                                                color: "#7161BA",
                                                            }
                                                    }
                                                >
                                                    {/* {chooseE_wall === item ? (
                                                        <img src={icon.success} alt="" />
                                                    ) : (
                                                        ""
                                                    )} */}
                                                    {item.name_key}
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </RadioGroup>
        </div>
    );
}

export default PaymentMethodCpn;
