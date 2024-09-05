'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import Cloading from '../Cloading'

function ProductReport() {

  const [data, setData] = useState<any>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(0)
  const [totalPrice, setTotalPrice ] = useState<number>(0)
  

  async function handleSaleReports() {

    if (!startDate || !endDate) {
      alert("Please select valid date range")
      return;
    }
    try {
      setLoading(true)
      const data = {
        startDate: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        endDate: new Date(`${endDate}T23:59:59.999Z`).toISOString()
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-product-report`, data)


      setData(response.data.flatArray)
      setQuantity(response.data.quantity)      
      setTotalPrice(response.data.totalPrice)      
      setLoading(false)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex items-center w-full justify-between gap-4'>
        <div className='w-full'>
          <span>From Date</span>
          <Input type='date' className='pl-5 pr-5' onChange={(e) => {
            setStartDate(e.target.value)
          }}></Input>
        </div>

        <div className='w-full'>
          <span>To Date</span>
          <Input type='date' className='pl-5 pr-5' onChange={(e) => {
            setEndDate(e.target.value)
          }}></Input>
        </div>
        <div className='w-full'>
          <Button variant='outline' onClick={handleSaleReports} className='bg-green-400 mt-6'>{loading ? <Cloading width={30} hight={30}></Cloading> : "Report"}</Button>
        </div>
      </div>
      <div className='w-full mt-5'>
        <div className='w-full bg-orange-400 flex justify-between h-[2.5rem] items-center text-[20px] font-sans p-2 font-semibold'>
          <div className='w-full'>
            <span>ProductId</span>
          </div>
          <div className='w-full'>
            <span>Name</span>
          </div>
          <div className='w-full'>
            <span>Quantity</span>
          </div>
          <div className='w-full'>
            <span>Price</span>
          </div>
        </div>
        {
          data.length === 0 ? ("No Report .....") : (
            data.map((orderlist: any) => (
              <div key={data.productId} className='w-full flex justify-between h-[3.5rem] items-center border-b '>
                <div className='w-full'>
                  <span className='text-[16px] font-semibold text-gray-500 pl-4'>{orderlist.productId}</span>
                </div>
                <div className='w-full'>
                  <span className='text-[16px] font-semibold text-gray-500'>{orderlist.name}</span>
                </div>
                <div className='w-full'>
                  <span className='text-[16px] font-semibold text-gray-500 pl-10'>{orderlist.quantity}</span>
                </div>
                <div className='w-full'>
                  <span className='text-[16px] font-semibold text-gray-500'>{orderlist.price}</span>
                </div>
              </div>
            ))
          )
        }
        <div className='w-full bg-orange-400 flex justify-between h-[2.5rem] items-center text-[20px] font-sans p-2 font-semibold'>
          <div className='w-full '>
            <span>Total Quantity: {quantity}</span>
          </div>
          <div className='w-full '>
            <span>Total Price: {totalPrice}</span>
          </div>
        </div>

      </div>
    </>
  )
}

export default ProductReport
