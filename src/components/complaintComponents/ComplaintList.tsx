'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import Cloading from '../Cloading'

function ComplaintList({ complaintId, orderId, name, mobile, category, user, order, title, description, createdAt, handleFetchOpenComaplaint }: any) {


    const [open, setOpen] = useState<boolean>(false)
    const [remarkDialogBox, setRemarkDialogBox] = useState<boolean>(false)
    const [remarkEmptyError, setRemarkEmptyError] = useState<boolean>(false)
    const [remark, setRemark] = useState<string>('')
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    async function handleCloseComaplaint() {
        setRemarkEmptyError(false)

        if (!remark || remark === '.' || remark === ' ') {
            setRemarkEmptyError(true)
            return;
        }

        try {
            setSubmitLoading(true)
            const data = {
                complaintId,
                userId: user.id,
                orderId: order.id,
                remark
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-complaint-remark`, data)

            setSubmitLoading(false)
            setRemarkDialogBox(false)
            handleFetchOpenComaplaint()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className='w-full flex justify-around items-center border-b p-1'>
                <div className='w-full text-center'>
                    <span className='text-blue-400 underline cursor-pointer' onClick={() => {
                        setOpen(true)
                    }}>{complaintId.length > 15 ? complaintId.slice(0, 15) : complaintId}</span>
                </div >
                <div className='w-full text-center'>
                    <span>{orderId}</span>
                </div>
                <div className='w-full text-center'>
                    <span>{name}</span>
                </div>
                <div className='w-full text-center'>
                    <span>{mobile}</span>
                </div>
                <div className='w-full text-center'>
                    <span>{category}</span>
                </div>
                <div className='w-full text-center'>
                    <Button variant={"outline"} className='bg-green-500 text-white hover:bg-green-400' onClick={() => {
                        setRemarkDialogBox(true)
                    }}>close</Button>
                </div>
            </div>
            {
                open ? (
                    <div className='w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.1)] fixed top-0 left-0 bottom-0 right-0 transition-all duration-1000 ease-out' onClick={() => {
                        setOpen(false)
                    }}>
                        <div className='w-[630px]  overflow-y-auto bg-white rounded-xl flex justify-center flex-col items-center space-y-4 p-5 ' onClick={(e) => {
                            e.stopPropagation()
                        }}>
                            <div>
                                <span className='text-base sm:text-lg font-semibold'>Complaint Details</span>
                            </div>
                            <div className='w-full'>
                                <table className='w-full'>
                                    <tr className='w-full bg-orange-200 h-[2.1rem]'>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='border text-center p-1'>{title}</td>
                                        <td className='border text-center p-1'>{description}</td>
                                        <td className='border text-center p-1'>{category}</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <span className='text-base sm:text-lg font-semibold'>Order Details</span>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div>
                                    <span className='font-sans font-semibold'>{new Date(createdAt).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className='font-sans font-semibold'>OrderNo. {orderId}</span>
                                </div>
                            </div>
                            <div className='w-full'>
                                <table className='w-full'>
                                    <tr className='w-full bg-orange-200 h-[2.1rem]'>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                    </tr>
                                    {
                                        order.items.map((item: any) => (
                                            <tr key={item.productId}>
                                                <td className='border text-center p-1'>{item.name}</td>
                                                <td className='border text-center p-1'>{item.quantity}</td>
                                                <td className='border text-center p-1'>{item.price}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div>
                            <div>
                                <span className='font-semibold'>Total Amount: {order.totalPrice}</span>
                            </div>
                            <div>
                                <span className='text-base sm:text-lg font-semibold'>Customer Details</span>
                            </div>
                            <div className='w-full mb-5'>
                                <table className='w-full'>
                                    <tr className='w-full bg-orange-200 h-[2.1rem]'>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                    </tr>
                                    <tr>
                                        <td className='border text-center p-1'>{name}</td>
                                        <td className='border text-center p-1'>{mobile}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : ('')
            }


            {/* Dialog box for Remark  */}
            {
                remarkDialogBox && (<div className='w-full h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center transition-all delay-150 duration-200 ease-in-out' onClick={() => {
                    setRemarkDialogBox(false)
                }}>
                    <div className='w-[300px] h-[200px] rounded-lg bg-white flex justify-center items-center flex-col gap-3 shadow-lg' onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <div>
                            <input type="text" name="remark" id="remark" placeholder='Remark' className={`border-b-2 ${remarkEmptyError ? 'border-b-red-500 placeholder:text-red-600' : 'border-b-green-500 placeholder:text-green-400'} outline-none`} onChange={(e) => {
                                setRemark(e.target.value)
                            }} />
                        </div>
                        <div>
                            <Button variant="outline" className='bg-green-500 hover:bg-green-400 text-white' onClick={handleCloseComaplaint}>{submitLoading === true ? <Cloading width={30} hight={30}></Cloading> : 'Submit'}</Button>
                        </div>
                    </div>
                </div>)

            }
        </>
    )
}

export default ComplaintList
