"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/Tasklist')
  }, [])
  return (
    <div>TASK MANAGEMENT APP</div>
  )
}

export default page