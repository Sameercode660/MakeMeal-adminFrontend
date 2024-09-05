'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import Cloading from '../Cloading'

function SalesReport() {


  const [data, setData] = useState<any>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)


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
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-sale-report`, data)
      
      
      setData(response.data.data)
      console.log(response.data.data)
      
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
            <span>RestaurantId</span>
          </div>
          <div className='w-full'>
            <span>Partner</span>
          </div>
          <div className='w-full'>
            <span>Total Sale</span>
          </div>
          <div className='w-full'>
            <span>Total Order</span>
          </div>
        </div>
        <div className='w-full flex justify-between h-[2.5rem] items-center p-2'>
          <div className='w-full'>
            <span className='text-[20px] font-semibold text-gray-500'>164</span>
          </div>
          <div className='w-full'>
            <span className='text-[20px] font-semibold text-gray-500'>Make Meal</span>
          </div>
          <div className='w-full'>
            <span className='text-[20px] font-semibold text-gray-500'>{data.totalSale}</span>
          </div>
          <div className='w-full'>
            <span className='text-[20px] font-semibold text-gray-500'>{data.totalOrder}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalesReport
