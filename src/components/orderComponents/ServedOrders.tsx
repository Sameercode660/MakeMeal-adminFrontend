'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrderList from '../OrderList'
import { fetchData } from '@/utils/orderFetch'
import Loader from '../Loader'

function ServedOrders() {

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function fetchOrder() {
    try {
      const response = await fetchData('served')

      setData(response?.data.response)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])


  return (
    <div className='w-full border '>
      <table className='w-full'>
        <tr className='w-full flex justify-center h-[3rem] items-center'>
          <th className='w-[20%]  border-r h-full flex justify-center items-center  bg-gray-100'>OrderId</th>
          <th className='w-[20%]  border-r h-full flex justify-center items-center '>OrderNo.</th>
          <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>Partner</th>
          <th className='w-[20%]  border-r h-full flex justify-center items-center '>Amount</th>
          <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>Payment</th>
          <th className='w-[20%]  border-r h-full flex justify-center items-center '>Print</th>
        </tr>
      </table>

      {
        loading === true ? (
          <Loader></Loader>
        ) :
          (
            data === undefined
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
                    customerName={order.user.name}
                    mobile={order.user.phoneNumber}
                    fetchOrder={fetchOrder}
                    updateStatus={'close'}
                    cancelChecked={false}
                  ></OrderList>
                ))
              )
          )
      }
    </div>
  )
}

export default ServedOrders
