'use client'
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'

const TeacherButton = () => {
    const router = useRouter();
  const pathname = usePathname(); 

  const handleClick = () => {
    router.push(`${pathname}/teacher`);
  };
      
      
  return (
    <div>
        <button className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-[400px] h-[300px]" onClick={handleClick}>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-[3rem] font-medium text-white backdrop-blur-3xl">
    Teacher
  </span>
</button>
    </div>
  )
}

export default TeacherButton
