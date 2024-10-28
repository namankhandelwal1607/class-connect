"use client"
import React from 'react'
import { SigninFormDemo } from '@/components/SigninFormDemo';
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
const page = () => {

  useGSAP(() => {
    gsap.from('#signin', {
        opacity: 0,
        duration: 2,
        y: 100
    })
}, [])
  return (
    <div className='bg-[#020617] w-full h-[100vh] mt-0 pt-10'>
    <div id='signin'>
        <SigninFormDemo/>
    </div>
    </div> 
  )
}

export default page
