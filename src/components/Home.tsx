'use client'
import React from 'react'
import Logo from '@/assets/MakeMeal.png'
import Image from 'next/image'
import { Button } from './ui/button'
import { RiFileHistoryLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Home({children}: {children: React.ReactNode}) {

    const router = useRouter()
    return (
        <div className='w-full h-screen'>
            <div className='w-full h-[5rem] bg-gradient-to-r from-slate-400 to-indigo-600 fixed top-0 flex justify-between pl-20 pr-20'>
                <div>
                    <Image src={Logo} alt='MM' width={70} height={70} className='rounded-full m-1' ></Image>
                </div>
                <div className='flex h-full items-center'>
                    <h1 className='text-white font-serif font-semibold text-3xl'>Make Meal</h1>
                </div>
                <div className='flex flex-col justify-center'>
                    <span className='text-white'>Admin</span>
                    <Button variant={'outline'} onClick={() => {
                        router.push("/")
                    }}>Logout</Button>
                </div>
            </div>
            <div className='w-full h-full flex'>
                <div className='w-[8%] h-full bg-gradient-to-r from-zinc-300 to-slate-200 fixed left-0 top-[5rem] flex flex-col  items-center'>
                    <Link href={'/home/orders'} className='w-[80%] h-[60px] border-2 rounded-xl p-1 m-3 border-gray-600 flex justify-center items-center flex-col'>
                        <span><RiFileHistoryLine className='text-3xl' /></span>
                        <span className='text-[10px] font-semibold'>Orders</span>
                    </Link>

                    <Link href={'/home/history'} className='w-[80%] h-[60px] border-2 rounded-xl p-1 m-3 border-gray-600 flex justify-center items-center flex-col'>
                        <span><FaHistory className='text-3xl' /></span>
                        <span className='text-[10px] font-semibold'>History</span>
                    </Link>

                    <Link href={'/home/hold'} className='w-[80%] h-[60px] border-2 rounded-xl p-1 m-3 border-gray-600 flex justify-center items-center flex-col'>
                        <span><FaRegStopCircle className='text-3xl' /></span>
                        <span className='text-[10px] font-semibold'>Hold/Unhold</span>
                    </Link>


                    <Link href={'/home/reports'} className='w-[80%] h-[60px] border-2 rounded-xl p-1 m-3 border-gray-600 flex justify-center items-center flex-col'>
                        <span><TbReportSearch className='text-3xl' /></span>
                        <span className='text-[10px] font-semibold'>Reports</span>
                    </Link>
                </div>
                <div className='w-[92%] ml-[6rem] xl:ml-[8rem] 2xl:ml-[10rem] mt-[6rem]'>{children}</div>
            </div>
        </div>
    )
}

export default Home
