import { axiosClient } from "config";
import { ITopic, ParamsPostMessage, ReqTopic, Response } from "interface";

export const chatApi = {
  createTopic: (data: ReqTopic) => {
    return axiosClient.post('topics', data).then<Response<ITopic>>(res => res.data)
  },
  postMessage: (data: ParamsPostMessage) => {
    return axiosClient.post('/messages', data)
  }
}