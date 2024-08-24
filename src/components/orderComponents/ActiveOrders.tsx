'use client'
import React, {useEffect} from 'react'
import { pusher } from '@/utils/pusher';

function ActiveOrders() {

  useEffect(() => {

    const channel = pusher.subscribe('oms-orders');

    // Bind the event to handle new orders
    channel.bind('new-order', function (data: any) {
        console.log('New order received:', data);
        // Update OMS UI here
    });



    return () => {
        channel.unbind_all();
        channel.unsubscribe();
    };
}, [])

  return (
    <div className='w-full border '>
        <table className='w-full'>
            <tr className='w-full flex justify-center h-[3rem] items-center'>
                <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>OrderId</th>
                <th className='w-[20%]  border-r h-full flex justify-center items-center'>OrderNo.</th>
                <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>Partner</th>
                <th className='w-[20%]  border-r h-full flex justify-center items-center'>Amount</th>
                <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>Payment</th>
                <th className='w-[20%]  border-r h-full flex justify-center items-center'>Print</th>
            </tr>
        </table>
    </div>
  )
}

export default ActiveOrders
