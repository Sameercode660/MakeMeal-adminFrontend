'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import Cloading from './Cloading'
import ItemList from './holditems/ItemList'
import Loader from './Loader'



function Hold() {
  const today = new Date().toISOString().split('T')[0]

  const [storeHoldLoading, setStoreHoldLoading] = useState<boolean>(false)
  const [storeHoldState, setStoreHoldState] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>([])

  async function handleStoreHold() {
    try {

      setStoreHoldLoading(true)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-store-hold`)

      setStoreHoldLoading(false)

      setStoreHoldState(true)

    } catch (error) {
      console.log(error)
    }

  }
  async function handleStoreUnhold() {
    try {
      setStoreHoldLoading(true)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-store-unhold`)

      setStoreHoldState(false)

      setStoreHoldLoading(false)

      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  async function fetchOrder() {
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-item-fetch-for-hold`)
      
      setData(response.data.response)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <div className='flex p-2 w-full flex-col gap-5'>
      <div className='m-1 flex items-center'>
        <Input type='date' defaultValue={today} readOnly className='w-[200px]'></Input>
        <div className='m-1'>
          {

            storeHoldState === true ? (<Button variant='outline' className='bg-green-500' onClick={handleStoreUnhold}> {storeHoldLoading === true ? (<Cloading width={30} hight={30}></Cloading>) : "Unhold"}</Button>) : (<Button variant='outline' className='bg-green-500' onClick={handleStoreHold}>{storeHoldLoading === true ? (<Cloading width={30} hight={30}></Cloading>) : "Hold"}</Button>)
          }

        </div>
      </div>

      <div className='w-full'>
        <div className='w-full flex justify-between bg-orange-300 h-[3.5rem]'>
          <div className='w-full flex justify-center items-center'>
            <span>Item Name</span>
          </div>
          <div className='w-full flex justify-center items-center'>
            <span>Hold/Unhold</span>
          </div>
        </div>
        <div className='w-full'>
       
          {
            loading === true ? (<Loader></Loader>) : (
              data.map((item: any) => (
                <ItemList
                productId={item.productId}
                name={item.name}
                availability={item.availability}
                fetchOrder={fetchOrder}
                ></ItemList>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Hold
