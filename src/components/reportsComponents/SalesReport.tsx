import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function SalesReport() {
  return (
    <div className='flex items-center w-full justify-evenly'>
      <div>
        <label htmlFor="">From</label>
        <Input type='date' className='pl-5 pr-5'></Input>
      </div>
      
      <div>
        <label htmlFor="">To</label>
        <Input type='date'  className='pl-5 pr-5'></Input>
      </div>
      <div>
        <Button variant='outline'>Get Report</Button>
      </div>
    </div>
  )
}

export default SalesReport
