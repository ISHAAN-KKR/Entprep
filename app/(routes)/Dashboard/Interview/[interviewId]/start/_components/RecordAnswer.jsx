"use client"
import { Button } from '@/components/ui/button'
import { Mic, StopCircle, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'

export default function RecordAnswer({ mockinterviewQuestions, activeQuestion, interviewData }) {
    const { user } = useUser();
    const [userAnswer, setUserAnswer] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        if (results.length > 0) {
            setUserAnswer(prevAns => prevAns + results.map(result => result.transcript).join(' '));
            setResults([]);  // Clear results after appending
        }
    }, [results, setResults]);

    const SaveUserAnswer = async () => {
        if (isRecording) {
            setLoading(true)
            stopSpeechToText();

            const feedbackPrompt = "Question:" + mockinterviewQuestions[activeQuestion]?.question + ", User answer : " + userAnswer + ". Based on the user's answer for the given interview question, please give a rating for the answer and feedback for areas of improvement if any in just 3 to 5 lines in JSON format with rating and feedback fields.";

            const result = await chatSession.sendMessage(feedbackPrompt)
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
            const jsonFeedbackResp = JSON.parse(mockJsonResp);
    
console.log("Yoo"+userAnswer)
            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockinterviewQuestions[activeQuestion]?.question,
                correctAns: mockinterviewQuestions[activeQuestion]?.answer,
                userAns: userAnswer,
                feedback: jsonFeedbackResp?.feedback,
                rating: jsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            });

            if (resp) {
                toast('User Answer Recorded Successfully')
                setResults([])
            }

            setLoading(false)
            setUserAnswer('')
            setResults([])
        } else {
            startSpeechToText();
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center rounded-lg mt-16 p-5 w-1/2 h-[60vh]'>
                <WebcamIcon className='absolute w-40 h-40' />
                <Webcam
                
                    mirrored={true}
                    style={{
                        height:'110%',
                        width: '130%',
                        zIndex: 10,
                    }}
                />

                <Button
                    disabled={loading}
                    onClick={SaveUserAnswer}
                    variant='outline'
                    className='my-10'>
                    {isRecording ?
                        <h2 className='text-red-500 flex gap-2 '>
                            <StopCircle />Stop Recording
                        </h2>
                        : 'Record Answer'}
                </Button>
                {/* <ul>
                    {results.map((result) => (
                        <li key={result.timestamp}>{result.transcript}</li>
                    ))}
                    {interimResult && <li>{interimResult}</li>}
                </ul> */}
            </div>
        </>
    )
}
