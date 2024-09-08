'use client'

import History from '@/components/History'
import React, { useState } from 'react'
import layout from '../layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Loader from '@/components/Loader'
import OrderList from '@/components/OrderList'

function Page() {

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)


  async function handleOrderSearch() {
    try {

      if (!startDate || !endDate) {
        return
      }
      setLoading(true)

      const data = {
        startDate: startDate ? new Date(`${startDate}T00:00:00.000Z`).toISOString() : null,
        endDate: endDate ? new Date(`${endDate}T23:59:59.999Z`).toISOString() : null,
        orderNumber: orderNumber || null,
        mobileNumber: mobileNumber || null
      }


      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-search-order`, data)


      setData(response.data.response)
      setLoading(false)


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='w-full h-screen flex flex-col items-center gap-10'>
        {/* search section  */}
        <div className='w-full flex justify-center items-center gap-4'>
          <div>
            <Input type='date' placeholder='From Date'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
              }}
            ></Input>
          </div>
          <div>
            <Input type='date' placeholder='To Date'
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
              }}
            ></Input>
          </div>
          <div>
            <Input type='text' placeholder='OrderNo.(optional)'
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value)
              }}
            ></Input>
          </div>
          <div>
            <Input type='text' placeholder='OrderNo.(optional)'
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value)
              }}
            ></Input>
          </div>
          <div>
            <Button variant={'outline'} className=' text-white bg-green-500 hover:bg-green-400 hover:text-white'
              onClick={handleOrderSearch}
            >Search</Button>
          </div>
        </div>
        {/* order show section  */}
        <div className='w-full'>
          {
            loading === true ? (
              <Loader></Loader>
            ) :
              (
                data === undefined || data.length === 0
                  ? (
                    <div className='w-full h-24 flex justify-center items-center'>
                      <span>No any order</span>
                    </div>
                  ) : (
                    data.map((order: any) => (
                      <OrderList
                      key={order.id}
                        orderId={order.id}
                        orderNumber={order.orderNumber}
                        amount={order.totalPrice}
                        status={order.status}
                        items={order.items}
                        time={order.createdAt.toLocaleString()}
                        mobile={order.user.phoneNumber}
                        customerName={order.user.name}
                        updateStatus={'prepared'}
                        cancelChecked={false}
                      ></OrderList>
                    ))
                  )
              )
          }
        </div>
      </div>
    </>

  )
}

export default Page
