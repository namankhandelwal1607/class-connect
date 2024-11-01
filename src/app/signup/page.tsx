'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { SignupFormDemo } from '@/components/SignupFormDemo'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation';
const page = () => {

  const [detectClick, setDetectClick] = useState(false)
  const router = useRouter();
  useGSAP(() => {
    gsap.from('#dialogBox', {
        opacity: 0,
        duration: 2,
        y: 100
    })
}, [])

useEffect(() => {
  if (detectClick) {
      gsap.to('#signup', {
          x: "46vw",
          duration: 1
      })
  }
}, [detectClick])
const handleClick = () => {
  setDetectClick(true)
  setTimeout(() => {
      router.push('/')
  }, 1000)
}


  return (
    <div className='bg-[#020617] w-full h-[100vh] mt-0 pt-10'>
        <div className='absolute left-[47vw] top-4' id='signup'>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sign Up
          </span>
        </button>
      </div>

      <div id='dialogBox' className='mt-[100px]'>
        <SignupFormDemo/>
        </div>
    </div>
  )
}

export default page
