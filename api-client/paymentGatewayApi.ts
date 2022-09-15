import axiosClient from "./axios";

class PaymentGateway {
    getStatus = (values: any) => {
        const session = window.sessionStorage.getItem("_WEB_TK");
        const local = localStorage.getItem("_WEB_TK")
        const url = 'paymentgateways/' + values.paymentId + `/status?cancel=${values.status}`;
        // const params={

        // }
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${session ? session : local}`,
            }
        });
    }
}
const paymentGatewayApi = new PaymentGateway();
export default paymentGatewayApi;