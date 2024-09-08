'use client'

import React from 'react'
import Link from 'next/link'

function OrderMenu({children}: {children: React.ReactNode}) {
    return (
        <div className='w-full border-gray-500 flex h-screen overflow-scroll flex-col'>
            <div className='flex justify-evenly w-full h-[3rem] items-center border-b bg-gradient-to-r from-lime-200 to-yellow-200'>
                <Link href="/home/orders/active"  className='w-[20%] flex justify-center items-center border-r h-full'><span>Active</span></Link>
                <Link href="/home/orders/prepared"  className='w-[20%] flex justify-center items-center border-r h-full'><span>Prepared</span></Link>
                <Link href="/home/orders/served"  className='w-[20%] flex justify-center items-center border-r h-full'><span>Served</span></Link>
                <Link href="/home/orders/cancel"  className='w-[20%] flex justify-center items-center border-r h-full'><span>Cancel</span></Link>
                <Link href="/home/orders/complaints"  className='w-[20%] flex justify-center items-center border-r h-full'><span>Complaint</span></Link>
            </div>
            <div className='transition-all duration-100 ease-in'>
                {children}
            </div>
        </div>
    )
}

export default OrderMenu
