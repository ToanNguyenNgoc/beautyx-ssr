import { Dispatch, SetStateAction } from "react";

// import 
export interface IPropOtp{
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
    dataOtp: any
    setDataOtp: Dispatch<SetStateAction<any>>
    setOpenDialog?:Dispatch<SetStateAction<boolean>>
    handleSubmit: (props:any)=>any
}
export interface IDataOtp{
    telephone: number|string
    code: string
    verification_id: string
}
