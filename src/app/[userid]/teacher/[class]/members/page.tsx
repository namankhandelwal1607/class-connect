'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const Page = () => {
  const [students, setStudents] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
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

  return (
    <div>
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
