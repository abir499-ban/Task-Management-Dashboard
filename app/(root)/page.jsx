"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {  // Renamed 'page' to 'Page'
  const router = useRouter();

  useEffect(() => {
    router.push('/Tasklist');  // Optional: Add router to dependencies for completeness
  }, [router]);  // Added router to the dependencies array

  return (
    <div>TASK MANAGEMENT APP</div>
  );
}

export default Page;  // Updated export to 'Page'
