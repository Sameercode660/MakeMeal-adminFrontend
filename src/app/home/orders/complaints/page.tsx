'use client'


import Complaints from '@/components/orderComponents/Complaints'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ComplaintList from '@/components/complaintComponents/ComplaintList'
import Loader from '@/components/Loader'

function page() {


  const [loading, setLoadig] = useState<boolean>(true)
  const [data, setData] = useState<any>([])


  async function handleFetchOpenComaplaint() {
    try {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/order/oms-fetch-complaint`, { status: 'OPEN' })
      setData(response.data.response)
      setLoadig(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetchOpenComaplaint()
  }, [])
  return (
    loading === true ? <Loader></Loader> : (
      data.length === 0 ? <div>No any complaint is found</div> : (<div className='w-full border m-1'>
        <table className='w-full bg-[hsl(24,100%,75%)]'>
          <tr className='w-full flex justify-around items-center'>
            <th className='border w-full h-full p-2'>ComplaintId</th>
            <th className='border w-full h-full p-2'>OrderNo.</th>
            <th className='border w-full h-full p-2'>Name</th>
            <th className='border w-full h-full p-2'>Mobile</th>
            <th className='border w-full h-full p-2'>Category</th>
            <th className='border w-full h-full p-2'>Action</th>
          </tr>
        </table>
        {
          data.map((complaint: any) => (
            <ComplaintList
              key={complaint.id}
              complaintId={complaint.id}
              orderId={complaint.order.orderNumber}
              name={complaint.user.name}
              mobile={complaint.user.phoneNumber}
              category={complaint.category}
              user={complaint.user}
              order={complaint.order}
              title={complaint.title}
              description={complaint.description}
              createdAt={complaint.order.createdAt}
              handleFetchOpenComaplaint={handleFetchOpenComaplaint}
            ></ComplaintList>
          ))
        }
      </div>)
    )
  )
}

export default page
