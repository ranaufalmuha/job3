import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { Certificate01Icon, DashboardBrowsingIcon, UserSwitchIcon, RoadLocation01Icon, ZoomInAreaIcon, AnalysisTextLinkIcon } from '@hugeicons/core-free-icons';
export const BusinessSection2 = () => {
    const listContents = [
        {
            title: "Access Qualified Experts",
            subtitle: "Filter by skills, availability, and past success to quickly find vetted talent and KOLs matching your project’s precise needs.",
            icon: Certificate01Icon,
        }, {
            title: "All-in-One Dashboard",
            subtitle: "Manage job postings, candidate communications, and KOL campaigns from a single intuitive interface without switching between tools.",
            icon: DashboardBrowsingIcon,
        }, {
            title: "Smart Matching",
            subtitle: "Use our AI to recommend talent and KOLs by skills, experience, and performance, improving",
            icon: UserSwitchIcon,
        }, {
            title: "Track Every Step",
            subtitle: "Gain full visibility into application statuses and KOL campaign progress, monitoring milestones and metrics from outreach through completion.",
            icon: RoadLocation01Icon,
        }, {
            title: "Flexible Scaling",
            subtitle: "Adjust your team size instantly, engaging talent or KOLs on demand to match project needs and control costs.",
            icon: ZoomInAreaIcon,
        }, {
            title: "Market Insights",
            subtitle: "Access compensation benchmarks, campaign rates, and hiring trends to craft competitive offers and stay ahead of market shifts.",
            icon: AnalysisTextLinkIcon,
        },
    ]
    return (
        <section className='w-full px-8 pt-48 max-md:pt-24 flex justify-center'>
            {/* top  */}
            <div className="w-[1300px] flex flex-col duration-300 max-md:items-center gap-20 ">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
                    <h2 className='text-5xl max-lg:text-3xl duration-300 max-w-[500px]'>How we help your project grow.</h2>
                    <div className=" flex flex-col gap-6 justify-center">
                        <p className='text-xl max-lg:text-lg duration-300 text-description'>Connect with top Web3 talent and KOLs—streamline collaboration, manage engagements end-to-end, and accelerate innovation</p>
                    </div>
                </div>

                <div className=" flex flex-col gap-8 duration-300">
                    {listContents.map((item, index) => (
                        <div key={index} className="border-b pb-6 w-full gap-8 max-md:gap-2 items-center grid grid-cols-2 max-md:grid-cols-1 duration-300">
                            {/* text  */}
                            <div className="gap-8 flex items-center">
                                {/* icon  */}
                                <HugeiconsIcon icon={item.icon} className='w-10 h-10 max-lg:w-8 max-lg:h-8 duration-300' />
                                <label className='text-2xl max-lg:text-xl duration-300'>{item.title}</label>
                            </div>
                            <p
                                className="text-description overflow-hidden transition-all duration-300 pt-4 ease-in-out"
                            >
                                {item.subtitle}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
