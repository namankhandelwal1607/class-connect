'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
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

  return (
    <div>
      <h1>Student Portal</h1>
      <h2>Enrolled Classes:</h2>
      
      <CardHoverEffectDemo projects={projects} />
    </div>
  );
};

export default Page;
