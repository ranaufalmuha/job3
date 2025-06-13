import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { WorkIcon, ArrowUpRight01Icon, UserAiIcon } from '@hugeicons/core-free-icons';
import { TitleH2 } from '../../atoms/TitleH2';

export const LandingSection3 = () => {
    const listContents = [
        {
            title: "I’m ready to build my career in Web3.",
            description: "Browse curated Web3 job openings tailored to your skills, connect directly with hiring managers, and accelerate your career growth with real-time alerts and personalized recommendations across leading global blockchain projects.",
            icon: WorkIcon,
        },
        {
            title: "I Want to Elevate My Influence as a KOL",
            description: "Discover curated collaboration opportunities, connect with innovative projects, and leverage analytics to grow your audience and engagement.",
            icon: UserAiIcon,
        }
    ]
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-20 max-md:gap-14 bg-headlines text-white rounded-xl p-14">
                {/* head  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12 max-md:gap-4">
                    <TitleH2 text={"Discover Your Next Web3 Career"} />
                    <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, doloribus?</p>
                </div>

                {/* content  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12">
                    {listContents.map((item, index) => (
                        <div key={index} className="relative flex flex-col gap-4 p-8 border-l rounded-r-xl before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:bg-white/5 before:w-0 hover:before:w-full before:transition-width before:duration-300 overflow-hidden group hover:cursor-pointer">
                            <div className="flex justify-between z-10">
                                <HugeiconsIcon icon={item.icon} className='w-10 h-10 max-lg:h-8 max-lg:w-8' />
                                <button className=" w-12 h-12 max-lg:h-10 max-lg:w-10 border border-white/20 p-2 rounded-lg justify-center items-center flex aspect-square backdrop-blur-sm bg-headlines/10 group-hover:bg-white group-hover:text-headlines duration-300">
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} className='' />
                                </button>
                            </div>
                            <h3 className='text-2xl max-lg:text-xl z-10'>{item.title}.</h3>
                            <p className='text-lg max-lg:text-base z-10'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
