import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { WorkIcon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { ButtonBlur } from '../../atoms/ButtonBlur';

export const Section4 = () => {
    const listContents = [
        {
            icon: WorkIcon,
            title: "Lorem ipsum dolor sit amet.",
            description: "Trusted since 2018",
        },
        {
            icon: WorkIcon,
            title: "Lorem ipsum dolor sit amet.",
            description: "Trusted since 2018",
        },
        {
            icon: WorkIcon,
            title: "Lorem ipsum dolor sit amet.",
            description: "Trusted since 2018",
        },
        {
            icon: WorkIcon,
            title: "Lorem ipsum dolor sit amet.",
            description: "Trusted since 2018",
        },
        {
            icon: WorkIcon,
            title: "Lorem ipsum dolor sit amet.",
            description: "Trusted since 2018",
        },
        {
            icon: WorkIcon,
            title: "Lorem ipsum dolor sit amet.",
            description: "Trusted since 2018",
        }
    ]
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="container duration-300 flex flex-col gap-20 rounded-xl">
                {/* head  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
                    <h2 className='text-5xl max-lg:text-3xl duration-300'>Why Choose Job3?</h2>
                    <div className=" flex flex-col gap-6">
                        <p className='text-lg max-lg:text-base duration-300 text-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fuga dolorem neque delectus ex ullam quia error omnis quasi exercitationem!</p>
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
