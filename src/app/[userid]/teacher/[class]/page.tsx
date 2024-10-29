'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CardHoverEffectDemo } from '@/components/CardHoverEffectDemo';
import MakeAnnouncement from '@/components/MakeAnnouncement';
import MembersButton from '@/components/MembersButton';
interface Announcement {
  teacherName: string;
  announcement: string;
}

interface Project {
  title: string;
  description: string;
  link: string; 
}

const Page = () => {
  const currentRoute = usePathname();
  const classid = currentRoute?.split('/').filter(Boolean).pop();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementResponse = await axios.get(`https://classroom-api-bice.vercel.app/getAnnouncementByClass/${classid}`);
        
        const projectsData: Project[] = announcementResponse.data.map((item: Announcement, index: number) => ({
          title: item.teacherName,
          description: item.announcement,
          link: `${currentRoute}/${index}`, 
        }));

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchData();
  }, [classid]);

  return (
    <div>
      <MakeAnnouncement/>
      <MembersButton/>
      <h1>Last Route Segment: {classid}</h1>
      
      <h2>Announcements:</h2>
      <CardHoverEffectDemo projects={projects} />
    </div>
  );
};

export default Page;
