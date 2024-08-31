'use client'

import React, { useState } from 'react'
import Logo from '@/assets/MakeMeal.png'
import { Button } from './ui/button'
import { updateOrder } from '@/utils/updateOrder'
import Cloading from './Cloading'
import axios from 'axios'

function OrderList({ orderId, orderNumber, amount, status, items, time, customerName, mobile, fetchOrder, updateStatus, cancelChecked }: any) {

    const [openOrderDetailBox, setOpenOrderDetailBox] = useState<boolean>(false)
    const [preparedOrderLoading, setPreparedOrderLoading] = useState<boolean>(false)
    const [cancelOrderLoading, setCancelOrderLoading] = useState<boolean>(false)
    const [printLoading, setPrintLoading] = useState<boolean>(false)

    async function orderPrepared() {
        try {
            setPreparedOrderLoading(true)
            const response = await updateOrder(orderId, status, updateStatus)

            console.log(response)

            setPreparedOrderLoading(false)

            await fetchOrder(status)
        } catch (error) {
            console.log(error)
        }
    }
    async function cancelOrder() {
        try {
            setCancelOrderLoading(true)

            const response = await updateOrder(orderId, status, 'cancel')

            console.log(response)

            await fetchOrder(status)

            setCancelOrderLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function printBill() {
        try {

            setPrintLoading(true)
            
            const data = {
                orderId: orderId
            }
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/generate-bill`, data, {responseType: 'blob'})
            
            const url = window.URL.createObjectURL(new Blob([response.data]))
            
            const link = document.createElement('a')
            
            link.href = url
            
            link.setAttribute('download', 'order-bill.pdf')
            
            link.click()
            
            setPrintLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full flex justify-center h-[3rem] items-center p-1 bg-blue-100 m-1'>
                <div className='w-[20%] text-center'>
                    <span className='text-blue-600 underline cursor-pointer' onClick={() => {
                        setOpenOrderDetailBox(true)
                    }}>{orderId.length > 10 ? orderId.slice(0, 10) + ".." : orderId}</span>
                </div>
                <div className='w-[20%] text-center' >
                    <span>{orderNumber}</span>
                </div>
                <div className='w-[20%] flex justify-center items-center'>
                    <img src={Logo.src} alt="MM" width={50} height={50} className='rounded-full' />
                </div>
                <div className='w-[20%] text-center'>
                    <span>{amount}</span>
                </div>

                {
                    cancelChecked ? ('') : (
                        <div className='w-[20%] text-center'>
                            <Button variant={'outline'} onClick={orderPrepared}>{preparedOrderLoading ? <Cloading width={30} hight={30}></Cloading> : updateStatus}</Button>
                        </div>
                    )
                }
                <div className='w-[20%] text-center'>
                    <span>Online</span>
                </div>
                <div className='w-[20%] text-center' >
                    <Button variant="outline" onClick={printBill}>{printLoading ? <Cloading width={30} hight={30}></Cloading> : 'Print' } </Button>
                </div>
            </div>
            {
                openOrderDetailBox === true ? (<div className='w-full h-screen fixed top-0 transition-all ease-in duration-200 bg-[rgba(0,0,0,0.1)] z-[200] flex justify-center items-center'>
                    <div className='w-[600px] h-[400px] bg-white border rounded-xl p-2 flex flex-col items-center gap-5 overflow-y-auto'>
                        <div className='text-center'>
                            <h1 className='text-xl font-semibold'>Order Details</h1>
                        </div>
                        <div className='text-center'>
                            <span>
                                {new Date(time).toLocaleString()}
                            </span>
                        </div>
                        <div className='w-full'>
                            <table className='w-full flex justify-center items-center flex-col'>
                                <tr className='w-full border flex justify-evenly p-2 bg-[rgba(0,0,0,0.1)]'>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>
                                {
                                    items.map((item: any) => (
                                        <tr key={item.productId} className='border w-full flex justify-evenly p-2'>
                                            <td>{item.name.length > 20 ? item.name.slice(0, 20) + '..' : item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                        <div className='w-full'>
                            <table className='w-full border' border={1}>
                                <tr className='w-full text-center border p-1'>
                                    <td>Name</td>
                                    <td>{customerName}</td>
                                </tr>
                                <tr className='w-full text-center border p-1'>
                                    <td>Mobile</td>
                                    <td>{mobile}</td>
                                </tr>
                            </table>
                        </div>
                        <div className='w-full flex justify-center items-center gap-2'>

                            {
                                cancelChecked ? ('') : (<div>
                                    <Button variant={'outline'} className='bg-red-700 text-white' onClick={cancelOrder}>{cancelOrderLoading ? <Cloading width={30} hight={30}></Cloading> : 'CancelOrder'}</Button>
                                </div>)
                            }
                            <div>
                                <Button variant={'outline'} className='bg-green-500' onClick={() => {
                                    setOpenOrderDetailBox(false)
                                }}>BackToOrder</Button>
                            </div>
                        </div>
                    </div>
                </div>) : ('')
            }
        </>
    )
}

export default OrderList
