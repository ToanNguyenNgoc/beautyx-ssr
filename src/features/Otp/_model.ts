import { Dispatch, SetStateAction } from "react";

// import 
export interface IPropOtp{
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
    dataOtp: IDataOtp
    setDataOtp: Dispatch<SetStateAction<IDataOtp>>
    setOpenDialog:Dispatch<SetStateAction<boolean>>
    handleSubmit: (props:any)=>any
}
export interface IDataOtp{
    telephone: number|string
    code: string
    verification_id: string
}
