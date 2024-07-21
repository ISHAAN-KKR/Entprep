import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { Button } from '@/components/ui/button'
function page() {
  return (
   <>
   <a href='/Path'>

    <Button varinat='outline' className='mt-3 -ml-10'>&lt; Back</Button>
   </a>
   <div className='p-10'>
    <h2 className='font-bold text-2xl'>Dashboard</h2>
    <h2 className='text-gray-500'>Create and start your AI pitch</h2>

    <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
    <AddNewInterview/>
    </div>
    {/* Previous Interview List */}
    <InterviewList/>
   </div>
   
   
   </>
  )
}

export default page