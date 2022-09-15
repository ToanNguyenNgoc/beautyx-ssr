import axiosClient from './axios';

class Payment {
      getAllPayment = () => {
            const url = `/paymentmethods`
            return axiosClient.get(url);
      }
}
const payments = new Payment();
export default payments