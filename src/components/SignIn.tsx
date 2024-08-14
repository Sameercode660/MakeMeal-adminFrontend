'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from '@/assets/MakeMeal.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function SignIn() {


  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  async function handleAdminLogin() {
    try {
      if(!email) {
        setEmailError(true)
        return;
      }

      if(!password) {
        setPasswordError(true)
        return;
      }

      setLoading(true)
      const data = {
        email, 
        password
      }

      console.log(data)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/admin`, data)

      console.log(response)

      setLoading(false)
      router.push('/home')

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('https://d37byfojjwz7vp.cloudfront.net/new_resize_700_20240719135244200504.png')] bg-no-repeat bg-left">
      <div className='w-[300px] flex flex-col justify-center border rounded h-[400px] p-5 space-y-5'>
        <div className='w-full flex justify-center'>
          <Image src={Logo} alt="MM" width={150} height={150 } className='rounded-full'></Image>
        </div>
        <div>
          <Input type='text' placeholder='Email' className={`${emailError ? 'border-red-600': ''}`} onChange={(e) => {
            setEmail(e.target.value)
          }}></Input>
        </div>
        <div>
          <Input type='password' placeholder='password' className={`${passwordError ? 'border-red-600': ''}`} onChange={(e) => {
            setPassword(e.target.value)
          }}></Input>
        </div>
        <div className='text-center'>
          <Button variant={'outline'} onClick={handleAdminLogin}>{loading ? 'Please wait..': 'Login'}</Button>
        </div>
      </div>
    </div >
  )
}

export default SignIn
