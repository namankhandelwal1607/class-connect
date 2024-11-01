'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { CardHoverEffectDemo } from '@/components/CardHoverEffectDemo';
import StudentButton from '@/components/StudentButton';
import TeacherButton from '@/components/TeacherButton';
import { gsap } from 'gsap'

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
  const router = useRouter();

  useEffect(() => {

    gsap.to('#student', {
      opacity: 0,
      duration: 3,
      x: "-100vh",
    });

    gsap.to('#teacher', {
      duration: 1.5,
      x: "-135vh",
      y: "-38vh",
      scale: 0.3, 
      ease: "power2.inOut" 
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

    gsap.from('#cr', {
      duration: 1,
      y: "12vh"
    })


    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`https://classroom-api-bice.vercel.app/getClassTaught/${userid}`);
        const classIds = response.data.classStudent;

        const classDetailsPromises = classIds.map(async (classId: string) => {
          const classResponse = await axios.get(`https://classroom-api-bice.vercel.app/getClassDetails/${classId}`);
          return { ...classResponse.data, classId };
        });

        const classDetails: ClassDetails[] = await Promise.all(classDetailsPromises);

        const projectsData = classDetails.map(classDetail => ({
          title: classDetail.className,
          description: classDetail.classDescription,
          link: `/${userid}/teacher/${classDetail.classId}`, 
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

  const handleClick =()=>{
    router.push(`${currentRoute}/createClass`);
  }

  return (
    <div>
      <div id='data' className='text-[3rem] font-bold flex justify-center'>Portal</div>
      <div className='flex justify-evenly mt-[100px]'>
      <div id='student'><StudentButton/></div>
      <div id='teacher'><TeacherButton/></div>
      </div>
      <div className='w-[100vw] absolute bottom-4 left-[80vw]' id='cr'>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Create Class
                </span>
        </button>
        </div>
        <div className='absolute top-5 w-[100vw]'>

        <div id='head' className='flex justify-center text-[3rem] font-bold'>Classrooms</div>
        <div className='w-[100vw]' id='classes'><CardHoverEffectDemo projects={projects} /></div>
        </div>
    </div>
  );
};

export default Page;
