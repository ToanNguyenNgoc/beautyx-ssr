import axiosClient from "api/axios";
import { ParamsPostMessage } from "interface";

export const chatApi = {
  postMessage: (data: ParamsPostMessage) => {
    return axiosClient.post('/messages', data)
  }
}