'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import Cloading from '../Cloading'

function ItemList({ productId, name, availability, fetchOrder }: any) {


    const [loading, setLoading] = useState<boolean>(false)

    async function handleItemHold() {
        try{

            setLoading(true)
            const data = {
                productId
            }
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-product-hold`, data)
            
            console.log(response)
            setLoading(false)
            fetchOrder()
        }catch(error){
            console.log(error)
        }
    }

    async function handleItemUnhold() {
        try{

            setLoading(true)
            const data = {
                productId
            }
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-product-unhold`, data)
            
            console.log(response)
            setLoading(false)
            fetchOrder()
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='w-full flex justify-between p-2 border-b'>
            <div className='w-full flex justify-start pl-5'>
                <span className='text-lg font-semibold'>{name}</span>
            </div>
            <div className='w-full flex justify-center' >

                {
                    availability === true ? (<Button variant={'outline'} className='bg-green-500' onClick={handleItemHold}>{loading === true ? (<Cloading width={30} hight={30}></Cloading>) : 'Hold'}</Button>) : (<Button variant={'outline'} className='bg-green-500' onClick={handleItemUnhold}>{loading === true ? (<Cloading width={30} hight={30}></Cloading>) : 'Unhold'}</Button>)
                }


            </div>
        </div>
    )
}

export default ItemList
