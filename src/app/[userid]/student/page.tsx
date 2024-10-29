import React from 'react';
import axios from 'axios';
import { CardHoverEffectDemo } from '@/components/CardHoverEffectDemo';

interface PageProps {
  params: Promise<{ userid: string }>;
}

interface ClassDetails {
  classId: string;
  className: string;
  classDescription: string;
}

const page = async ({ params }: PageProps) => {
  const { userid } = await params;

  const response = await axios.get(`https://classroom-api-bice.vercel.app/getClassesEnrolled/${userid}`);
  const classIds = response.data.classStudent;

  const classDetailsPromises = classIds.map(async (classId: string) => {
    const classResponse = await axios.get(`https://classroom-api-bice.vercel.app/getClassDetails/${classId}`);
    return { ...classResponse.data, classId }; 
  });

  const classDetails: ClassDetails[] = await Promise.all(classDetailsPromises);

  const projects = classDetails.map(classDetail => ({
    title: classDetail.className,
    description: classDetail.classDescription,
    link: `/${userid}/student/${classDetail.classId}`, 
  }));

  return (
    <div>
      <h1>Student Portal</h1>
      <h2>Enrolled Classes:</h2>
      
      <CardHoverEffectDemo projects={projects} />
    </div>
  );
};

export default page;
