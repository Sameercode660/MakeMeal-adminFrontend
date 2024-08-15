'use client'

import React, { useEffect } from 'react'
import { UserAuthenticationAtom } from '@/recoil/UserAuthentication'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/navigation'

function ProtectedRoute({children}: {children: React.ReactNode}) {

  const login = useRecoilValue(UserAuthenticationAtom)
  const router = useRouter()

  useEffect(() => {
    if(!login) {
        router.push('/')        
    }
  }, [login])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute
