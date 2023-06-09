export interface ReqTopic {
  org: number;
  recipient_id?: string;
  group_name: string
}

export interface ITopic {
  _id: string,
  type: string,
  organization_id: number,
  created_by: number,
  name: string | null,
  updated_at: string,
  created_at: string,
  messages: IMessage[]
  topic_user: ITopicUser[]
}
export interface IMessage {
  _id: string,
  msg: string,
  user_id: number,
  topic_id: string,
  reply_id: null | string,
  updated_at: string,
  created_at: string,
  user?: {
    avatar: string | null;
    current_platform: string | null;
    fullname: string;
    id: string;
  },
}
export interface ITopicUser {
  joined_at: string;
  topic_id: string;
  user: {
    avatar: string | null;
    current_platform: string | null;
    fullname: string;
    id: string;
  },
  user_id: number;
  _id: string;
}