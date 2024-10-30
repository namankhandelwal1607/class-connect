'use client';
import React, { useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { usePathname } from 'next/navigation';
import axios from "axios";

export function BackgroundLinesDemo1() {
    const currentRoute = usePathname();
    const [verificationStatus, setVerificationStatus] = useState<string>(''); 
    const [userName, setUserName] = useState<string>(''); 

    const handleClick = async () => {
        const segments = currentRoute?.split('/').filter(Boolean);
        const jwtPath = segments?.[segments.length - 1];
        console.log(jwtPath);

        const data = { jwtPath }; 

        try {
            const response = await axios.post(`https://classroom-api-bice.vercel.app/verification`, data);
            console.log(response.data);

            if (response.data) {
                setUserName(response.data.userName); 
                setVerificationStatus('Verification Complete'); 
            }
        } catch (error) {
            console.error('Error during API call:', error);
            setVerificationStatus('Verification Failed'); 
        }
    };

    return (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                {verificationStatus || 'VERIFICATION IN PROCESS'} 
            </h2>
            {verificationStatus === '' && ( 
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleClick}>
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Verify Yourself
                    </span>
                </button>
            )}
            {verificationStatus === 'Verification Complete' && userName && (
                <div className="mt-4 text-center text-lg text-white">
                    {userName}, your verification is complete! 
                </div>
            )}
        </BackgroundLines>
    );
}
