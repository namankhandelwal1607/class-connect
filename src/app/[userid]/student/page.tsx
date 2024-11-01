'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { CardHoverEffectDemo } from '@/components/CardHoverEffectDemo';
import StudentButton from '@/components/StudentButton';
import TeacherButton from '@/components/TeacherButton';
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
interface ClassDetails {
  classId: string;
  className: string;
  classDescription: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
}

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const currentRoute = usePathname();
  const segments = currentRoute?.split('/').filter(Boolean);
  const userid = segments?.[segments.length - 2];

  useEffect(() => {

    gsap.to('#student', {
      duration: 2,
      x: "-45vh",
      y: "-40vh",
      scale: 0.3, 
      ease: "power2.inOut" 
    });

    gsap.to('#teacher', {
      opacity: 0,
      duration: 3,
      x: "100vh",
    });

    gsap.to('#data', {
      duration: 1,
      y: "-15vh"
    });

    gsap.from('#head', {
      duration: 2,
      x: "120vh"
    });

    gsap.from('#classes', {
      opacity: 0,
      duration: 2,
      y: "100vh"
    });


    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`https://classroom-api-bice.vercel.app/getClassesEnrolled/${userid}`);
        const classIds = response.data.classStudent;

        const classDetailsPromises = classIds.map(async (classId: string) => {
          const classResponse = await axios.get(`https://classroom-api-bice.vercel.app/getClassDetails/${classId}`);
          return { ...classResponse.data, classId };
        });

        const classDetails: ClassDetails[] = await Promise.all(classDetailsPromises);

        const projectsData = classDetails.map(classDetail => ({
          title: classDetail.className,
          description: classDetail.classDescription,
          link: `/${userid}/student/${classDetail.classId}`, 
        }));

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    if (userid) {
      fetchClassDetails();
    }
  }, [userid]);

  const handleClick = () => {
    
  };

  return (
    <div className='mt-5'>
      <div id='data' className='text-[3rem] font-bold flex justify-center'>Portal</div>
      <div className='flex justify-evenly mt-[100px]'>
      <div id='student' onClick={handleClick}><StudentButton/></div>
      <div id='teacher'><TeacherButton/></div>
      </div>
      <div className='absolute top-5 w-[100vw]'>
      <div id='head' className='flex justify-center text-[3rem] font-bold'>Classrooms</div>
      <div className='w-[100vw]' id='classes'><CardHoverEffectDemo  projects={projects} /></div>
      </div>

    </div>
  );
};

export default Page;
