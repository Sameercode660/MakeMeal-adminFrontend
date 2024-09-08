'use client'

import Reports from '@/components/Reports'
import React from 'react'
import Link from 'next/link'

function Page() {
  return (
    <div className='flex '>
      <Link href="/home/reports/salesReports" className='m-2 p-1 flex justify-center items-center w-[250px] h-[250px] shadow-md shadow-gray-400 rounded-lg'>
        <span>
          Sales Report
        </span>
      </Link>
      <Link href="/home/reports/productReports" className='m-2 p-1 flex justify-center items-center w-[250px] h-[250px] shadow-md shadow-gray-400 rounded-lg'>
        <span>Product Report</span>
      </Link>
    </div>
  )
}

export default Page
