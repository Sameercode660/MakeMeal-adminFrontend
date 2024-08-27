import React from 'react'
import Loading from "@/assets/loading.gif"

function Loader() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <img src={Loading.src} alt="" />
    </div>
  )
}

export default Loader
