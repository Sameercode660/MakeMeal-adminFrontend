import axios from "axios";

export async function fetchData(status: string) {
    try {
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-fetch-order`, {status: status})
        return response
    } catch (error) {
        console.log(error)
    }
}