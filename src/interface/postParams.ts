export interface ParamsForgotSms{
  telephone:string;
  code?:string;
  new_password?:string
}
export interface ParamsPostMessage{
  msg:string;
  topic_id:string;
  reply_id?:string;
}