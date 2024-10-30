'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { CardHoverEffectDemo } from '@/components/CardHoverEffectDemo';

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
      <h1>Teacher Portal</h1>
      <h2>Enrolled Classes:</h2>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Create Class
                </span>
        </button>
      <CardHoverEffectDemo projects={projects} />
    </div>
  );
};

export default Page;
