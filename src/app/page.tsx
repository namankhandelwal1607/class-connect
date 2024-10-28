"use client"

import React, { useEffect, useState } from 'react';
import { LampDemo } from "@/components/LampDemo";
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [detectClick, setDetectClick] = useState(false)
  const router = useRouter()

  useGSAP(() => {
    gsap.from('#signin', {
        opacity: 0,
        duration: 2,
        x: 100
    })
}, [])

useGSAP(() => {
  gsap.from('#signup', {
      opacity: 0,
      duration: 2,
      x: 100
  })
}, [])


useEffect(() => {
  if (detectClick) {
      gsap.to('#text-revel', {
          x: 1200,
          duration: 1.5
      })
      gsap.to('#signin', {
          x: -1000,
          duration: 2
      })
  }
}, [detectClick])



const handleClick = () => {
    setDetectClick(true)
    setTimeout(() => {
        router.push('/signin  ')
    }, 900)
}

const hanndleClick1 = ()=>{
  setTimeout(() => {
  router.push('/signup  ')
}, 900)
}


  return (
     <div className='scrollbar-hide'>
    {/* Top-right positioned buttons with z-index */}
    <div className="absolute top-4 right-4 flex space-x-4 z-10">
      <div id='signin'>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sign In
          </span>
        </button>
      </div>

      <div id='signup'>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={hanndleClick1}>
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sign Up
          </span>
        </button>
      </div>
    </div>

    <div id='text-reveal'>
      <LampDemo />
    </div>
  </div>
);

}
