import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { GlobeIcon, ArrowUpRight01Icon, CheckmarkBadge01Icon, AiMagicIcon, SentIcon, Idea01Icon, WorkflowSquare03Icon } from '@hugeicons/core-free-icons';
import { ButtonBlur } from '../../atoms/ButtonBlur';
import { TitleH2 } from '../../atoms/TitleH2';

export const LandingSection4 = () => {
    const listContents = [
        {
            icon: CheckmarkBadge01Icon,
            title: "Curated Web3 Opportunities",
            description: "Each opportunity meets our strict relevance and timeliness standards",
        },
        {
            icon: AiMagicIcon,
            title: "Intelligent Matching",
            description: "Advanced algorithms surface roles perfectly aligned with your skills and career goals.",
        },
        {
            icon: SentIcon,
            title: "Direct Employer Access",
            description: "Bypass middlemen—connect straight with hiring managers and project leads in one click.",
        },
        {
            icon: Idea01Icon,
            title: "Data-Driven Insights",
            description: "Leverage real engagement and compensation analytics to guide your job-search strategy.",
        },
        {
            icon: WorkflowSquare03Icon,
            title: "End-to-End Workflow",
            description: "From posting to onboarding, manage applications and communications seamlessly in a single dashboard.",
        },
        {
            icon: GlobeIcon,
            title: "Global Blockchain Network",
            description: "Tap into a trusted ecosystem of projects, companies, and communities across major Web3 hubs.",
        }
    ]
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-20 rounded-xl">
                {/* head  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
                    <TitleH2 text={"Why Choose Job3?"} />

                    <div className=" flex flex-col gap-6">
                        <p className='text-xl max-lg:text-lg duration-300 text-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fuga dolorem neque delectus ex ullam quia error omnis quasi exercitationem!</p>
                        <div >
                            <ButtonBlur className='p-4 rounded-lg hover:bg-black hover:text-white' items={
                                <div className="flex gap-8">
                                    <span>Read more</span>
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} className='w-6 h-6' />
                                </div>
                            } />
                        </div>
                    </div>
                </div>

                {/* content  */}
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-12">
                    {listContents.map((item, index) => (
                        <div key={index} className="relative flex flex-col gap-4 px-8 border-l duration-300 overflow-hidden">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between z-10">
                                    <HugeiconsIcon icon={item.icon} className='w-10 h-10' />
                                </div>
                                <h3 className='text-2xl max-lg:text-xl duration-300 z-10'>{item.title}.</h3>
                            </div>
                            <div className="h-8"></div>
                            <p className='text-lg max-lg:text-base duration-300 z-10 text-description'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
