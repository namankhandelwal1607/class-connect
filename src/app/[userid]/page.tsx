import React from 'react';
import axios from 'axios';

interface UserData {
  userName: string;
}

interface PageProps {
  params: { userid: string };
}

const Page = async ({ params }: PageProps) => {
  const { userid } = await params; 

  let userData: UserData | null = null;
  let error: string | null = null;

  try {
    const response = await axios.get(`https://classroom-api-bice.vercel.app/getName/${userid}`);
    userData = response.data;
  } catch (err) {
    error = 'Error fetching user data.';
  }

  return (
    <div>
      <h1>User ID: {userid}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userData ? (
        <div>
          <p>User Name: {userData.userName}</p>
        
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Page;
