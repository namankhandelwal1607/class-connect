'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

const Page = () => {
  const [students, setStudents] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
  const router = useRouter();
  const currentRoute = usePathname();
  const segments = currentRoute?.split('/').filter(Boolean);
  const classid = segments?.[segments.length - 2];
  
  console.log('Class ID:', classid);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(
          `https://classroom-api-bice.vercel.app/getClassStudents/${classid}`
        );

        const teachersResponse = await axios.get(
          `https://classroom-api-bice.vercel.app/getClassTeachers/${classid}`
        );

        console.log('Fetched students data:', studentsResponse.data);
        console.log('Fetched teachers data:', teachersResponse.data);

        if (Array.isArray(studentsResponse.data.usernames)) {
          setStudents(studentsResponse.data.usernames);
        } else {
          console.error('Expected `usernames` to be an array');
        }

        if (Array.isArray(teachersResponse.data.usernames)) {
          setTeachers(teachersResponse.data.usernames);
        } else {
          console.error('Expected `usernames` to be an array for teachers');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (classid) fetchData();
  }, [classid]);

  const handleClick = ()=>{
    router.push(`${currentRoute}/addStudent`);
  }

  const handleClick1 = ()=>{
    router.push(`${currentRoute}/addTeacher`);
  }
  return (
    <div>

<button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Add Students
  </span>
</button>

<button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick1}>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Add Teachers
  </span>
</button>


      <h1>Class {classid} - Members List</h1>
      <div className="flex gap-10">
        <div>
          <h2>Students</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Teachers</h2>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>{teacher}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
