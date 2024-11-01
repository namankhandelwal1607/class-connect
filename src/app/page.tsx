"use client"

import React, { useEffect, useState } from 'react';
import { LampDemo } from "@/components/LampDemo";
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [detectClick, setDetectClick] = useState(false)
  const [detectClick1, setDetectClick1] = useState(false)
  const router = useRouter()



useEffect(() => {
  if (detectClick) {
      gsap.to('#signin', {
          x: "-41vw",
          duration: 1
      })
  }

  if (detectClick1) {
    gsap.to('#signup', {
        x: "-46vw",
        duration: 1
    })
}
}, [detectClick, detectClick1])



const handleClick = () => {
    setDetectClick(true)
    setTimeout(() => {
        router.push('/signin  ')
    }, 900)
}

const hanndleClick1 = ()=>{
  setDetectClick1(true)
  setTimeout(() => {
  router.push('/signup  ')
}, 900)
}


  return (
     <div className='scrollbar-hide'>
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
