import Home from '@/components/Home'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

export function layout({children}: {children: React.ReactNode}) {
    return (
        <>
            {/* <ProtectedRoute> */}
                <Home>{children}</Home>
            {/* </ProtectedRoute> */}
        </>
    )
}

export default layout
