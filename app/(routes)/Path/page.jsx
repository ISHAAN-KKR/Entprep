"use client"
import React from 'react'
const items = [
  {
      title: "Pitching Ability",
      description: "Clearly conveying ideas and persuading stakeholders effectively..",
      className: "md:col-span-1",
      icon: '/path/presentation.gif',
      link: "/Dashboard"
  },
  {
      title: "Sales & Marketing",
      description: "Effectively promoting products and services to attract and retain customers.",
      icon: '/path/social.gif',
      link: "/Sale"
  },
  {
      title: "Stragetic Thinking",
      description: "Planning long-term strategies to achieve business objectives and success.",
      icon: '/path/line-chart.gif',
      link: "/Stra"
  },
  {
      title: "Time Management",
      description: "Prioritizing tasks and managing time to maximize productivity.",
      icon: '/path/clock.gif',
      link: "/Time"
  },
  {
      title: "Leadership",
      description: "Inspiring and guiding a team towards achieving business goals.",
      className: "md:col-span-1",
      icon: '/path/handshake.gif',
      link: "/Lead"
  },
];

const page = () => {
  return (
   <>
{/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}
<section className=" text-neutral-600  w-screen mx-auto">
  {/* <img src='/path/side.gif' className='absolute mt-[10rem] -z-10 h-screen w-screen'/> */}
  <div className="max-w-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold sm:text-4xl">Skills of Entrepreneurship</h2>

      <p className="mt-4 text-gray-800">
      Master essential skills like leadership, strategic thinking, and communication to drive entrepreneurial success.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3 ">
{
  items.map((item, i) => (
    <div
    key={i}
    className="relative flex bg-gray-50 flex-col items-center border-2 border-neutral-900 h-[15rem] shadow-md hover:scale-105 "
  >
    {/* Overlay GIF */}
    <a href={item.link} className={`absolute inset-0 bg-contain bg-center opacity-0 hover:opacity-100 transition-opacity duration-300`}
    style={{ backgroundImage: `url(${item.icon})` }}><span className=' rounded-r-lg text-neutral-100 p-2 text-lg bg-gray-800' >{item.title}</span></a>
  
    <img
      className="w-24 h-24 rounded-full"
      src={item.icon}
      alt={item.title}
    />
    <a href={item.link} className="mt-4 text-xl font-bold text-gray-800">{item.title}</a>
    <p className="mt-2 text-center text-gray-600">{item.description}</p>
  </div>
  
  ))
}
  <div className="flex bg-gray-50 flex-col items-center b-2 border-neutral-900 h-[10rem] shadow-md">
  <img
    className="w-full h-ull"
    src='/path/side.gif'
    alt={"title"}
  />
</div>


    </div>
  </div>
</section>








   </>

  )
}

export default page