import { useState } from 'react';
import DialogOtp from '../features/Otp/dialogOtp';
import {IDataOtp} from '../features/Otp/_model';
import {vnPhoneCheck} from './validateForm';

export function checkPhoneValid(phone:string|number):Boolean{
    var result = vnPhoneCheck.test(phone.toString());
    return result
}
function SendOtp(telephone:number|string){
    const [open, setOpen] = useState(true)
    const [dataOtp, setDataOtp] = useState<IDataOtp>({
        telephone: '',
        code: '',
        verification_id: ''
    })
    const handleSubmit = (props:any)=>{
        
    }
    return(
        // DialogOtp({
        //     open:open,
        //     setOpen:setOpen,
        //     dataOtp:dataOtp,
        //     setDataOtp:setDataOtp,
        //     handleSubmit: handleSubmit
        // })
        <>
        </>
    )
}
interface IProps{
    telephone: number|string
    token: string
}
//open, setOpen, dataOtp, setDataOtp, handleSubmit
export default function index(props:IProps){
    
    const {telephone,token} = props
    const RenderIndex = () => {
        if(checkPhoneValid(telephone)){
            return <></>
        }
        else{
            return SendOtp(telephone)
        }
    }
    return (
        <>
            <RenderIndex/>
        </>
    )
}