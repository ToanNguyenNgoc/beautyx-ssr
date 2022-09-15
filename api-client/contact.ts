import axiosClient from "./axios";

class Contact {
  countDown = (params: any) => {
    const url = `https://stagingkdemo.000webhostapp.com/Frontend/register_beautyx`;
    return axiosClient.post(url, params);
  };
}
const contact = new Contact();
export default contact;
