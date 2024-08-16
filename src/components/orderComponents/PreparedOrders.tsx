import React from 'react'

function PreparedOrders() {
    return (
        <div className='w-full border transition-all duration-75 ease-in'>
            <table className='w-full'>
                <tr className='w-full flex justify-center h-[3rem] items-center'>
                    <th className='w-[20%]  border-r h-full flex justify-center items-center '>OrderId</th>
                    <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>OrderNo.</th>
                    <th className='w-[20%]  border-r h-full flex justify-center items-center '>Partner</th>
                    <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>Amount</th>
                    <th className='w-[20%]  border-r h-full flex justify-center items-center '>Payment</th>
                    <th className='w-[20%]  border-r h-full flex justify-center items-center bg-gray-100'>Print</th>
                </tr>
            </table>
        </div>
    )
}

export default PreparedOrders
