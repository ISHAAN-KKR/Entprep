import { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, Volume2 } from 'lucide-react';
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "@/app/_Components/model_comp/Experience";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

function Questions({ mockinterviewQuestions, activeQuestion }) {
  const [speak, setSpeak] = useState(false);

  useEffect(() => {
    if (Array.isArray(mockinterviewQuestions) && mockinterviewQuestions[activeQuestion]) {
      textToSpeech(mockinterviewQuestions[activeQuestion].question);
    }
  }, [activeQuestion]);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      setSpeak(true);
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => {
        setSpeak(false);
      };
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry! Your browser does not support text to speech");
    }
  };

  return (
    <>
      <div className='h-[60vh] w-1/2 -z-10'>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience speak={speak} />
        </Canvas>
        <div className='bg-gray-50 z-10 my-3 px-2 rounded-lg text-neutral-800'>
          <p className='text-xl flex'>
            {Array.isArray(mockinterviewQuestions) && mockinterviewQuestions[activeQuestion]?.question}
            {/* {mockinterviewQuestions && <TextGenerateEffect words={mockinterviewQuestions[activeQuestion]?.question} />} */}
          </p>
          <span className='pt-6 ml-2'>
            <RefreshCw className='hover:rotate-45 transition-all' onClick={() => textToSpeech(mockinterviewQuestions[activeQuestion]?.question)} />
          </span>
        </div>
      </div>
      {/* Uncomment and use this if you want to include the Questions UI */}
      {/* <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
          {mockinterviewQuestions && mockinterviewQuestions.map((question, index) => (
            <h2 key={index} className={`p-2 bg-gray-300 rounded-full text-sm md:text-sm text-center cursor-pointer ${activeQuestion === index && 'bg-emerald-400 text-gray-800'}`}>
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>
          {mockinterviewQuestions && mockinterviewQuestions[activeQuestion]?.question}
        </h2>
        <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockinterviewQuestions[activeQuestion]?.question)} />
        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
          <h2 className='flex gap-2 items-center text-blue-700'>
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-blue-600 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div> */}
    </>
  );
}

export default Questions;
