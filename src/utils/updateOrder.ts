import axios from "axios";


export async function updateOrder(orderId: string, status: string, updateStatus: string) {
    try {

        const data = {
            orderId, 
            status,
            updateStatus,
        }
        const response = axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-update-order`, data)

        return response
    } catch (error) {
        console.log(error)
    }
}