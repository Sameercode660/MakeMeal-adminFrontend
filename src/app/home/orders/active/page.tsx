'use client'
import ActiveOrders from '@/components/orderComponents/ActiveOrders'
import React from 'react'

function page() {
  return (
    <div className='transition-all duration-75 ease-in'>
      <ActiveOrders></ActiveOrders>
    </div>
  )
}

export default page
