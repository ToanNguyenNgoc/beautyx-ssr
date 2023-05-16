import { axiosClient } from "config";
import { ParamsPostMessage } from "interface";

export const chatApi = {
  postMessage: (data: ParamsPostMessage) => {
    return axiosClient.post('/messages', data)
  }
}