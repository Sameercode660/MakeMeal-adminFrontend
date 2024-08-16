import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'


function Hold() {
  const today = new Date().toISOString().split('T')[0]
  return (
    <div className='flex p-2'>
      <div className='m-1'>
        <Input type='date' defaultValue={today} readOnly className='w-[200px]'></Input>
      </div>
      <div className='m-1'>
        <Button variant='outline'>Hold</Button>
      </div>
    </div>
  )
}

export default Hold
