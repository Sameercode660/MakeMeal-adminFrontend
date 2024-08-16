import OrderMenu from '@/components/OrderMenu'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
        <OrderMenu>{children}</OrderMenu>
    </>
  )
}
