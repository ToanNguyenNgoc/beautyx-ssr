export interface ITopic {
  _id: string,
  type: string,
  organization_id: number,
  created_by: number,
  name: string | null,
  updated_at: string,
  created_at: string,
  messages: IMessage[]
}
export interface IMessage {
  _id: string,
  msg: string,
  user_id: number,
  topic_id: string,
  reply_id: null | string,
  updated_at: string,
  created_at: string
}