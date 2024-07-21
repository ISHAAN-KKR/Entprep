"use client"
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function Interview({ params }) {
  const [interviewData, setInterviewData] = useState()
  const [webcamEnabled, setWebcamEnabled] = useState(false)

  useEffect(() => {
    console.log(params.interviewId)
    getInterview()
  }, [])
  const getInterview = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
    // console.log(result)
    setInterviewData(result[0]);
  }
  // console.log(interviewData)

  return (
    <>
      <div className="my-10 ">
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10  '>


          <div className='flex flex-col my-5 gap-5'>
            <div className='flex flex-col p-5 rounded-lg border gap-5 '>
              <h2 className='text-lg'>
                <strong>Business Category :</strong> {interviewData&&interviewData.jobPosition}
                {/* <strong>Business Category :</strong> Grocery */}
              </h2>
              <h2 className='text-lg'>
                <strong>Business Description :</strong> {interviewData&&interviewData.jobDesc}
                {/* <strong>Business Description :</strong> Online Grocery Store */}
              </h2>
              <h2 className='text-lg'>
                <strong>Years of experience :</strong> {interviewData&&interviewData.jobExperience}
                {/* <strong>Years of experience :</strong> 5 */}
              </h2>
            </div>
            <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-300'>
              <h2 className='flex gap-2 items-center text-yellow-700'><Lightbulb/><strong>Information</strong></h2>
              <h2 className='ml-3 text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
          </div>
          <div>
          {
            webcamEnabled ?
              <Webcam onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                style={{ height: 300, width: 300 }} mirrored={true} />
              :
              <>
                <WebcamIcon 
                
                className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                <Button 
                variant='ghost'
                onClick={() => setWebcamEnabled(true)} >Allow Camera & Microphone</Button>
              </>

          }

        </div>
        </div>
          <div className='flex justify-end items-end'>
            <Link href={'/Dashboard/Interview/'+params.interviewId+'/start'}>
            <Button>Start Pitch</Button>
            </Link>
           
          </div>
      </div>
    </>
  )
}

export default Interview