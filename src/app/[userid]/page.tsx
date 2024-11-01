'use client'
import React from 'react';
import StudentButton from '@/components/StudentButton';
import TeacherButton from '@/components/TeacherButton';
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


const Page = () => {

  useGSAP(() => {
    gsap.from('#student', {
        opacity: 0,
        duration: 3,
        x: -200
    })

    gsap.from('#teacher', {
      opacity: 0,
      duration: 3,
      x: 200
  })

  gsap.from('#data', {
    opacity: 0,
    duration: 3,
    y: -100
})


}, [])



  return (
    <div className='mt-5'>
      <div id='data' className='text-[3rem] font-bold flex justify-center'>Portal</div>
      <div className='flex justify-evenly mt-[100px]'>
      <div id='student'><StudentButton/></div>
      <div id='teacher'><TeacherButton/></div>
      </div>
    </div>
  );
};

export default Page;
