"use client";

import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { usePathname } from 'next/navigation';
import axios from "axios";

export function PlaceholdersAndVanishInputDemo() {
  const currentRoute = usePathname();
  const [inputValue, setInputValue] = useState("");
  
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted value:", inputValue);
   
    const segments = currentRoute?.split('/').filter(Boolean);
    const classid = segments?.[segments.length - 2];
    const userid = segments?.[segments.length - 4];
    
    const data = {
      className: classid,
      userName: userid,
      announcement: inputValue
    }
    
    const response = await axios.post("https://classroom-api-bice.vercel.app/announcement", data);
    console.log("Success:", response.data);
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Make Announcement
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
