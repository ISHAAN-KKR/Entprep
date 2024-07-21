"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { json } from 'drizzle-orm/mysql-core';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import moment from 'moment';
import { useRouter } from 'next/navigation';
function AddNewInterview() {
    const router=useRouter()
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [jobExperience, setJobExperience] = useState('')
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser();
    const onsubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience)


        const InputPrompt = `Business Category: ${jobPosition}, Business Description: ${jobDesc}, Business Experience: ${jobExperience} years. Based on this information, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION} questions that can be asked during a business pitch to investors with answers in JSON format. The JSON format should be an array of objects where each object contains a 'question' and an 'answer' field. Do not include any other text or explanations. The format will be: [{"question": "Question text here", "answer": "Answer text here"}, {"question": "Question text here", "answer": "Answer text here"}, {"question": "Question text here", "answer": "Answer text here"}]`;


        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        // console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp)

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: MockJsonResp,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID: ", resp)
            if (resp) {
                setOpenDialog(false)
                router.push('/Dashboard/Interview/'+resp[0]?.mockId)
            }
        }
        else {
            console.log("error")
        }


        setLoading(false)
    }
    return (
        <>

            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                <h2 className=" text-lg text-center" >+ Add New</h2>


            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your Business </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onsubmit}>
                                <div>
                                    <h2>Add details about your Business</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Business Category</label>
                                        <Input placeholder='Ex. Electronics' required onChange={(e) => setJobPosition(e.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Business Description (In short)</label>
                                        <Textarea placeholder='Ex. Online B2B' required onChange={(e) => setJobDesc(e.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label className='mb-2'>Years of Experience</label>
                                        <Input placeholder='Ex. 5' type="number" max="50" required onChange={(e) => setJobExperience(e.target.value)} />
                                    </div>

                                </div>

                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {
                                            loading ?
                                                <>

                                                    <LoaderCircle className='animate-spin' />Loading...
                                                </> : 'Start Pitch'
                                        }

                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default AddNewInterview