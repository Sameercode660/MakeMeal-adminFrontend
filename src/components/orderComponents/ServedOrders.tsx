import React from 'react'

function ServedOrders() {
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
    </div>
  )
}

export default ServedOrders
